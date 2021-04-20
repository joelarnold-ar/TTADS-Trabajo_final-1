import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../../servicios/autenticacion.service';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css'],
})
export class BarraNavegacionComponent implements OnInit {
  // ? Variables
  nombreUsuario: string;
  estaLogueado: boolean = false;

  constructor(private autent: AutenticacionService) {}

  ngOnInit(): void {
    if (this.autent.estaAutenticado()) {
      this.nombreUsuario = localStorage.getItem('nombre');
      this.estaLogueado = true;
    }

    this.autent.inicioDeSesion.subscribe((datos) => {
      this.estaLogueado = true;
      this.nombreUsuario = localStorage.getItem('nombre');
    });
  }

  cerrarSesion() {
    this.autent.cerrarSesion();
    this.estaLogueado = false;
  }
}
