import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

// ? Componentes
import { ModeloDocente } from '../../../modelos/docente.model';
import { NuevoDocenteComponent } from '../nuevo-docente/nuevo-docente.component';

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
  hayDatos: boolean = false;

  constructor(private fb: FormBuilder, public dialogo: MatDialog) {}

  ngOnInit() {
    this.docente = new ModeloDocente();
    this.inicializarFormularioBusqueda();
    this.inicializarFormulario();
  }

  private inicializarFormulario() {
    const expRegCorreo: string =
      "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";

    this.formulario = this.fb.group({
      dni: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      correoElectronico: ['', [Validators.required]],
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
    this.idDocenteBuscado = Number(datos['id']);
    this.formulario.reset({
      dni: datos['dni'],
      apellido: datos['apellido'],
      nombre: datos['nombre'],
      correoElectronico: datos['correoElectronico'],
      telefonoFijo: datos['telefonoFijo'],
      celular: datos['celular'],
      direccion: datos['direccion'],
    });
  }

  limpiarFormulario() {
    this.formularioBusqueda.reset();
    this.formulario.disable();
    this.docente = undefined;
    this.hayDatos = false;
  }

  buscarDocente() {
    if (this.formularioBusqueda.valid && this.formularioBusqueda.dirty) {
      this.marcadorBuscando = true;
    }
  }

  altaDocente() {
    const ventanaNuevoDocente = this.dialogo.open(NuevoDocenteComponent);

    ventanaNuevoDocente.afterClosed().subscribe((result) => {
      this.limpiarFormulario();
      // TODO Agregar mensaje y limpiar formulario
    });
  }
}
