import { Injectable } from '@angular/core';
import { Encargado } from './encargado';
import { Observable, map, catchError, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root',
})
export class EncargadoService {
  private urlEndPoint: string = 'http://localhost:8080/api/encargados';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}
  
  private agregarAuthorizationHeader(){
    let token = this.authService.token;

    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e):boolean{
    if(e.status==401){
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

  getEncargados(): Observable<Encargado[]> {
    return this.http.get(this.urlEndPoint, {headers: this.agregarAuthorizationHeader()}).pipe(
      map((response) => {
        let encargados = response as Encargado[];
        return encargados.map((encargado) => {
          encargado.contratacion = formatDate(encargado.contratacion, 'dd/MM/yyyy','en-US');
          return encargado;
        });
      })
    );
  }

  create(encargado: Encargado): Observable<Encargado> {
    return this.http
      .post<Encargado>(this.urlEndPoint, encargado, {
        headers: this.agregarAuthorizationHeader(),
      })
      .pipe(
        catchError((e) => {
          //Manejo de errores que vienen del backend (badrequest)
          if (this.isNoAutorizado(e)){
            return throwError(e);
          }

          if (e.status == 400) {
            return throwError(e);
          }

          console.error(e.error.mensaje);
          swal('Error al crear al encargado', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  getEncargado(id): Observable<Encargado> {
    return this.http.get<Encargado>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError((e) => {
        this.router.navigate(['/encargados']);
        console.error(e.error.mensaje);
        swal('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(encargado: Encargado): Observable<Encargado> {
    return this.http
      .put<Encargado>(`${this.urlEndPoint}/${encargado.id}`, encargado, {
        headers: this.agregarAuthorizationHeader(),
      })
      .pipe(
        catchError((e) => {
          //Manejo de errores que vienen del backend (badrequest)
          if (this.isNoAutorizado(e)){
            return throwError(e);
          }

          if (e.status == 400) {
            return throwError(e);
          }

          console.error(e.error.mensaje);
          swal('Error al editar al encargado', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  delete(id: number): Observable<Encargado> {
    return this.http
      .delete<Encargado>(`${this.urlEndPoint}/${id}`, {
        headers: this.agregarAuthorizationHeader(),
      })
      .pipe(
        catchError((e) => {

          if (this.isNoAutorizado(e)){
            return throwError(e);
          }

          console.error(e.error.mensaje);
          swal('Error al eliminar al encargado', e.error.mensaje, 'error');
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
