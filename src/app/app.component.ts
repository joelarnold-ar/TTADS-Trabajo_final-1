import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from './servicios/autenticacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Gestión Horario Docente';
  mostrarMenu: boolean = false;
  iconoMostrar: string = 'arrow_right';
  habilitarMenu: boolean = false;

  constructor(private autent: AutenticacionService) {}

  ngOnInit() {
    if (this.autent.estaAutenticado()) {
      this.habilitarMenu = true;
      this.mostrarMenuLateral();
    }

    this.autent.inicioDeSesion.subscribe(() => {
      this.habilitarMenu = true;
      this.mostrarMenuLateral();
    });
    this.autent.cierreDeSesion.subscribe(() => {
      this.habilitarMenu = false;
      this.ocultarMenuLateral();
    });
  }

  manejarMenu() {
    if (this.mostrarMenu) {
      this.ocultarMenuLateral();
    } else {
      this.mostrarMenuLateral();
    }
  }

  mostrarMenuLateral() {
    this.mostrarMenu = true;
    this.iconoMostrar = 'arrow_left';
  }

  ocultarMenuLateral() {
    this.mostrarMenu = false;
    this.iconoMostrar = 'arrow_right';
  }
}
