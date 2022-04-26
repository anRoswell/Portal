import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-proceso-contratacion',
  templateUrl: './proceso-contratacion.component.html',
  styleUrls: ['./proceso-contratacion.component.scss']
})
export class ProcesoContratacionComponent implements OnInit {
 //#region Datos del Contratante
  //------------------------
  days = [1, 2, 3, 4, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  //#endregion
  public form!: FormGroup;
  //#region VALIDATIONS
  public validationsMessage = { 
  //-----------------------------
 //#region Datos del Contratante
 //------------------------------
     
 contratante: [
  {
  type: 'required',
  message: 'Campo requerido',
  },
  ],
  nitcontratante:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  representante_legal:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  cc_representante:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  direcio_noti: [
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  telefono:[
    { 
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  gestor_contrato:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  email_gestor:[
    { 
      type: 'required',
      message: 'Campo requerido',
    },
    {
      type: 'pattern',
      message: 'Ojo! este no es un email valido', 
    },
  ],
  coor_contrato:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  email_coor:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
    {
      type: 'pattern',
      message: 'Ojo! este no es un email valido',
    },
  ],
  //#endregion
  //------------------------
  //#region Datos del contratista
  //-------- ---------------
  contratista:[
    {
      type: 'required',
      message: 'Campo requerido', 
    },
  ],
  nitcontrante:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  representante_legal_cont:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  cc_representante_cont:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  dir_notificacion:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  telefono_cont:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  contacto:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  email_cont:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
    {
      type: 'pattern',
      message: 'Ojo! este no es un email valido',
    },
  ],
  //#endregion
  //-------------------------------
  //#region Información del contrato
  unid_negocio:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  clas_cont:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  obj_contrato:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  obligaciones_esp:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  meses:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  dias:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  fecha_inicio:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  fecha_fin:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  valor_cont:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  forma_pago:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  ingreso_personal:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  prorroga_aut:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  prorroga_meses:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  //#endregion
  //---------------------------------
  //#region Documentación del contrato
  tipo_doc:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  contrato_susc:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  acta_inicio:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  //#endregion
  //---------------------------------
 //#region Documentos Anexo
  tipo_doc_anexos:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  propuesta:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  certificado_exis:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  cc_legal:[
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  rut:[
    {
      type: 'required',
      message: 'Campo requerido',
    }
  ],
  //#endregion
  //-------------------------------------
  //#region Polizas de garantia
  comentarios: [
    {
      type: 'required',
      message: 'Campo requerido',
    },
  ],
  calidad_expedida: [
    {
           
    },
  ],
  calidad_Aprobada:[
    {

    },
  ],
  amparoPag_expedida:[
    {
      
    },
  ],
  amparoPag_Aprobada:[
    {

    },
  ],
  cumplimiento_aprobada:[
    {

    },
  ],
  cumplimiento_expedida:[
    {

    },
  ]
}

  //#endregion
  //-------------------------------------
  //#endregion
  //--------------------------
   //#region contructor
  constructor() { 

  }
 //#endregion

  ngOnInit(): void {
//-----------------------
    


    //-----------------------
    //#region Datos del Contratante
    //------------------------
    this.form = new FormGroup({
     contratante:new FormControl (null, [Validators.required]),
     nitcontratante:new FormControl (null, [Validators.required]),
     representante_legal:new FormControl (null, [Validators.required]),
     cc_representante:new FormControl (null, [Validators.required]),
     direcio_noti:new FormControl (null, [Validators.required]),
     telefono:new FormControl (null, [Validators.required]),
     gestor_contrato:new FormControl (null, [Validators.required]),
     email_gestor:new FormControl (null, [Validators.required,Validators.email]),
     coor_contrato:new FormControl (null, [Validators.required]),
     email_coor:new FormControl (null, [Validators.required,Validators.email]),
     //#endregion
     //----------------------------------
     //#region Datos del Contratista
     contratista:new FormControl (null, [Validators.required]),
     nitcontrante:new FormControl (null, [Validators.required]),
     representante_legal_cont:new FormControl (null, [Validators.required]),
     cc_representante_cont: new FormControl (null, [Validators.required]),
     dir_notificacion:new FormControl (null, [Validators.required]),
     telefono_cont:new FormControl (null, [Validators.required]),
     contacto:new FormControl (null, [Validators.required]),
     email_cont:new FormControl (null, [Validators.required, Validators.email]),
     //#endregion
     //----------------------------------------
     //#region Información de Contrato
     //----------------------------------------
     unid_negocio:new FormControl (null, [Validators.required]),
     clas_cont:new FormControl (null, [Validators.required]),
     obj_contrato:new FormControl (null, [Validators.required]),
     obligaciones_esp:new FormControl (null, [Validators.required]),
     meses:new FormControl (null, [Validators.required]),
     dias:new FormControl (null, [Validators.required]),   //Pendiente el campo dias
     fecha_inicio:new FormControl (null, [Validators.required]),
     fecha_fin:new FormControl (null, [Validators.required]),
     valor_cont:new FormControl (null, [Validators.required]),
     forma_pago:new FormControl (null, [Validators.required]),
     ingreso_personal:new FormControl (null, [Validators.required]),
     prorroga_aut:new FormControl (null, [Validators.required]),
     prorroga_meses:new FormControl (null, [Validators.required]),
     //#endregion
     //-----------------------------------------
    //#region Documentación del contrato
    //-----------------------------------------
     tipo_doc:new FormControl (null, [Validators.required]),
     contrato_susc:new FormControl (null, [Validators.required]),
     acta_inicio:new FormControl (null, [Validators.required]),
    //#endregion
     //------------------------------------------
    //#region Documentación Anexos
    //-------------------------------------------
     tipo_doc_anexos:new FormControl (null, [Validators.required]),
     propuesta:new FormControl (null, [Validators.required]),
     certificado_exis:new FormControl (null, [Validators.required]),
     cc_legal:new FormControl (null, [Validators.required]),
     rut:new FormControl (null, [Validators.required]),
    //#endregion
     //-------------------------------------------
    //#region Polizas de Garantía
    //-------------------------------------------
    calidad_expedida:new FormControl (null, [Validators.required]),
    calidad_Aprobada:new FormControl (null, [Validators.required]),
    amparoPag_expedida:new FormControl (null, [Validators.required]),
    amparoPag_Aprobada:new FormControl (null, [Validators.required]),
    cumplimiento_aprobada:new FormControl (null, [Validators.required]),
    cumplimiento_expedida:new FormControl (null, [Validators.required]),
    comentarios:new FormControl (null, [Validators.required]),
    
  });
    //#endregion
  }
/**

   * Metodo q valida los campos de los formularios

   * @param field = campo a validar

   * @param validationType tipo de validacion a mostrar mensaje de error

   * @returns devuelve boolean

   */

 isValid(field: string, validationType: string) {

  const f: any = this.form.get(field);

  return f.hasError(validationType) && (f.dirty || f.touched);

}

send(): any{
  console.log(this.form.value);
  if(!this.form.valid){
    this.form.markAllAsTouched()
    alert(`Faltan campos obligatorios`)
    return
  }

  /* Ejecutamos funcionalidad */
  console.log('Aqui llamamos al backend')
}
}