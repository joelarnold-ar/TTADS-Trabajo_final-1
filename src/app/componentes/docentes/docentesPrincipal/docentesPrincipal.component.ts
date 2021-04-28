import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

// ? Componentes
import { ModeloDocente } from '../../../modelos/docente.model';
import { DocentesService } from '../../../servicios/docentes.service';
import { NuevoDocenteComponent } from '../nuevo-docente/nuevo-docente.component';
import { ConfirmarEliminarDocenteComponent } from '../confirmar-eliminar-docente/confirmar-eliminar-docente.component';
import { MensajeroService } from '../../../servicios/mensajero.service';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentesPrincipal.component.html',
  styleUrls: ['./docentesPrincipal.component.css'],
})
export class DocentesPrincipalComponent implements OnInit {
  // ? Variables
  formulario: FormGroup;
  formularioBusqueda: FormGroup;
  docente: ModeloDocente;
  idDocenteBuscado: number;
  marcadorBuscando: boolean = false;
  marcadorEditando: boolean = false;
  marcadorEliminando: boolean = false;
  hayDatos: boolean = false;

  constructor(
    private servicioDocentes: DocentesService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private servicioMensajero: MensajeroService
  ) {}

  ngOnInit() {
    this.docente = new ModeloDocente();
    this.inicializarFormularioBusqueda();
    this.inicializarFormulario();
  }

  private inicializarFormulario() {
    const expRegCorreo: string =
      "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";

    this.formulario = this.fb.group({
      dni: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(8)],
      ],
      apellido: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      correoElectronico: [
        '',
        [Validators.required, Validators.pattern(expRegCorreo)],
      ],
      telefonoFijo: [''],
      celular: ['', [Validators.required]],
      direccion: [''],
    });
    this.formulario.disable();
  }

  private inicializarFormularioBusqueda() {
    this.formularioBusqueda = this.fb.group({
      dniBuscado: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(8)],
      ],
    });
  }

  private mapearAFormulario(datos: Object) {
    this.idDocenteBuscado = Number(datos[0]['id']);
    this.formulario.reset({
      dni: datos[0]['dni'],
      apellido: datos[0]['apellido'],
      nombre: datos[0]['nombre'],
      correoElectronico: datos[0]['correoElectronico'],
      telefonoFijo: datos[0]['telefonoFijo'],
      celular: datos[0]['celular'],
      direccion: datos[0]['direccion'],
    });
  }

  private mapearADocente(): ModeloDocente {
    this.docente = new ModeloDocente();

    this.docente.id = this.idDocenteBuscado;
    this.docente.dni = this.formulario.get('dni').value;
    this.docente.nombre = this.formulario.get('nombre').value;
    this.docente.apellido = this.formulario.get('apellido').value;
    this.docente.correoElectronico = this.formulario.get(
      'correoElectronico'
    ).value;
    this.docente.telefonoFijo = this.formulario.get('telefonoFijo').value;
    this.docente.celular = this.formulario.get('celular').value;
    this.docente.direccion = this.formulario.get('direccion').value;

    return this.docente;
  }

  habilitarFormulario() {
    if (this.hayDatos) {
      this.formulario.enable();
      this.formulario.get('dni').disable();
    }
  }

  limpiarFormulario() {
    this.formularioBusqueda.reset();
    this.formularioBusqueda.get('dniBuscado').setErrors(null);
    this.formulario.reset();
    this.formulario.disable();
    this.docente = undefined;
    this.hayDatos = false;
  }

  buscarDocente() {
    if (this.formularioBusqueda.valid && this.formularioBusqueda.dirty) {
      this.marcadorBuscando = true;
      this.servicioDocentes
        .buscarPorDNI(this.formularioBusqueda.get('dniBuscado').value)
        .subscribe(
          (datos) => {
            if (datos.length > 0) {
              this.mapearAFormulario(datos);
              this.marcadorBuscando = false;
              this.hayDatos = true;
              this.formulario.disable();
            } else {
              this.servicioMensajero.mostrarMensaje(11);
              this.marcadorBuscando = false;
            }
          },
          (error) => {
            this.marcadorBuscando = false;
            this.servicioMensajero.mostrarMensaje(10);
          }
        );
    }
  }

  altaDocente() {
    const ventanaNuevoDocente = this.dialog.open(NuevoDocenteComponent, {
      disableClose: true,
    });

    ventanaNuevoDocente.afterClosed().subscribe((result) => {
      if (result) {
        this.limpiarFormulario();
        this.servicioMensajero.mostrarMensaje(17);
      }
    });
  }

  editarDocente() {
    this.formulario.markAllAsTouched();
    if (this.formulario.valid) {
      this.marcadorEditando = true;
      this.servicioDocentes.editarDocente(this.mapearADocente()).subscribe(
        (datos) => {
          this.marcadorEditando = false;
          this.servicioMensajero.mostrarMensaje(16);
          this.formulario.disable();
        },
        (error) => {
          this.marcadorEditando = false;
          this.servicioMensajero.mostrarMensaje(13);
        }
      );
    }
  }

  eliminarDocente() {
    if (this.hayDatos) {
      const ventanaConfirmaEliminar = this.dialog.open(
        ConfirmarEliminarDocenteComponent,
        {
          disableClose: true,
        }
      );

      ventanaConfirmaEliminar.afterClosed().subscribe((result) => {
        if (result) {
          this.marcadorEliminando = true;
          this.servicioDocentes
            .eliminarDocente(this.idDocenteBuscado)
            .subscribe(
              () => {
                this.marcadorEliminando = false;
                this.limpiarFormulario();
                this.servicioMensajero.mostrarMensaje(15);
              },
              (error) => {
                this.marcadorEliminando = false;
                this.servicioMensajero.mostrarMensaje(14);
              }
            );
        }
      });
    }
  }
}
