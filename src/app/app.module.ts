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

const routes: Routes = [
  {path: '', redirectTo: '/obras', pathMatch: 'full'},
  {path: 'obras', component: ObrasComponent},
  {path: 'obras/form', component: FormObrasComponent},
  {path: 'obras/form/:id', component: FormObrasComponent},
  {path: 'encargados', component: EncargadosComponent},
  {path: 'encargados/form', component: FormEncargadosComponent},
  {path: 'encargados/form/:id', component: FormEncargadosComponent},
  {path: 'empleados', component: EmpleadosComponent},
  {path: 'empleados/form', component: FormEmpleadosComponent},
  {path: 'empleados/form/:id', component: FormEmpleadosComponent}
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
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
