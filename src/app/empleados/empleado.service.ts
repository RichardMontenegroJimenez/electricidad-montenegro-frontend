import { Injectable } from '@angular/core';
import { Empleado } from './empleado';
import { EMPLEADOS } from './empleados.json';
import { Observable, map } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private urlEndPoint:string = 'http://localhost:8080/api/empleados';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => response as Empleado[])
    );
  }

  create(empleado: Empleado) : Observable<Empleado> {
    return this.http.post<Empleado>(this.urlEndPoint, empleado, {headers: this.httpHeaders})
  }
}
