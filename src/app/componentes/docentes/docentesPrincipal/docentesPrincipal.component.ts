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
        .buscarUno(this.formularioBusqueda.get('dniBuscado').value)
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
}
