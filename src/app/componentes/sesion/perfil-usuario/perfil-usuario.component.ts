import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../../servicios/autenticacion.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent implements OnInit {
  // ? Variables
  nombreUsuario: string;
  correoElectronico: string;
  idUsuario: string;
  token: string;
  horaExpira: Date;
  sesionExpira: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombre');
    this.correoElectronico = localStorage.getItem('correoElectronico');
    this.idUsuario = localStorage.getItem('idUsuario').slice(-30);
    this.token = localStorage.getItem('token').slice(-30);
    if (localStorage.getItem('mantenerSesion') === 'si') {
      this.sesionExpira = false;
    } else {
      this.horaExpira = new Date(Number(localStorage.getItem('expira')));
    }
  }
}
