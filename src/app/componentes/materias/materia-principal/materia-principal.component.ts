import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

// ? Componentes
import { ModeloMateria } from '../../../modelos/materia.model';
import { MateriasService } from '../../../servicios/materias.service';
import { NuevaMateriaComponent } from '../nueva-materia/nueva-materia.component';
import { ConfirmarEliminarMateriaComponent } from '../confirmar-eliminar-materia/confirmar-eliminar-materia.component';
import { MensajeroService } from '../../../servicios/mensajero.service';

@Component({
  selector: 'app-materia-principal',
  templateUrl: './materia-principal.component.html',
  styleUrls: ['./materia-principal.component.css'],
})
export class MateriaPrincipalComponent implements OnInit {
  // ? Variables
  formulario: FormGroup;
  formularioBusqueda: FormGroup;
  materia: ModeloMateria;
  idMateriaBuscada: number;
  marcadorBuscando: boolean = false;
  marcadorEditando: boolean = false;
  marcadorEliminando: boolean = false;
  hayDatos: boolean = false;
  materiasFiltradas: ModeloMateria[] = [];

  constructor(
    private servicioMaterias: MateriasService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private servicioMensajero: MensajeroService
  ) {}

  ngOnInit() {
    this.materia = new ModeloMateria();
    this.inicializarFormularioBusqueda();
    this.inicializarFormulario();
  }

  private inicializarFormulario() {
    this.formulario = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: [''],
      anoCursado: ['', [Validators.required]],
    });
    this.formulario.disable();
  }

  private inicializarFormularioBusqueda() {
    this.formularioBusqueda = this.fb.group({
      materiaBuscada: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  private mapearAFormulario(datos: Object) {
    this.idMateriaBuscada = Number(datos['id']);
    this.formulario.reset({
      id: datos['id'],
      nombre: datos['nombre'],
      descripcion: datos['descripcion'],
      anoCursado: String(datos['anoCursado']),
    });
    this.lipiarFormularioBusqueda();
  }

  private mapearAMateria(): ModeloMateria {
    this.materia = new ModeloMateria();

    this.materia.id = this.formulario.get('id').value;
    this.materia.nombre = this.formulario.get('nombre').value;
    this.materia.descripcion = this.formulario.get('descripcion').value;
    this.materia.anoCursado = Number(this.formulario.get('anoCursado').value);

    return this.materia;
  }

  habilitarFormulario() {
    this.formulario.enable();
    this.formulario.get('id').disable();
    this.lipiarFormularioBusqueda();
  }

  limpiarFormulario() {
    this.formulario.reset();
    this.formulario.disable();
    this.materia = undefined;
    this.hayDatos = false;
  }

  lipiarFormularioBusqueda() {
    this.formularioBusqueda.get('materiaBuscada').markAsUntouched();
    this.formularioBusqueda.get('materiaBuscada').markAsPristine();
    this.formularioBusqueda.markAsUntouched();
    this.formularioBusqueda.markAsPristine();
  }

  buscarMaterias() {
    if (this.formularioBusqueda.valid && this.formularioBusqueda.dirty) {
      this.marcadorBuscando = true;
      this.servicioMaterias
        .buscarPorNombre(this.formularioBusqueda.get('materiaBuscada').value)
        .subscribe(
          (datos) => {
            if (datos.length > 0) {
              this.materiasFiltradas = datos;
              this.marcadorBuscando = false;
            } else {
              this.materiasFiltradas = [];
              this.servicioMensajero.mostrarMensaje(21);
              this.marcadorBuscando = false;
            }
          },
          (error) => {
            this.marcadorBuscando = false;
            this.servicioMensajero.mostrarMensaje(20);
          }
        );
    }
  }

  elegirMateria(materia: ModeloMateria) {
    this.hayDatos = true;
    this.mapearAFormulario(materia);
    this.materiasFiltradas = [];
    this.formulario.disable();
    this.lipiarFormularioBusqueda();
  }

  altaMateria() {
    const ventanaNuevaMateria = this.dialog.open(NuevaMateriaComponent, {
      disableClose: true,
    });

    ventanaNuevaMateria.afterClosed().subscribe((result) => {
      if (result) {
        this.limpiarFormulario();
        this.servicioMensajero.mostrarMensaje(27);
      }
    });
  }

  editarMateria() {
    this.formulario.markAllAsTouched();
    if (this.formulario.valid) {
      this.marcadorEditando = true;
      this.servicioMaterias.editarMateria(this.mapearAMateria()).subscribe(
        (datos) => {
          this.marcadorEditando = false;
          this.servicioMensajero.mostrarMensaje(26);
          this.formulario.disable();
        },
        (error) => {
          this.marcadorEditando = false;
          this.servicioMensajero.mostrarMensaje(23);
        }
      );
    }
  }

  eliminarMateria() {
    if (this.hayDatos) {
      const ventanaConfirmaEliminar = this.dialog.open(
        ConfirmarEliminarMateriaComponent,
        {
          disableClose: true,
        }
      );

      ventanaConfirmaEliminar.afterClosed().subscribe((result) => {
        if (result) {
          this.marcadorEliminando = true;
          this.servicioMaterias
            .eliminarMateria(this.idMateriaBuscada)
            .subscribe(
              () => {
                this.marcadorEliminando = false;
                this.limpiarFormulario();
                this.servicioMensajero.mostrarMensaje(25);
              },
              (error) => {
                this.marcadorEliminando = false;
                this.servicioMensajero.mostrarMensaje(24);
              }
            );
        }
      });
    }
  }
}
