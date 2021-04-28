import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

// ? Componentes
import { ModeloCurso } from '../../../modelos/curso.model';
import { CursosService } from '../../../servicios/cursos.service';
import { NuevoCursoComponent } from '../nuevo-curso/nuevo-curso.component';
import { MensajeroService } from '../../../servicios/mensajero.service';
import { EditarEliminarCursoComponent } from '../editar-eliminar-curso/editar-eliminar-curso.component';

@Component({
  selector: 'app-cursos-principal',
  templateUrl: './cursos-principal.component.html',
  styleUrls: ['./cursos-principal.component.css'],
})
export class CursosPrincipalComponent implements OnInit {
  // ? Variables
  formularioBusqueda: FormGroup;
  idCursoBuscado: number;
  marcadorBuscando: boolean = false;
  cursosEncontrados: ModeloCurso[];

  constructor(
    private servicioCursos: CursosService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private servicioMensajero: MensajeroService
  ) {}

  ngOnInit() {
    this.inicializarFormularioBusqueda();
  }

  private inicializarFormularioBusqueda() {
    this.formularioBusqueda = this.fb.group({
      turno: ['', [Validators.required]],
    });
  }

  private ordenarCursos(cursos: ModeloCurso[]): ModeloCurso[] {
    let cursosOrdenados: ModeloCurso[];

    cursosOrdenados = cursos.sort((a, b) => a.ano - b.ano);

    return cursosOrdenados;
  }

  limpiarFormulario() {
    this.formularioBusqueda.reset();
    this.formularioBusqueda.get('turno').setErrors(null);
    this.cursosEncontrados = null;
  }

  buscarCursos(curso?: string) {
    if (this.formularioBusqueda.valid) {
      this.marcadorBuscando = true;
      this.servicioCursos
        .buscarPorTurno(
          curso ? curso : this.formularioBusqueda.get('turno').value
        )
        .subscribe(
          (datos) => {
            if (datos.length > 0) {
              this.cursosEncontrados = this.ordenarCursos(datos);
              this.marcadorBuscando = false;
            } else {
              this.servicioMensajero.mostrarMensaje(31);
              this.marcadorBuscando = false;
              this.limpiarFormulario();
            }
          },
          (error) => {
            this.marcadorBuscando = false;
            this.servicioMensajero.mostrarMensaje(30);
          }
        );
    }
  }

  altaCurso() {
    const ventanaNuevoCurso = this.dialog.open(NuevoCursoComponent, {
      disableClose: true,
    });

    ventanaNuevoCurso.afterClosed().subscribe((resultado) => {
      if (resultado.turno) {
        this.servicioMensajero.mostrarMensaje(37);
        this.limpiarFormulario();
        this.buscarCursos(resultado.turno);
      }
    });
  }

  editarEliminarCurso(curso: ModeloCurso) {
    const ventanaEditarEliminar = this.dialog.open(
      EditarEliminarCursoComponent,
      {
        disableClose: true,
        data: {
          ...curso,
        },
      }
    );

    ventanaEditarEliminar.afterClosed().subscribe((resultado) => {
      if (resultado.devolucion) {
        this.limpiarFormulario();
        this.buscarCursos(resultado.devolucion);
      }
    });
  }
}
