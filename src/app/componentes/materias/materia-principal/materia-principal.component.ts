import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-materia-principal',
  templateUrl: './materia-principal.component.html',
  styleUrls: ['./materia-principal.component.css'],
})
export class MateriaPrincipalComponent implements OnInit {
  // ? Variables
  formulario: FormGroup;
  formularioBusqueda: FormGroup;
  marcadorBuscando: boolean = false;
  marcadorEditando: boolean = false;
  marcadorEliminando: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
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
    this.formulario.reset({
      id: datos['id'],
      nombre: datos['nombre'],
      descripcion: datos['descripcion'],
      anoCursado: String(datos['anoCursado']),
    });
  }

  buscarMaterias() {
    // TODO Armar método de búsqueda
  }
}
