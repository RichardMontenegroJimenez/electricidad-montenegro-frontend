import { Injectable } from '@angular/core';
import { Encargado } from './encargado';
import { ENCARGADOS } from './encargados.json';
import { Observable, map } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EncargadoService {
  private urlEndPoint:string = 'http://localhost:8080/api/encargados';

  constructor(private http: HttpClient) { }

  getEncargados(): Observable<Encargado[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => response as Encargado[])
    );
  }
}
