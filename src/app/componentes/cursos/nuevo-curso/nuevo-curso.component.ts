import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CursosService } from 'src/app/servicios/cursos.service';
import { MensajeroService } from 'src/app/servicios/mensajero.service';
import { ModeloCurso } from '../../../modelos/curso.model';

@Component({
  selector: 'app-nuevo-curso',
  templateUrl: './nuevo-curso.component.html',
  styleUrls: ['./nuevo-curso.component.css'],
})
export class NuevoCursoComponent implements OnInit {
  // ? Variables
  formularioAlta: FormGroup;
  curso: ModeloCurso;
  accionAlta: boolean = false;

  constructor(
    private fb: FormBuilder,
    public ventanaEmergente: MatDialogRef<NuevoCursoComponent>,
    private servicioCursos: CursosService,
    private servicioMensajero: MensajeroService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  private inicializarFormulario() {
    this.formularioAlta = this.fb.group({
      ano: ['', [Validators.required]],
      division: ['', [Validators.required]],
      turno: ['', [Validators.required]],
    });
  }

  private mapearACurso(): ModeloCurso {
    this.curso = new ModeloCurso();

    this.curso.ano = Number(this.formularioAlta.get('ano').value);
    this.curso.division = this.formularioAlta.get('division').value;
    this.curso.turno = this.formularioAlta.get('turno').value;

    return this.curso;
  }

  cerrarVentana() {
    this.ventanaEmergente.close({
      devolucion: false,
    });
  }

  nuevoCurso() {
    this.formularioAlta.markAllAsTouched();
    if (this.formularioAlta.valid) {
      this.accionAlta = true;
      this.servicioCursos.agregarCurso(this.mapearACurso()).subscribe(
        () => {
          this.accionAlta = false;
          this.ventanaEmergente.close({ turno: `${this.curso.turno}` });
        },
        (error) => {
          this.accionAlta = false;
          this.servicioMensajero.mostrarMensaje(32);
        }
      );
    }
  }
}
