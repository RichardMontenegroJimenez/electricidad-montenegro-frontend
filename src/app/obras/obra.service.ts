import { Injectable } from '@angular/core';
import { OBRAS } from './obras.json';
import { Obra } from './obra';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObraService {

  constructor() { }

  getObras(): Observable<Obra[]> {
    return of(OBRAS);
  }
}
