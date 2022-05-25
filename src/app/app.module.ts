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

const routes: Routes = [
  {path: '', redirectTo: '/obras', pathMatch: 'full'},
  {path: 'obras', component: ObrasComponent},
  {path: 'encargados', component: EncargadosComponent},
  {path: 'empleados', component: EmpleadosComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ObrasComponent,
    EncargadosComponent,
    EmpleadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
