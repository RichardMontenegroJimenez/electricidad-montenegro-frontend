import { Component, OnInit } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout():void{
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal('Sesión cerrada', `El usuario ${username} ha cerrado sesión`, 'info');
    this.router.navigate(['/login'])

  }

}
