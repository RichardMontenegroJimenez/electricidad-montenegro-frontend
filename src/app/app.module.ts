import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ObrasComponent } from './obras/obras.component';
import { RouterModule, Routes } from '@angular/router';
import { EncargadosComponent } from './encargados/encargados.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { HttpClientModule } from '@angular/common/http';
import { FormObrasComponent } from './obras/form-obras/form-obras.component';
import { FormEncargadosComponent } from './encargados/form-encargados/form-encargados.component';
import { FormEmpleadosComponent } from './empleados/form-empleados/form-empleados.component';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core'
import {MatInputModule} from '@angular/material/input';
import { PerfilComponent } from './encargados/perfil/perfil.component';
import { PerfilEmpleadoComponent } from './empleados/perfil-empleado/perfil-empleado.component';
import { LoginComponent } from './usuarios/login.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { ContactaComponent } from './contacta/contacta.component';



const routes: Routes = [
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent},
  {path: 'quienes-somos', component: QuienesSomosComponent},
  {path: 'obras', component: ObrasComponent},
  {path: 'obras/form', component: FormObrasComponent, canActivate:[AuthGuard, RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path: 'obras/form/:id', component: FormObrasComponent, canActivate:[AuthGuard, RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path: 'encargados', component: EncargadosComponent},
  {path: 'encargados/form', component: FormEncargadosComponent, canActivate:[AuthGuard, RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path: 'encargados/form/:id', component: FormEncargadosComponent, canActivate:[AuthGuard, RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path: 'empleados', component: EmpleadosComponent},
  {path: 'empleados/form', component: FormEmpleadosComponent, canActivate:[AuthGuard, RoleGuard], data: {role: ['ROLE_ADMIN', 'ROLE_ENCARGADO']}},
  {path: 'empleados/form/:id', component: FormEmpleadosComponent, canActivate:[AuthGuard, RoleGuard], data: {role: ['ROLE_ADMIN', 'ROLE_ENCARGADO']} },
  {path: 'login', component: LoginComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ObrasComponent,
    EncargadosComponent,
    EmpleadosComponent,
    FormObrasComponent,
    FormEncargadosComponent,
    FormEmpleadosComponent,
    InicioComponent,
    PerfilComponent,
    PerfilEmpleadoComponent,
    LoginComponent,
    QuienesSomosComponent,
    ContactaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule, 
    MatMomentDateModule,
    MatInputModule

  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
