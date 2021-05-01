import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-eliminar-materia',
  templateUrl: './confirmar-eliminar-materia.component.html',
  styleUrls: ['./confirmar-eliminar-materia.component.css'],
})
export class ConfirmarEliminarMateriaComponent {
  constructor(
    public referenciaVentana: MatDialogRef<ConfirmarEliminarMateriaComponent>
  ) {}
}
