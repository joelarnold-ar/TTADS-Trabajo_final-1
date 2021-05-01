import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModeloMateria } from '../modelos/materia.model';

@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  // ? Variables
  private url: string = 'http://localhost:3000/materias';

  constructor(private http: HttpClient) {}

  buscarTodas(): Observable<any> {
    return this.http.get(this.url);
  }

  buscarPorNombre(cadena: string): Observable<any> {
    return this.http.get(`${this.url}?q=${cadena}`);
  }

  eliminarMateria(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  editarMateria(materia: ModeloMateria): Observable<any> {
    const encabezados = { 'Content-Type': 'application/json' };
    const cuerpo = JSON.stringify(materia);

    return this.http.put(`${this.url}/${materia.id}`, cuerpo, {
      headers: encabezados,
    });
  }

  agregarMateria(materia: ModeloMateria): Observable<any> {
    const encabezados = { 'Content-Type': 'application/json' };
    const cuerpo = JSON.stringify(materia);

    return this.http.post(this.url, cuerpo, { headers: encabezados });
  }
}
