import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloDocente } from '../modelos/docente.model';

@Injectable({
  providedIn: 'root',
})
export class DocentesService {
  // ? Variables
  private url: string = 'http://localhost:3000/docentes';

  constructor(private http: HttpClient) {}

  buscarTodos(): Observable<any> {
    return this.http.get(this.url);
  }

  buscarUno(dni: string): Observable<any> {
    return this.http.get(`${this.url}?dni=${dni}`);
  }

  editarDocente(docente: ModeloDocente): Observable<any> {
    const encabezados = { 'Content-Type': 'application/json' };
    const cuerpo = JSON.stringify(docente);

    return this.http.put(`${this.url}/${docente.id}`, cuerpo, {
      headers: encabezados,
    });
  }
}
