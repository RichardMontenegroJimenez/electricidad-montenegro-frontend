import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';
import swal from 'sweetalert2';
import { Empresa } from './empresa';
import { catchError, map, Observable, throwError } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private urlEndPoint:string = 'http://localhost:8080/api/empresas';

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

  getEmpresas(): Observable<Empresa[]> {
    return this.http.get(this.urlEndPoint, {headers: this.agregarAuthorizationHeader()}).pipe(
      map((response) => {
        let empresas = response as Empresa[];
        return empresas.map((empresa) => {
          empresa.createAt = formatDate(empresa.createAt, 'dd/MM/yyyy','en-US');
          return empresa;
        });
      })
    );
  }


  create(empresa: Empresa) : Observable<Empresa> {
    return this.http.post<Empresa>(this.urlEndPoint, empresa, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal('Error al crear la empresa', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Empresa>{
    return this.http.delete<Empresa>(`${this.urlEndPoint}/${id}` , {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        
        if (this.isNoAutorizado(e)){
          return throwError(e);
        }


        console.error(e.error.mensaje);
        swal('Error al eliminar la empresa', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }


}
