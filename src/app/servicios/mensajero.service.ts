import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MensajeroService {
  constructor(private mensajeFlotante: MatSnackBar) {}

  mostrarMensaje(codigoMensaje: number) {
    this.mensajeFlotante.open(this.configurarMensaje(codigoMensaje), 'Cerrar', {
      duration: 3000,
    });
  }

  // * ACÁ SE ENCUENTRAN LOS CÓDIGOS DE MENSAJE DE LOS DIFERENTES COMPONENTES
  private configurarMensaje(codigoMensaje: number): string {
    let mensaje: string = '';

    switch (codigoMensaje) {
      // * MENSAJES MODULO DOCENTES
      case 10:
        mensaje = '¡Algo falló al buscar el docente!';
        break;
      case 11:
        mensaje = 'No se encontró docente con ese D.N.I.';
        break;
      case 12:
        mensaje = '¡Algo falló al dar de alta al docente!';
        break;
      case 13:
        mensaje = '¡Algo falló al editar el docente!';
        break;
      case 14:
        mensaje = '¡Algo falló al eliminar el docente!';
        break;
      case 15:
        mensaje = 'El docente se eliminó correctamente.';
        break;
      case 16:
        mensaje = 'El docente se editó correctamente.';
        break;
      case 17:
        mensaje = 'El docente se dio de alta correctamente.';
        break;
      default:
        mensaje = '¡Algo salió mal!';
        break;
    }

    return mensaje;
  }
}
