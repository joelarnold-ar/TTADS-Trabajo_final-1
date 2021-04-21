import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ? Guards
import { NoInicioSesionGuard } from './compartido/noInicioSesion.guard';
import { SesionIniciadaGuard } from './compartido/sesionIniciada.guard';

// ? Componentes propios
import { InicioComponent } from './componentes/inicio/inicio.component';
import { InicioSesionComponent } from './componentes/sesion/inicio-sesion/inicio-sesion.component';
import { RegistroUsuarioComponent } from './componentes/sesion/registro-usuario/registro-usuario.component';
import { PerfilUsuarioComponent } from './componentes/sesion/perfil-usuario/perfil-usuario.component';

const RUTAS: Routes = [
  { path: '', component: InicioSesionComponent },
  {
    path: 'inicioSesion',
    component: InicioSesionComponent,
    canActivate: [SesionIniciadaGuard],
  },
  {
    path: 'registro',
    component: RegistroUsuarioComponent,
    canActivate: [SesionIniciadaGuard],
  },
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [NoInicioSesionGuard],
  },
  {
    path: 'perfil',
    component: PerfilUsuarioComponent,
    canActivate: [NoInicioSesionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(RUTAS)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
