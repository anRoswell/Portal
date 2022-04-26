import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-requerimientos',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.scss']
})
export class RequerimientosComponent implements OnInit {

  public form!: FormGroup;
  public formObervaciones!: FormGroup;
    //#region Validation Message del Formulario principal
  
  public validationsMessage ={
    codigo:[
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    nomEmpresa: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    categoria: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    luEntrega: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    descripcion: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    cierraOferta: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    compraPrevi: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    estado: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    fechaEntrega: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ]
}
//#endregion
    //---------------------------------------------------
    //#region Inicia Array de articulos y servicios
  articulosServicios:string[] = ["ítem","Descripción","Cantidad", "Medida", "Ficha Técnica", "Obligatorio", "Ítem Equivalente", "Categoría"];
  
  thead:Array<any> = [
     {
        descripcion: "Pruebas",
        cantidad:"0",
        medida : "0",
        fichaTecnica : "1",
        obligatorio: "Si",
        itemEquivalente : "0",
        categoria : "ok"
      },
      {
        descripcion: "Pruebas",
        cantidad:"0",
        medida : "0",
        fichaTecnica : "1",
        obligatorio: "Si",
        itemEquivalente : "0",
        categoria : "ok"
      },
      {
        descripcion: "Pruebas",
        cantidad:"0",
        medida : "0",
        fichaTecnica : "1",
        obligatorio: "Si",
        itemEquivalente : "0",
        categoria : "ok"
      },
      {
        descripcion: "Pruebas",
        cantidad:"0",
        medida : "0",
        fichaTecnica : "1",
        obligatorio: "Si",
        itemEquivalente : "0",
        
        categoria : "ok"
      }
    ]
    //#endregion 
    //---------------------------------------------------
    //#region Inicio Pólizas de seguros
   polizaSeguro:string[] = ["Cobertura","Termino"];
  
      datosPolizasSeguro:Array<any> = [
          {
            cobertura: "Pruebas",
            termino:"0",
          },
          {
            cobertura: "Pruebas",
            termino:"0",
          },
          {
            cobertura: "Pruebas",
            termino:"0",
          },
          {
            cobertura: "Pruebas",
            termino:"0",
          }
      ]
    //#endregion
    //-------------------------------------------------
    //#region Inicio listado de comentarios
     listadoComentarios:string[] = ["Fecha Creación","¿Quien lo creo?", "Observación"];
  
     datosListadoComen:Array<any> = [
       {
        fechaCreacion: "Pruebas",
        persCreo:"Pepito",
        observacion:"Prueba Observacion"
       },
       {
        fechaCreacion: "Pruebas",
        persCreo:"Pablo",
        observacion:"Prueba Observacion"
       },
       {
        fechaCreacion: "Pruebas",
        persCreo:"Perez",
        observacion:"Prueba Observacion"
       },
       {
        fechaCreacion: "Pruebas",
        persCreo:"Juan",
        observacion:"Prueba Observacion"
       },
        
     ]
   //#endregion
    //-------------------------------------------------
    //#region Inicio documentos requerido
    documentoRequerido:string[] = ["Documentos","Vigencia"];
  
    datosDocumentoRequerido:Array<any> = [
        {
          documentos: "Prueba",
          vigencia:"1",
        },
        {
          documentos: "Prueba",
          vigencia:"1",
        },
        {
          documentos: "Prueba",
          vigencia:"1",
        },
        {
          documentos: "Prueba",
          vigencia:"1",
        }
    ]
  //#endregion
    //--------------------------------------------------
    //#region Inicio deL Contructor
      constructor() { }
    //#region 
  ngOnInit(): void {

    //#region Validaciones del Formulario Principal
      this.form= new FormGroup({
      nomEmpresa:new FormControl (null, [Validators.required]),
      codigo:new FormControl (null, [Validators.required]),
      categoria: new FormControl (null, [Validators.required]),
      luEntrega: new FormControl (null,[Validators.required]),
      descripcion: new FormControl (null, [Validators.required]),
      cierraOferta: new FormControl (null, [Validators.required]),
      compraPrevi: new FormControl (null, [Validators.required]),
      fechaEntrega: new FormControl(null, [Validators.required]),
      estado: new FormControl(null,[Validators.required])
    });

    //#endregion

   //#region Validaciones del Formulario Observaciones
    this.formObervaciones = new FormGroup({


    });
    //#endregion
  }

 isValid(field: string, validationType: string) {

  const f: any = this.form.get(field);

  return f.hasError(validationType) && (f.dirty || f.touched);

}
  send(): any{
    console.log(this.form.value);
    if(!this.form.valid){
      this.form.markAllAsTouched()
      alert('Faltan campos obligatorios')
      return
    }
  
    /* Ejecutamos funcionalidad */
    console.log('Aqui llamamos al backend')
  }
 }
