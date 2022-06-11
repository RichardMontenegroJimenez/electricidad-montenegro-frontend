import { Injectable } from '@angular/core';
import { Obra } from './obra';
import { Observable, map, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Encargado } from '../encargados/encargado';
import { AuthService } from '../usuarios/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ObraService {
  private urlEndPoint:string = 'http://localhost:8080/api/obras';

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

  getEncargados(): Observable<Encargado[]>{
    return this.http.get<Encargado[]>(this.urlEndPoint + '/encargados', {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e =>{
        this.isNoAutorizado(e);
        return throwError(e)
      })
    );
  }

  getObras(): Observable<Obra[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => response as Obra[])
    );
  }

  create(obra: Obra) : Observable<Obra> {
    return this.http.post<Obra>(this.urlEndPoint, obra, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {

        //Manejo de errores que vienen del backend (badrequest)
        if (this.isNoAutorizado(e)){
          return throwError(e);
        }


        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal('Error al crear la obra', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getObra(id): Observable<Obra>{
    return this.http.get<Obra>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {

        if (this.isNoAutorizado(e)){
          return throwError(e);
        }

        this.router.navigate(['/obras'])
        console.error(e.error.mensaje);
        swal('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(obra: Obra): Observable<Obra>{
    return this.http.put<Obra>(`${this.urlEndPoint}/${obra.id}` , obra, {headers: this.agregarAuthorizationHeader()} ).pipe(
      catchError(e => {

        //Manejo de errores que vienen del backend (badrequest)
        if (this.isNoAutorizado(e)){
          return throwError(e);
        }


        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal('Error al editar la obra', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  
  delete(id: number): Observable<Obra>{
    return this.http.delete<Obra>(`${this.urlEndPoint}/${id}` , {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        
        if (this.isNoAutorizado(e)){
          return throwError(e);
        }


        console.error(e.error.mensaje);
        swal('Error al eliminar la obra', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

}
