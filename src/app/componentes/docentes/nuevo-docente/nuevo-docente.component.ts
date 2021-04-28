import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ModeloDocente } from 'src/app/modelos/docente.model';
import { DocentesService } from '../../../servicios/docentes.service';
import { MensajeroService } from '../../../servicios/mensajero.service';

@Component({
  selector: 'app-nuevo-docente',
  templateUrl: './nuevo-docente.component.html',
  styleUrls: ['./nuevo-docente.component.css'],
})
export class NuevoDocenteComponent implements OnInit {
  // ? Variables
  formularioAlta: FormGroup;
  docente: ModeloDocente;
  accionAlta: boolean = false;

  constructor(
    private fb: FormBuilder,
    public ventanaEmergente: MatDialogRef<NuevoDocenteComponent>,
    private servicioDocentes: DocentesService,
    private servicioMensajero: MensajeroService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  private inicializarFormulario() {
    const expRegCorreo: string =
      "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";

    this.formularioAlta = this.fb.group({
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
  }

  private mapearADocente(): ModeloDocente {
    this.docente = new ModeloDocente();

    this.docente.dni = this.formularioAlta.get('dni').value;
    this.docente.nombre = this.formularioAlta.get('nombre').value;
    this.docente.apellido = this.formularioAlta.get('apellido').value;
    this.docente.correoElectronico = this.formularioAlta.get(
      'correoElectronico'
    ).value;
    this.docente.telefonoFijo = this.formularioAlta.get('telefonoFijo').value;
    this.docente.celular = this.formularioAlta.get('celular').value;
    this.docente.direccion = this.formularioAlta.get('direccion').value;

    return this.docente;
  }

  nuevoDocente() {
    this.formularioAlta.markAllAsTouched();
    if (this.formularioAlta.valid) {
      this.accionAlta = true;
      this.servicioDocentes.agregarDocente(this.mapearADocente()).subscribe(
        () => {
          this.accionAlta = false;
          this.ventanaEmergente.close(true);
        },
        (error) => {
          this.accionAlta = false;
          this.servicioMensajero.mostrarMensaje(12);
        }
      );
    }
  }
}
