import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModeloCurso } from '../modelos/curso.model';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  // ? Variables
  private url: string = 'http://localhost:3000/cursos';

  constructor(private http: HttpClient) {}

  buscarTodos(): Observable<any> {
    return this.http.get(this.url);
  }

  buscarPorTurno(turno: string): Observable<any> {
    return this.http.get(`${this.url}?turno=${turno}`);
  }

  eliminarCurso(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  editarCurso(curso: ModeloCurso): Observable<any> {
    const encabezados = { 'Content-Type': 'application/json' };
    const cuerpo = JSON.stringify(curso);

    return this.http.put(`${this.url}/${curso.id}`, cuerpo, {
      headers: encabezados,
    });
  }

  agregarCurso(curso: ModeloCurso): Observable<any> {
    const encabezados = { 'Content-Type': 'application/json' };
    const cuerpo = JSON.stringify(curso);

    return this.http.post(this.url, cuerpo, { headers: encabezados });
  }
}
