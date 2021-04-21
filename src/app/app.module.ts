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

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    InicioSesionComponent,
    RegistroUsuarioComponent,
    BarraNavegacionComponent,
    MenuLateralComponent,
    PerfilUsuarioComponent,
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
