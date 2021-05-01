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
      // * MENSAJES MODULO MATERIAS
      case 20:
        mensaje = '¡Algo falló al buscar la materia!';
        break;
      case 21:
        mensaje = 'Ninguna materia coincide con el texto ingresado.';
        break;
      case 22:
        mensaje = '¡Algo falló al dar de alta la materia!';
        break;
      case 23:
        mensaje = '¡Algo falló al editar la materia!';
        break;
      case 24:
        mensaje = '¡Algo falló al eliminar la materia!';
        break;
      case 25:
        mensaje = 'La materia se eliminó correctamente.';
        break;
      case 26:
        mensaje = 'La materia se editó correctamente.';
        break;
      case 27:
        mensaje = 'La materia se dio de alta correctamente.';
        break;
      // * MENSAJES MODULO CURSOS
      case 30:
        mensaje = '¡Algo falló al buscar los cursos!';
        break;
      case 31:
        mensaje = 'No se encontraron cursos';
        break;
      case 32:
        mensaje = '¡Algo falló al dar de alta el curso!';
        break;
      case 33:
        mensaje = '¡Algo falló al editar el curso!';
        break;
      case 34:
        mensaje = '¡Algo falló al eliminar el curso!';
        break;
      case 35:
        mensaje = 'El curso se eliminó correctamente.';
        break;
      case 36:
        mensaje = 'El curso se editó correctamente.';
        break;
      case 37:
        mensaje = 'El curso se dio de alta correctamente.';
        break;
      default:
        mensaje = '¡Algo salió mal!';
        break;
    }

    return mensaje;
  }
}
