import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

// ? Importaciones propias
import { UsuarioModelo } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  // ? Variables
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private claveAPI = 'AIzaSyDOE1Gh2m2jERIfSg6UQSSerKMx-NdfyAs';
  tokenUsuario: string;
  @Output() inicioDeSesion: EventEmitter<any>;
  @Output() cierreDeSesion: EventEmitter<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.leerToken();
    this.inicioDeSesion = new EventEmitter<any>();
    this.cierreDeSesion = new EventEmitter<any>();
  }

  iniciarSesion(usuario: UsuarioModelo) {
    // ? ARMO UN OBJETO CON LOS DATOS DEL USUARIO MAS
    // ? EL "returnSecureToken" QUE PIDE FIREBASE
    const datosUsuario = {
      email: usuario.correoElectronico,
      password: usuario.contrasena,
      returnSecureToken: true,
    };

    // ? LA LLAMADA DEVUELVE VARIOS DATOS PERO USANDO EL 'pipe' DE LOS
    // ? OBSERVABLES Y EL 'map' DE rxjs SACO ANTES EL token Y LO GUARDO
    return this.http
      .post(`${this.url}signInWithPassword?key=${this.claveAPI}`, datosUsuario)
      .pipe(
        map((resp) => {
          this.configurarSesion(resp);
          this.inicioDeSesion.emit(resp);
          return resp;
        })
      );
  }

  nuevoUsuario(usuario: UsuarioModelo) {
    // ? ARMO UN OBJETO CON LOS DATOS DEL USUARIO MAS
    // ? EL "returnSecureToken" QUE PIDE FIREBASE
    const datosUsuario = {
      email: usuario.correoElectronico,
      password: usuario.contrasena,
      returnSecureToken: true,
    };

    // ? LA LLAMADA DEVUELVE VARIOS DATOS PERO USANDO EL 'pipe' DE LOS
    // ? OBSERVABLES Y EL 'map' DE rxjs SACO ANTES EL token Y LO GUARDO
    return this.http
      .post(`${this.url}signUp?key=${this.claveAPI}`, datosUsuario)
      .pipe(
        map((resp) => {
          this.configurarSesion(resp);
          this.inicioDeSesion.emit(resp);
          return resp;
        })
      );
  }

  private configurarSesion(datos: Object) {
    // ? CONFIGURO EL TOKEN Y LA HORA DE EXPIRACIÓN DE LA SESIÓN
    this.tokenUsuario = datos['idToken'];
    localStorage.setItem('token', this.tokenUsuario);
    let ahora = new Date();
    ahora.setSeconds(4500);
    localStorage.setItem('expira', ahora.getTime().toString());

    // ? CONFIGURO EL RESTO DE LOS DATOS QUE MANDA FIREBASE SOBRE LA SESIÓN
    localStorage.setItem(
      'nombre',
      datos['email'].slice(0, datos['email'].indexOf('@'))
    );
    localStorage.setItem('idUsuario', datos['localId']);
    localStorage.setItem('correoElectronico', datos['email']);
  }

  private leerToken() {
    if (localStorage.getItem('token')) {
      this.tokenUsuario = localStorage.getItem('token');
    } else {
      this.tokenUsuario = '';
    }
    return this.tokenUsuario;
  }

  estaAutenticado(): boolean {
    // ? SI EL TOKEN ES CORTO, NO HAY TOKEN (NO ESTA LOGUEADO)
    if (this.tokenUsuario.length < 2) {
      return false;
    }

    // ? TRAIGO LA HORA DE EXPIRACION DEL LocalStorage Y COMPARO
    // ? CON LA HORA ACTUAL PARA SABER SI YA EXPIRO LA SESION
    const cuandoExpira = Number(localStorage.getItem('expira'));
    const horaExpiracion = new Date();
    horaExpiracion.setTime(cuandoExpira);

    if (horaExpiracion > new Date()) {
      return true;
    } else {
      return false;
    }
  }

  cerrarSesion() {
    localStorage.clear();
    this.cierreDeSesion.emit();
    this.router.navigateByUrl('inicioSesion');
  }
}
