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
import { DocentesPrincipalComponent } from './componentes/docentes/docentesPrincipal/docentesPrincipal.component';
import { CursosPrincipalComponent } from './componentes/cursos/cursos-principal/cursos-principal.component';
import { MateriaPrincipalComponent } from './componentes/materias/materia-principal/materia-principal.component';
import { EscuelasPrincipalComponent } from './componentes/escuelas/escuelas-principal/escuelas-principal.component';

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
  {
    path: 'docentes',
    component: DocentesPrincipalComponent,
    canActivate: [NoInicioSesionGuard],
  },
  {
    path: 'cursos',
    component: CursosPrincipalComponent,
    canActivate: [NoInicioSesionGuard],
  },
  {
    path: 'materias',
    component: MateriaPrincipalComponent,
    canActivate: [NoInicioSesionGuard],
  },
  {
    path: 'escuelas',
    component: EscuelasPrincipalComponent,
    canActivate: [NoInicioSesionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(RUTAS)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
