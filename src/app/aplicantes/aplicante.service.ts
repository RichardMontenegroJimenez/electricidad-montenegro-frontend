import { formatDate } from '@angular/common';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { Aplicante } from './aplicante';

@Injectable({
  providedIn: 'root'
})
export class AplicanteService {

  private urlEndPoint:string = 'http://localhost:8080/api/aplicantes';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
    private router: Router,
    private authService: AuthService) { }

    private agregarAuthorizationHeader(){
      let token = this.authService.token;
  
      if(token != null){
        return this.httpHeaders.append('Authorization', 'Bearer ' + token);
      }
      return this.httpHeaders;
    }  
  
    private isNoAutorizado(e):boolean{
      if(e.status==401){
        if (this.authService.isAuthenticated()){
          this.authService.logout();
        }
        this.router.navigate(['/login']);
        return true;
      }
  
      if(e.status==403){
        swal('Acceso denegado', `El usuario ${this.authService.usuario.username} no tiene acceso a este recurso`, 'warning');
        this.router.navigate(['/inicio']);
        return true;
      }
  
      return false;
    }

    getAplicantes(): Observable<Aplicante[]> {
      return this.http.get(this.urlEndPoint, {headers: this.agregarAuthorizationHeader()}).pipe(
        map((response) => {
          let aplicantes = response as Aplicante[];
          return aplicantes.map((aplicante) => {
            aplicante.createAt = formatDate(aplicante.createAt, 'dd/MM/yyyy','en-US');
            return aplicante;
          });
        })
      );
    }
  
  
    create(aplicante: Aplicante) : Observable<Aplicante> {
      return this.http.post<Aplicante>(this.urlEndPoint, aplicante, {headers: this.httpHeaders}).pipe(
        catchError(e => {
  
          if(e.status==400){
            return throwError(e);
          }
  
          console.error(e.error.mensaje);
          swal('Error al crear solicitante', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
    }
  
    delete(id: number): Observable<Aplicante>{
      return this.http.delete<Aplicante>(`${this.urlEndPoint}/${id}` , {headers: this.agregarAuthorizationHeader()}).pipe(
        catchError(e => {
          
          if (this.isNoAutorizado(e)){
            return throwError(e);
          }
  
  
          console.error(e.error.mensaje);
          swal('Error al eliminar el empleado aplicante', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
    }


}
