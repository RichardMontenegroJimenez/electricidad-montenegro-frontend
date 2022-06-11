import { Injectable } from '@angular/core';
import { Empleado } from './empleado';
import { Observable, map, catchError, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private urlEndPoint:string = 'http://localhost:8080/api/empleados';

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

    getEmpleados(): Observable<Empleado[]> {
      return this.http.get(this.urlEndPoint, {headers: this.agregarAuthorizationHeader()}).pipe(
        map((response) => {
          let empleados = response as Empleado[];
          return empleados.map((empleado) => {
            empleado.contratacion = formatDate(empleado.contratacion, 'dd/MM/yyyy','en-US');
            return empleado;
          });
        })
      );
    }

  create(empleado: Empleado) : Observable<Empleado> {
    return this.http.post<Empleado>(this.urlEndPoint, empleado, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {

        //Manejo de errores que vienen del backend (badrequest)
        if (this.isNoAutorizado(e)){
          return throwError(e);
        }

        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal('Error al crear al empleado', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getEmpleado(id): Observable<Empleado>{
    return this.http.get<Empleado>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.router.navigate(['/empleados'])
        console.error(e.error.mensaje);
        swal('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }


  update(empleado: Empleado): Observable<Empleado>{
    return this.http.put<Empleado>(`${this.urlEndPoint}/${empleado.id}` , empleado, {headers: this.agregarAuthorizationHeader()} ).pipe(
      catchError(e => {

        //Manejo de errores que vienen del backend (badrequest)
        if (this.isNoAutorizado(e)){
          return throwError(e);
        }

        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal('Error al editar al empleado', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Empleado>{
    return this.http.delete<Empleado>(`${this.urlEndPoint}/${id}` , {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal('Error al eliminar al empleado', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    
    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if (token != null) {
      httpHeaders= httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });

    return this.http.request(req).pipe(
      catchError(e =>{
        this.isNoAutorizado(e);
        return throwError(e)
      })
    );
  }
}
