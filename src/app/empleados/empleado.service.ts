import { Injectable } from '@angular/core';
import { Empleado } from './empleado';
import { EMPLEADOS } from './empleados.json';
import { Observable, map } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private urlEndPoint:string = 'http://localhost:8080/api/empleados';

  constructor(private http: HttpClient) { }

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => response as Empleado[])
    );
  }
}
