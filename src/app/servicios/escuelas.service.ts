import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloEscuela } from '../modelos/escuela.model';

@Injectable({
  providedIn: 'root',
})
export class EscuelasService {
  // ? Variables
  private url: string = 'http://localhost:3000/escuelas';

  constructor(private http: HttpClient) {}

  buscarEscuelas(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

  eliminarEscuela(id) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
