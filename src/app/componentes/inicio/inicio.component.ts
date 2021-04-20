import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  // ? Variables
  opcionMenu: number;

  constructor() {}

  ngOnInit(): void {}

  fijarOpcion(indice: number) {
    this.opcionMenu = indice;
  }
}
