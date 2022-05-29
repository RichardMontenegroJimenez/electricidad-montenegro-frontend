import { Injectable } from '@angular/core';
import { Encargado } from './encargado';
import { ENCARGADOS } from './encargados.json';
import { Observable, map, catchError, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EncargadoService {
  private urlEndPoint:string = 'http://localhost:8080/api/encargados';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
    private router: Router) { }

  getEncargados(): Observable<Encargado[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => response as Encargado[])
    );
  }

  create(encargado: Encargado) : Observable<Encargado> {
    return this.http.post<Encargado>(this.urlEndPoint, encargado, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal('Error al crear al encargado', e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getEncargado(id): Observable<Encargado>{
    return this.http.get<Encargado>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/encargados'])
        console.error(e.error.mensaje);
        swal('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(encargado: Encargado): Observable<Encargado>{
    return this.http.put<Encargado>(`${this.urlEndPoint}/${encargado.id}` , encargado, {headers: this.httpHeaders} ).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal('Error al editar al encargado', e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Encargado>{
    return this.http.delete<Encargado>(`${this.urlEndPoint}/${id}` , {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal('Error al eliminar al encargado', e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
