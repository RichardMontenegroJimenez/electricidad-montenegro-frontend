import { Injectable } from '@angular/core';
import { OBRAS } from './obras.json';
import { Obra } from './obra';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ObraService {
  private urlEndPoint:string = 'http://localhost:8080/api/obras';

  constructor(private http: HttpClient) { }

  getObras(): Observable<Obra[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => response as Obra[])
    );
  }
}
