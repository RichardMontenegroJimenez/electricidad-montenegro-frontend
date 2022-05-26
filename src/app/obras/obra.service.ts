import { Injectable } from '@angular/core';
import { OBRAS } from './obras.json';
import { Obra } from './obra';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ObraService {
  private urlEndPoint:string = 'http://localhost:8080/api/obras';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getObras(): Observable<Obra[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => response as Obra[])
    );
  }

  create(obra: Obra) : Observable<Obra> {
    return this.http.post<Obra>(this.urlEndPoint, obra, {headers: this.httpHeaders})
  }

  getObra(id): Observable<Obra>{
    return this.http.get<Obra>(`${this.urlEndPoint}/${id}`)
  }

  update(obra: Obra): Observable<Obra>{
    return this.http.put<Obra>(`${this.urlEndPoint}/${obra.id}` , obra, {headers: this.httpHeaders} )
  }
  
  delete(id: number): Observable<Obra>{
    return this.http.delete<Obra>(`${this.urlEndPoint}/${id}` , {headers: this.httpHeaders})
  }

}
