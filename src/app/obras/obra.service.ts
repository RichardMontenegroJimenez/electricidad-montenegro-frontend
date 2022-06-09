import { Injectable } from '@angular/core';
import { Obra } from './obra';
import { Observable, map, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Encargado } from '../encargados/encargado';


@Injectable({
  providedIn: 'root'
})
export class ObraService {
  private urlEndPoint:string = 'http://localhost:8080/api/obras';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
    private router: Router) { }

  getEncargados(): Observable<Encargado[]>{
    return this.http.get<Encargado[]>(this.urlEndPoint + '/encargados');
  }

  getObras(): Observable<Obra[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => response as Obra[])
    );
  }

  create(obra: Obra) : Observable<Obra> {
    return this.http.post<Obra>(this.urlEndPoint, obra, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        //Manejo de errores que vienen del backend (badrequest)
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
    return this.http.get<Obra>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/obras'])
        console.error(e.error.mensaje);
        swal('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(obra: Obra): Observable<Obra>{
    return this.http.put<Obra>(`${this.urlEndPoint}/${obra.id}` , obra, {headers: this.httpHeaders} ).pipe(
      catchError(e => {

        //Manejo de errores que vienen del backend (badrequest)
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
    return this.http.delete<Obra>(`${this.urlEndPoint}/${id}` , {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal('Error al eliminar la obra', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

}
