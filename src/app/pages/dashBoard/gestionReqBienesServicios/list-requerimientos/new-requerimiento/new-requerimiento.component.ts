import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

//Date FNS
import { isValid, parse } from 'date-fns';

//Font Awesome
import {
  faPlus,
  faTimes,
  faSave,
  faUpload,
  IconDefinition,
  faFilePdf,
  faCheck,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

// WYSIYNG
import { AngularEditorConfig } from '@kolkov/angular-editor';

// SERVICES
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-new-requerimiento',
  templateUrl: './new-requerimiento.component.html',
  styleUrls: ['./new-requerimiento.component.scss'],
})
export class NewRequerimientoComponent implements OnInit {
  //#region VARIABLES

  //Font Awesome
  faPlus: IconDefinition = faPlus;
  faCheck = faCheck;
  faTimes: IconDefinition = faTimes;
  faSave: IconDefinition = faSave;
  faUpload: IconDefinition = faUpload;
  faFilePdf: IconDefinition = faFilePdf;
  faEdit: IconDefinition = faEdit;

  //WYSING
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '300',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Ingrese texto aqui...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['subscript', 'superscript'],
      ['insertImage', 'insertVideo'],
    ],
  };

  form: FormGroup;
  formData: FormData = new FormData();

  //#region Validation Message del Formulario principal
  public validationsMessage = {
    empresa: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    descripcionGnral: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    numItem: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    cantRequerida: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    unidMedida: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    itemEquivalente: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    descripServicio: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    fichaTecnica: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    categoriaPro: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    lugarEntrega: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    fechaCierreOferta: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    fechaCompraPrevista: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    fechaEntregaEsperada: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    /*criterioEvalu: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],*/
    garantiasExigidas: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    riesgoAmp: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    cuantia: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    vigencia: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    observacionesPolizas: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    nomDocumento: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    vigenciaDias: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    documento: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    obligatorio: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
  };
  //#endregion

  //#endregion

  //#region constructor
  constructor(private fb: FormBuilder, private httpService: HttpService) {
    this.form = new FormGroup({
      id: new FormControl(null),
      otrosDocumentos: this.fb.array([]),
    });
  }
  //#endregion

  //#region LYFE CYCLE
  ngOnInit(): void {
    //#region Validaciones del Formulario Principal
    this.form = new FormGroup({
      empresa: new FormControl(null, [Validators.required]),
      descripcionGnral: new FormControl(null, [Validators.required]),
      numItem: new FormControl(null, [Validators.required]),
      cantRequerida: new FormControl(null, [Validators.required]),
      unidMedida: new FormControl(null, [Validators.required]),
      itemEquivalente: new FormControl(null, [Validators.required]),
      descripServicio: new FormControl(null, [Validators.required]),
      fichaTecnica: new FormControl(null, [Validators.required]),
      categoriaPro: new FormControl(null, [Validators.required]),
      lugarEntrega: new FormControl(null, [Validators.required]),
      fechaCierreOferta: new FormControl(null, [Validators.required]),
      fechaCompraPrevista: new FormControl(null, [Validators.required]),
      fechaEntregaEsperada: new FormControl(null, [Validators.required]),
      // criterioEvalu: new FormControl(null,[Validators.required]),
      garantiasExigidas: new FormControl(null, [Validators.required]),
      riesgoAmp: new FormControl(null, [Validators.required]),
      cuantia: new FormControl(null, [Validators.required]),
      vigencia: new FormControl(null, [Validators.required]),
      observacionesPolizas: new FormControl(null, [Validators.required]),
      nomDocumento: new FormControl(null, [Validators.required]),
      vigenciaDias: new FormControl(null, [Validators.required]),
      otrosDocumentos: this.fb.array([]),
    });

    this.onChanges();
  }

  onChanges(): void {
    const empresa = this.form.get('empresa');
    empresa?.valueChanges.subscribe((val) => {
      console.log(val);
    });

    const categoriaPro = this.form.get('categoriaPro');
    categoriaPro?.valueChanges.subscribe((val) => {
      console.log(val);
    });
  }
  //#endregion

  //#region OTROS DOCUMENTOS FormGroup
  otroDocumento(): FormGroup {
    return this.fb.group({
      documento: [null, [Validators.required]],
      vigencia: [null, [Validators.required]],
      obligatorio: [null, [Validators.required]],
    });
  }

  otroDocumentoIni(data: any): FormGroup {
    return this.fb.group({
      documento: [data.documento, [Validators.required]],
      vigencia: [data.vigencia, [Validators.required]],
      obligatorio: [data.obligatorio.toString(), [Validators.required]],
    });
  }

  otrosDocumentos(): FormArray {
    return this.form.get('otrosDocumentos') as FormArray;
  }

  addSocio() {
    this.otrosDocumentos().push(this.otroDocumento());
  }

  addSocioIni(data: any) {
    this.otrosDocumentos().push(this.otroDocumentoIni(data));
  }

  removeDocumento(i: number) {
    if (!(this.otrosDocumentos().length <= 0)) {
      this.otrosDocumentos().removeAt(i);
    }
  }

  //#endregion

  //#region FORM
  save(): void {
    // Valido si el formulario es correcto
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value);
    const valueFormulario = this.form.value;
    console.log(valueFormulario);
    const valueFormularioConvertidoAString = JSON.stringify(valueFormulario);
    console.log(valueFormularioConvertidoAString);

    this.formData.append('dataFormulario', valueFormularioConvertidoAString);

    this.httpService
      .PostFormData(this.formData, `Requerimentos/create`)
      .subscribe((resp: any) => {
        console.log(resp);
      });
  }
  isValid(field: string, validationType: string) {
    const f: any = this.form.get(field);

    return f.hasError(validationType) && (f.dirty || f.touched);
  }

  isvalidArray(field: string, validationType: string, array: any) {
    const f: any = array.get(field);
    return f.hasError(validationType) && (f.dirty || f.touched);
  }

  send(): any {
    console.log(this.form.value);
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      alert('Faltan campos obligatorios');
      return;
    }

    /* Ejecutamos funcionalidad */
    console.log('Aqui llamamos al backend');
  }
  //#endregion
}

// arrow function
