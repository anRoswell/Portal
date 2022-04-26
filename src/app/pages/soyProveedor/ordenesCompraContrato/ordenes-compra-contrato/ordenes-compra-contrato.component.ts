import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ordenes-compra-contrato',
  templateUrl: './ordenes-compra-contrato.component.html',
  styleUrls: ['./ordenes-compra-contrato.component.scss']
})
export class OrdenesCompraContratoComponent implements OnInit {
  public form!: FormGroup;
  ordenesCompra:string[] = ["Código","Empresa","Descripción","Lugar de Entrega", "Cierre de Ofertas", "Compra Prevista","Fecha de Entrega", "Estado"];
  
  requerimientoHistoricos:Array<any> = [
      {
        codigo: "Pruebas",
        empresa:"Syspo",
        descripcion:"La mejor",
        lugarEntrega: "Pruebas",
        cierreOfertas: "Prueba",
        compraPrevista:"Prueba",
        fechaEntrega:"Prueba",
        Estado: "Prueba",
      },
      {
        codigo: "Pruebas",
        empresa:"Syspo",
        descripcion:"La mejor",
        lugarEntrega: "Pruebas",
        cierreOfertas: "Prueba",
        compraPrevista:"Prueba",
        fechaEntrega:"Prueba",
        Estado: "Prueba",
      },
      {
        codigo: "Pruebas",
        empresa:"Syspo",
        descripcion:"La mejor",
        lugarEntrega: "Pruebas",
        cierreOfertas: "Prueba",
        compraPrevista:"Prueba",
        fechaEntrega:"Prueba",
        Estado: "Prueba",
      },
      {
        codigo: "Pruebas",
        empresa:"Syspo",
        descripcion:"La mejor",
        lugarEntrega: "Pruebas",
        cierreOfertas: "Prueba",
        compraPrevista:"Prueba",
        fechaEntrega:"Prueba",
        Estado: "Prueba",
      },
      {
        codigo: "Pruebas",
        empresa:"Syspo",
        descripcion:"La mejor",
        lugarEntrega: "Pruebas",
        cierreOfertas: "Prueba",
        compraPrevista:"Prueba",
        fechaEntrega:"Prueba",
        Estado: "Prueba",
      },
      {
        codigo: "Pruebas",
        empresa:"Syspo",
        descripcion:"La mejor",
        lugarEntrega: "Pruebas",
        cierreOfertas: "Prueba",
        compraPrevista:"Prueba",
        fechaEntrega:"Prueba",
        Estado: "Prueba",
      },
      {
        codigo: "Pruebas",
        empresa:"Syspo",
        descripcion:"La mejor",
        lugarEntrega: "Pruebas",
        cierreOfertas: "Prueba",
        compraPrevista:"Prueba",
        fechaEntrega:"Prueba",
        Estado: "Prueba",
      },
      {
        codigo: "Pruebas",
        empresa:"Syspo",
        descripcion:"La mejor",
        lugarEntrega: "Pruebas",
        cierreOfertas: "Prueba",
        compraPrevista:"Prueba",
        fechaEntrega:"Prueba",
        Estado: "Prueba",
      },
      {
        codigo: "Pruebas",
        empresa:"Syspo",
        descripcion:"La mejor",
        lugarEntrega: "Pruebas",
        cierreOfertas: "Prueba",
        compraPrevista:"Prueba",
        fechaEntrega:"Prueba",
        Estado: "Prueba",
      },
  ]
  
  constructor() { }

  ngOnInit(): void {
  }

}
