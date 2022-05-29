import { Injectable } from '@angular/core';
import { Empleado } from './empleado';
import { EMPLEADOS } from './empleados.json';
import { Observable, map, catchError, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private urlEndPoint:string = 'http://localhost:8080/api/empleados';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
    private router: Router) { }

    getEmpleados(): Observable<Empleado[]> {
      return this.http.get(this.urlEndPoint).pipe(
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
    return this.http.post<Empleado>(this.urlEndPoint, empleado, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        //Manejo de errores que vienen del backend (badrequest)
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
    return this.http.get<Empleado>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/empleados'])
        console.error(e.error.mensaje);
        swal('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }


  update(empleado: Empleado): Observable<Empleado>{
    return this.http.put<Empleado>(`${this.urlEndPoint}/${empleado.id}` , empleado, {headers: this.httpHeaders} ).pipe(
      catchError(e => {

        //Manejo de errores que vienen del backend (badrequest)
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
    return this.http.delete<Empleado>(`${this.urlEndPoint}/${id}` , {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal('Error al eliminar al empleado', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
