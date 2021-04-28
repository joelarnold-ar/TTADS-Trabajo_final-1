import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirma-eliminar-curso',
  templateUrl: './confirma-eliminar-curso.component.html',
  styleUrls: ['./confirma-eliminar-curso.component.css'],
})
export class ConfirmaEliminarCursoComponent {
  constructor(
    public referenciaVentana: MatDialogRef<ConfirmaEliminarCursoComponent>
  ) {}
}
