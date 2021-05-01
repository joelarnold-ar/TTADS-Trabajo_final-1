import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ModeloMateria } from 'src/app/modelos/materia.model';
import { MateriasService } from '../../../servicios/materias.service';
import { MensajeroService } from '../../../servicios/mensajero.service';

@Component({
  selector: 'app-nueva-materia',
  templateUrl: './nueva-materia.component.html',
  styleUrls: ['./nueva-materia.component.css'],
})
export class NuevaMateriaComponent implements OnInit {
  // ? Variables
  formularioAlta: FormGroup;
  materia: ModeloMateria;
  accionAlta: boolean = false;

  constructor(
    private fb: FormBuilder,
    public ventanaEmergente: MatDialogRef<NuevaMateriaComponent>,
    private servicioMaterias: MateriasService,
    private servicioMensajero: MensajeroService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  private inicializarFormulario() {
    this.formularioAlta = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: [''],
      anoCursado: ['', [Validators.required]],
    });
  }

  private mapearAMateria(): ModeloMateria {
    this.materia = new ModeloMateria();

    this.materia.nombre = this.formularioAlta.get('nombre').value;
    this.materia.descripcion = this.formularioAlta.get('descripcion').value;
    this.materia.anoCursado = Number(
      this.formularioAlta.get('anoCursado').value
    );

    return this.materia;
  }

  nuevaMateria() {
    this.formularioAlta.markAllAsTouched();
    if (this.formularioAlta.valid) {
      this.accionAlta = true;
      this.servicioMaterias.agregarMateria(this.mapearAMateria()).subscribe(
        () => {
          this.accionAlta = false;
          this.ventanaEmergente.close(true);
        },
        (error) => {
          this.accionAlta = false;
          this.servicioMensajero.mostrarMensaje(22);
        }
      );
    }
  }
}
