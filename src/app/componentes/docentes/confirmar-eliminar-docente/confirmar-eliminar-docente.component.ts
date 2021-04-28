import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-eliminacion',
  templateUrl: './confirmar-eliminar-docente.component.html',
  styleUrls: ['./confirmar-eliminar-docente.component.css'],
})
export class ConfirmarEliminarDocenteComponent implements OnInit {
  constructor(
    public referenciaVentana: MatDialogRef<ConfirmarEliminarDocenteComponent>
  ) {}

  ngOnInit(): void {}
}
