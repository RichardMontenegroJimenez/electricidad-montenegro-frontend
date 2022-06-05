import { Injectable } from '@angular/core';
import { Encargado } from './encargado';
import { Observable, map, catchError, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class EncargadoService {
  private urlEndPoint: string = 'http://localhost:8080/api/encargados';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getEncargados(): Observable<Encargado[]> {
    return this.http.get(this.urlEndPoint).pipe(
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
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          //Manejo de errores que vienen del backend (badrequest)
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
    return this.http.get<Encargado>(`${this.urlEndPoint}/${id}`).pipe(
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
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          //Manejo de errores que vienen del backend (badrequest)
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
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
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

      const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
        reportProgress: true
      });

      return this.http.request(req);
    }
}
