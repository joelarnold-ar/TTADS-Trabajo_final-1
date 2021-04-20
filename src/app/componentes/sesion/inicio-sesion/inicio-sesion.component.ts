import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

// ? Importaciones propias
import { UsuarioModelo } from '../../../modelos/usuario.model';
import { AutenticacionService } from '../../../servicios/autenticacion.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent implements OnInit {
  // ? Variables
  usuario: UsuarioModelo = new UsuarioModelo();
  ocultarContra = true;
  formulario: FormGroup;

  constructor(
    private autent: AutenticacionService,
    private router: Router,
    private fb: FormBuilder
  ) {
    if (this.autent.estaAutenticado()) {
      router.navigateByUrl('/inicio');
    }

    this.inicializarFormulario();
  }

  ngOnInit() {}

  inicializarFormulario() {
    this.formulario = this.fb.group({
      correoElectronico: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      mantenerSesion: [true],
    });
  }

  inicioDeSesion() {
    // ? Si es inválido no hago nada
    if (this.formulario.invalid) {
      return;
    }

    this.usuario = {
      correoElectronico: this.formulario.get('correoElectronico').value,
      contrasena: this.formulario.get('contrasena').value,
    };

    // ? Mensaje de SweetAlert2 -para la espera-
    Swal.fire('Iniciando sesión', 'Por favor, espere...', 'info');
    Swal.showLoading();

    // ? Le mando el correo y la contraseña al servicio de autenticación
    this.autent.iniciarSesion(this.usuario).subscribe(
      (resp) => {
        Swal.close();

        if (this.formulario.get('mantenerSesion').value === true) {
          localStorage.setItem('mantenerSesion', 'si');
        }

        this.router.navigateByUrl('/inicio');
      },
      (err) => {
        Swal.fire(
          'Error al iniciar la sesión',
          `Información del error: ${err.error.error.message}`,
          'error'
        );
      }
    );
  }
}
