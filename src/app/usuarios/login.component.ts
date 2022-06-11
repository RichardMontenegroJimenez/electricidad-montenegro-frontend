import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = 'Inicie sesión para continuar';
  usuario:Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
   }

  ngOnInit() {
    if (this.authService.isAuthenticated()){
      swal('Login', `El usuario ${this.authService.usuario.username} ya está autenticado`, 'info');
      this.router.navigate(['/inicio']);
    }
  }

  login():void{
    console.log(this.usuario);
    if(this.usuario.username== null || this.usuario.password == null){
      swal('Error login', 'Username o password vacíos!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;

      this.router.navigate(['/inicio']);
      swal('Login', `El usuario ${usuario.username} ha inciado sesión con éxito`, 'success');
    },err => {
      if (err.status == 400) {
        swal('Error login', 'Usuario o contaseña incorrectos!', 'error');
      }
    }
    );

  }

}
