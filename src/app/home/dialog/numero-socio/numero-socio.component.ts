import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//Componentes
import { ServicioUsuariosService } from 'src/app/servicios/servicio-usuarios.service';
import { Socio } from '../../../interfaces/socio';

@Component({
  selector: 'app-numero-socio',
  templateUrl: './numero-socio.component.html',
  styleUrls: ['./numero-socio.component.css']
})
export class NumeroSocioComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NumeroSocioComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Socio, private servicio: ServicioUsuariosService) {
  }

  ngOnInit() {
  }

  ok() {
    this.dialogRef.close();
  }

  contar(): number{
    return this.servicio.contar();
  }

}
