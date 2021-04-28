import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ModeloCurso } from 'src/app/modelos/curso.model';
import { CursosService } from 'src/app/servicios/cursos.service';
import { MensajeroService } from 'src/app/servicios/mensajero.service';
import { ConfirmaEliminarCursoComponent } from '../confirma-eliminar-curso/confirma-eliminar-curso.component';

@Component({
  selector: 'app-editar-eliminar-curso',
  templateUrl: './editar-eliminar-curso.component.html',
  styleUrls: ['./editar-eliminar-curso.component.css'],
})
export class EditarEliminarCursoComponent implements OnInit {
  // ? Variables
  formularioEditar: FormGroup;
  curso: ModeloCurso;
  marcadorEditando: boolean = false;
  marcadorEliminando: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public datosCurso,
    public referenciaVentana: MatDialogRef<EditarEliminarCursoComponent>,
    private servicioCursos: CursosService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private servicioMensajero: MensajeroService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  private inicializarFormulario() {
    this.formularioEditar = this.fb.group({
      id: [this.datosCurso.id, [Validators.required]],
      ano: [String(this.datosCurso.ano), [Validators.required]],
      division: [this.datosCurso.division, [Validators.required]],
      turno: [this.datosCurso.turno, [Validators.required]],
    });
    this.formularioEditar.get('id').disable();
  }

  private mapearACurso(): ModeloCurso {
    this.curso = new ModeloCurso();

    this.curso.id = Number(this.formularioEditar.get('id').value);
    this.curso.ano = Number(this.formularioEditar.get('ano').value);
    this.curso.division = this.formularioEditar.get('division').value;
    this.curso.turno = this.formularioEditar.get('turno').value;

    return this.curso;
  }

  editarCurso() {
    this.formularioEditar.markAllAsTouched();
    if (this.formularioEditar.valid) {
      this.marcadorEditando = true;
      this.servicioCursos.editarCurso(this.mapearACurso()).subscribe(
        (datos) => {
          this.marcadorEditando = false;
          this.servicioMensajero.mostrarMensaje(36);
          this.referenciaVentana.close({
            devolucion: `${this.formularioEditar.get('turno').value}`,
          });
        },
        (error) => {
          this.marcadorEditando = false;
          this.servicioMensajero.mostrarMensaje(33);
        }
      );
    }
  }

  cerrarVentana() {
    this.referenciaVentana.close({
      devolucion: false,
    });
  }

  eliminarCurso() {
    const ventanaConfirmaEliminar = this.dialog.open(
      ConfirmaEliminarCursoComponent,
      {
        disableClose: true,
      }
    );

    ventanaConfirmaEliminar.afterClosed().subscribe((result) => {
      if (result) {
        this.marcadorEliminando = true;
        this.servicioCursos.eliminarCurso(this.datosCurso.id).subscribe(
          () => {
            this.marcadorEliminando = false;
            this.servicioMensajero.mostrarMensaje(35);
            this.referenciaVentana.close({
              devolucion: this.datosCurso.turno,
            });
          },
          (error) => {
            this.marcadorEliminando = false;
            this.servicioMensajero.mostrarMensaje(34);
          }
        );
      }
    });
  }
}
