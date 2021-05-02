import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

// ? Importaciones propias
import { EscuelasService } from '../../../servicios/escuelas.service';
import { MensajeroService } from 'src/app/servicios/mensajero.service';
import { ModeloEscuela } from '../../../modelos/escuela.model';

@Component({
  selector: 'app-escuelas-principal',
  templateUrl: './escuelas-principal.component.html',
  styleUrls: ['./escuelas-principal.component.css'],
})
export class EscuelasPrincipalComponent implements OnInit {
  // ? Variables
  formulario: FormGroup;
  formularioBusqueda: FormGroup;
  escuela: ModeloEscuela;
  idEscuelaBuscada: number;
  marcadorBuscando: boolean = false;
  marcadorEditando: boolean = false;
  marcadorEliminando: boolean = false;
  hayDatos: boolean = false;
  escuelasFiltradas: ModeloEscuela[] = [];

  constructor(
    private servicioEscuelas: EscuelasService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private servicioMensajero: MensajeroService
  ) {}

  ngOnInit() {
    this.inicializarFormularioBusqueda();
    this.inicializarFormulario();
  }

  private inicializarFormulario() {
    this.formulario = this.fb.group({
      cue: ['', [Validators.required]],
      nombreCompleto: ['', [Validators.required]],
      domicilio: [''],
      telefono: ['', [Validators.required]],
      correoElectronico: ['', [Validators.required]],
    });
    this.formulario.disable();
  }

  private inicializarFormularioBusqueda() {
    this.formularioBusqueda = this.fb.group({
      escuelaBuscada: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  private mapearAFormulario(datos) {
    this.idEscuelaBuscada = Number(datos['id']);
    this.formulario.reset({
      cue: datos['cue'],
      nombreCompleto: datos['nombreCompleto'],
      domicilio: datos['domicilio'],
      telefono: datos['telefono'],
      correoElectronico: datos['correoElectronico'],
    });
  }

  private mapearAEscuela(): ModeloEscuela {
    this.escuela = new ModeloEscuela();

    this.escuela.id = this.idEscuelaBuscada;
    this.escuela.cue = this.formulario.get('cue').value;
    this.escuela.nombreCompleto = this.formulario.get('nombreCompleto').value;
    this.escuela.domicilio = this.formulario.get('domicilio').value;
    this.escuela.telefono = this.formulario.get('telefono').value;
    this.escuela.correoElectronico = this.formulario.get(
      'correoElectronico'
    ).value;

    return this.escuela;
  }

  limpiarFormulario() {
    this.formulario.reset();
    this.hayDatos = false;
  }

  elegirEscuela(escuela: ModeloEscuela) {
    this.hayDatos = true;
    this.mapearAFormulario(escuela);
    this.escuelasFiltradas = [];
    this.formulario.disable();
  }

  buscarEscuelas() {
    if (this.formularioBusqueda.valid && !this.formularioBusqueda.pristine) {
      this.marcadorBuscando = true;
      this.servicioEscuelas.buscarEscuelas().subscribe(
        (datos) => {
          if (datos.length > 0) {
            this.escuelasFiltradas = datos;
            this.marcadorBuscando = false;
          } else {
            this.escuelasFiltradas = [];
            this.servicioMensajero.mostrarMensaje(41);
            this.marcadorBuscando = false;
          }
        },
        (error) => {
          this.marcadorBuscando = false;
          this.servicioMensajero.mostrarMensaje(40);
        }
      );
    }
  }

  altaEscuela() {
    // TODO Armar método
  }

  editarEscuela() {
    // TODO Armar método
  }

  eliminarEscuela() {
    // TODO Armar método
  }
}
