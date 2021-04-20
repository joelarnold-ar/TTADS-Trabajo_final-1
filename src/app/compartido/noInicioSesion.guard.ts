import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AutenticacionService } from '../servicios/autenticacion.service';

@Injectable({
  providedIn: 'root',
})
export class NoInicioSesionGuard implements CanActivate {
  constructor(private auth: AutenticacionService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.estaAutenticado()) {
      return true;
    } else {
      this.router.navigateByUrl('inicioSesion');
      return false;
    }
  }
}
