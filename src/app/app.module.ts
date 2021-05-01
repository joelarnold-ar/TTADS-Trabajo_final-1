import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ? Importaciones de componentes propios
import { AngularMaterialModule } from './compartido/angular-material.module';
import { InicioSesionComponent } from './componentes/sesion/inicio-sesion/inicio-sesion.component';
import { RegistroUsuarioComponent } from './componentes/sesion/registro-usuario/registro-usuario.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { BarraNavegacionComponent } from './componentes/general/barra-navegacion/barra-navegacion.component';
import { MenuLateralComponent } from './componentes/general/menu-lateral/menu-lateral.component';
import { PerfilUsuarioComponent } from './componentes/sesion/perfil-usuario/perfil-usuario.component';
import { NuevoDocenteComponent } from './componentes/docentes/nuevo-docente/nuevo-docente.component';
import { ConfirmarEliminarDocenteComponent } from './componentes/docentes/confirmar-eliminar-docente/confirmar-eliminar-docente.component';
import { DocentesPrincipalComponent } from './componentes/docentes/docentesPrincipal/docentesPrincipal.component';
import { CursosPrincipalComponent } from './componentes/cursos/cursos-principal/cursos-principal.component';
import { ConfirmaEliminarCursoComponent } from './componentes/cursos/confirma-eliminar-curso/confirma-eliminar-curso.component';
import { EditarEliminarCursoComponent } from './componentes/cursos/editar-eliminar-curso/editar-eliminar-curso.component';
import { NuevoCursoComponent } from './componentes/cursos/nuevo-curso/nuevo-curso.component';
import { MateriaPrincipalComponent } from './componentes/materias/materia-principal/materia-principal.component';
import { NuevaMateriaComponent } from './componentes/materias/nueva-materia/nueva-materia.component';
import { ConfirmarEliminarMateriaComponent } from './componentes/materias/confirmar-eliminar-materia/confirmar-eliminar-materia.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    InicioSesionComponent,
    RegistroUsuarioComponent,
    BarraNavegacionComponent,
    MenuLateralComponent,
    PerfilUsuarioComponent,
    DocentesPrincipalComponent,
    NuevoDocenteComponent,
    ConfirmarEliminarDocenteComponent,
    CursosPrincipalComponent,
    ConfirmaEliminarCursoComponent,
    EditarEliminarCursoComponent,
    NuevoCursoComponent,
    MateriaPrincipalComponent,
    NuevaMateriaComponent,
    ConfirmarEliminarMateriaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
