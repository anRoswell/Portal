import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
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
  faWindowClose,
  faUpload,
  faFileExcel,
  faTrash,
  faRedo,
  faAsterisk,
  faCalendar,
  IconDefinition,
  faFilePdf,
  faCheck,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

//Sweet Fire
import Swal from 'sweetalert2';

//Modelos
import {
  IDocumentos,
  IDocumentosRegistrados,
} from 'src/app/models/documentos.model';

//Servicios
import { HttpService } from 'src/app/service/http.service';
import { MessageService } from 'primeng/api';
import { SignalrService } from 'src/app/service/signalr.service';
import { Subject } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IProveedor } from 'src/app/models/proveedor.model';

@Component({
  selector: 'app-registrarme-proveedor',
  templateUrl: './registrarme-proveedor.component.html',
  styleUrls: ['./registrarme-proveedor.component.scss'],
})
export class RegistrarmeProveedorComponent implements OnInit {
  //#region VARIABLES
  //Modal
  id: number = 0;
  title: string;
  list: any[] = [];
  action: string = 'new';
  data: IProveedor;

  //Captcha
  siteKey = '6Lf-PGYfAAAAAEvglDsbMWkplHEugwhYb1I9i8QS';

  //Generales
  public varDisabledDiv = false;
  element: HTMLElement;
  dismissible = true;
  alert = false;
  peopleLoading: boolean = false;

  //Font Awesome
  faPlus: IconDefinition = faPlus;
  faCheck = faCheck;
  faGestorVerifiy = faWindowClose;
  faTimes: IconDefinition = faTimes;
  faSave: IconDefinition = faSave;
  faWindowClose: IconDefinition = faWindowClose;
  faUpload: IconDefinition = faUpload;
  faFileExcel: IconDefinition = faFileExcel;
  faTrash: IconDefinition = faTrash;
  faRedo: IconDefinition = faRedo;
  faAsterisk: IconDefinition = faAsterisk;
  faCalendar: IconDefinition = faCalendar;
  faFilePdf: IconDefinition = faFilePdf;
  faEdit: IconDefinition = faEdit;

  //Variables generales
  logo: string = 'assets/img/logoubs.png';
  productos: any = [];
  ciudades: any = [];
  ciudadesFilter: any = [];
  departamentos: any = [];
  tipoProveedores: any[];
  condicionesPago: any = [];
  empresas: any = [];
  bancos: any = [];
  validationMsg = false;
  msgError = 'Todos los campos son obligatorios!!!';
  verCualTipoProve = false;
  verCualTipoPago = false;
  verPorcentajePago = false;
  //#region
  /** MENSAJES EN LA VALIDACION  **/
  validationsMessage = {
    prvFechaEnvio: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvNombreProveedor: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvNit: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvDireccion: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    departamento: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvCodCiudad: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvTelefono: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvContacto: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvMail: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvRteLegalNombre: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvRteLegalIdentificacion: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvRteLegalCodCiudad: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvRteLegalTelefonoMovil: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvRteLegalEmail: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvCodBanco: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvDtllesBanNroCuenta: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvCodTipoCuenta: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvProveeedor: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvCodTipoProveeedor: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    prvTipoProveedorCual: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    ListProdServicios: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvCpaCodCondicionesPago: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvCpaCual: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvPoliticaTratamientoDatosPersonales: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvDeclaramientoInhabilidadesInteres: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvExperienciaSector: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvCpaContadoCual: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],

    socNombre: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    socIdentificacion: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    socCodCiudad: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    socDireccion: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],

    refEmpresa: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    refTelefono: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    refContacto: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
  };

  validationsMessage02 = {
    PrvNit: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
    PrvCodValidation: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
  };
  //#endregion

  //Load file
  private formData = new FormData();
  public checkDocuments = [];
  public filesUpload: Array<IDocumentos> = [];
  public divFile = true;

  private formDataRequired = new FormData();
  public checkDocumentsRequired = [];
  public filesUploadRequired: Array<any> = [];
  public divFileRequired = true;

  public htmlStr: string;
  //Simulate load document
  listDocumentos: Array<IDocumentos>;

  public form: FormGroup;
  public form02: FormGroup;
  userLogin: any;
  prvDocumentos: any[];

  //Progress Bar
  progress = 0;

  // Modal
  public onClose: Subject<boolean>;
  btnCloseModalPress = false;
  listaRestrictivas: any;

  // Tipo listas Restrictivas
  tipoListasRestrictivas01: Array<any> = [];
  tipoListasRestrictivas02: Array<any> = [];
  tipoListasRestrictivas03: Array<any> = [];
  tipoListasRestrictivas04: Array<any> = [];

  // TabSelected
  tabSelectedInspector = false;
  readAllDocuments = false;
  readFormaulario = false;
  display: boolean = false;

  //Button
  showButton = false;
  showCaptcha: boolean = true;

  //#endregion

  //#region Constructor
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private messageService: MessageService,
    private signalrService: SignalrService,
    private modalService: BsModalService
  ) {
    this.form = this.fb.group({
      id: [0],
      prvFechaEnvio: ['', Validators.required],
      PrvNombreProveedor: ['', Validators.required],
      PrvNit: ['', Validators.required],
      PrvDireccion: ['', Validators.required],
      PrvCodCiudad: ['', Validators.required],
      PrvTelefono: ['', Validators.required],
      PrvContacto: ['', Validators.required],
      PrvMail: ['', Validators.required],
      PrvRteLegalCodigoVerificacion: [null],
      PrvRteLegalNombre: ['', Validators.required],
      PrvRteLegalIdentificacion: ['', Validators.required],
      PrvRteLegalCodCiudad: ['', Validators.required],
      PrvRteLegalTelefonoMovil: ['', Validators.required],
      PrvRteLegalEmail: ['', Validators.required],
      PrvRevisorFiscalCodigoVerificacion: [null],
      PrvRevisorFiscalIdentificacion: ['', Validators.required],
      PrvRevisorFiscalCodCiudad: ['', Validators.required],
      PrvRevisorFiscalTelefonoMovil: ['', Validators.required],
      PrvRevisorFiscalEmail: ['', Validators.required],
      PrvCodBanco: ['', Validators.required],
      PrvDtllesBanNroCuenta: ['', Validators.required],
      PrvCodTipoCuenta: ['', Validators.required],
      PrvProveeedor: ['', Validators.required],
      PrvCodTipoProveeedor: ['', Validators.required],
      prvTipoProveedorCual: [''],
      ListProdServicios: ['', Validators.required],
      PrvCpaCodCondicionesPago: ['', Validators.required],
      PrvCpaCual: [''],
      PrvCpaContadoCual: [''],
      ListEmpresas: ['', Validators.required],
      PrvExperienciaSector: ['', Validators.required],
      PrvPoliticaTratamientoDatosPersonales: ['', Validators.requiredTrue],
      PrvDeclaramientoInhabilidadesInteres: ['', Validators.requiredTrue],
      departamento: [null, Validators.required],
      PrvSocios: this.fb.array([]),
      PrvReferencias: this.fb.array([]),
      CodUser: ['7777777', Validators.required],
      ValGestor: [true],
      PrvValidationNumber: [0],
      // captcha: [false, Validators.requiredTrue],
    });

    this.form02 = new FormGroup({
      PrvNit: new FormControl(null, [Validators.required]),
      PrvCodValidation: new FormControl(null, [Validators.required]),
    });

    this.btnCloseModalPress = false;

    this.addSocio();
    this.addReferencia();
  }
  //#endregion

  //#region Cicle Life
  ngOnInit(): void {
    this.onClose = new Subject();
    //this.cargarParametros();
  }

  ngAfterViewInit() {
    this.cargarParametros();
    this.signalrService
      .startConnection()
      .then(() => {
        this.signalrService.hubConnection.on(
          'CreateProveedorEmit',
          (resp: any) => {
            const prvNitDigitado = this.form.get('PrvNit')?.value;
            const { id } = resp;
            const { progress } = resp.data;

            if (prvNitDigitado === id) {
              this.progress = progress;
            }
          }
        );
      })
      .catch((err: any) =>
        console.log('Error while starting connection: ' + err)
      );
  }

  ngOnDestroy() {
    if (!this.btnCloseModalPress) {
      const resp = this.closeModalReturn();
      this.onClose.next(resp);
    }
  }
  //#endregion

  //#region JOSE
  cargarParametros() {
    const CodProveedor = this.id;
    let Operacion = 1;

    console.log(this.action);

    switch (this.action) {
      case 'new':
        Operacion = 1;
        this.showButton = true;
        this.showCaptcha = true;
        this.readFormaulario = false;
        break;
      case 'consultar':
        Operacion = 3;
        this.showButton = false;
        this.showCaptcha = false;

        this.readFormaulario = true;
        break;
      default:
        this.showButton = false;
        this.showCaptcha = false;

        this.readFormaulario = true;
        Operacion = 1;
        break;
    }

    const params = new HttpParams()
      .set('Operacion', Operacion.toString())
      .set('idProveedor', CodProveedor.toString());

    this.httpService
      .GetParams(`Proveedor/ParametrosProveedor`, params)
      .subscribe((resp) => {
        const {
          ciudades,
          departamentos,
          tipoProveedores,
          productoServicios,
          condicionesPagos,
          empresas,
          documentos,
          bancos,
          listaRestrictivas,
        } = resp.data;
        this.ciudades = ciudades;
        this.departamentos = departamentos;
        this.tipoProveedores = tipoProveedores;
        this.productos = productoServicios;
        this.condicionesPago = condicionesPagos;
        this.empresas = empresas;
        this.listDocumentos = documentos;
        this.bancos = bancos;
        this.listaRestrictivas = listaRestrictivas;

        this.extracListasRestrictivas();

        console.log(this.action);

        if (this.action === 'consultar') {
          this.varDisabledDiv = true;
          this.getProveedor();
        } else if (this.action === 'edit') {
          this.getProveedor(CodProveedor, true);
        }
      });
  }

  /**
   * Agrupamos listas Restrictivas en variables de acuerdo a su acción
   */
  extracListasRestrictivas() {
    this.tipoListasRestrictivas01 = this.listaRestrictivas.filter(
      (item: any) => item.prvPlrCodPrvTipoUsListaRtva === 1
    );
    this.tipoListasRestrictivas02 = this.listaRestrictivas.filter(
      (item: any) => item.prvPlrCodPrvTipoUsListaRtva === 2
    );
    this.tipoListasRestrictivas03 = this.listaRestrictivas.filter(
      (item: any) => item.prvPlrCodPrvTipoUsListaRtva === 3
    );
    this.tipoListasRestrictivas04 = this.listaRestrictivas.filter(
      (item: any) => item.prvPlrCodPrvTipoUsListaRtva === 4
    );
  }

  isValid(field: string, validationType: string) {
    const f: any = this.form.get(field);
    return f.hasError(validationType) && (f.dirty || f.touched);
  }

  isValid02(field: string, validationType: string) {
    const f: any = this.form02.get(field);
    return f.hasError(validationType) && (f.dirty || f.touched);
  }

  isvalidArray(field: string, validationType: string, array: any) {
    const f: any = array.get(field);
    return f.hasError(validationType) && (f.dirty || f.touched);
  }

  changeDepartamento() {
    const dep = this.form.get('departamento')?.value;
    if (dep) {
      this.ciudadesFilter = this.ciudades.filter(
        (item: any) => item.codDepartamento == dep
      );
    } else {
      this.ciudadesFilter = [];
    }
  }

  changeTipoProveedor() {
    const tipo = this.form.get('PrvCodTipoProveeedor')?.value;
    if (tipo) {
      if (tipo == 4) {
        this.verCualTipoProve = true;

        this.form.controls.prvTipoProveedorCual.setValidators([
          Validators.required,
        ]);
        this.form.controls.prvTipoProveedorCual.updateValueAndValidity();
      } else {
        this.verCualTipoProve = false;
        this.form.controls.prvTipoProveedorCual.clearValidators();
        this.form.controls.prvTipoProveedorCual.setValue('');
        this.form.controls.prvTipoProveedorCual.updateValueAndValidity();
      }
    } else {
      this.verCualTipoProve = false;
      this.form.controls.prvTipoProveedorCual.clearValidators();
      this.form.controls.prvTipoProveedorCual.setValue('');
      this.form.controls.prvTipoProveedorCual.updateValueAndValidity();
    }
  }

  changeTipoPago() {
    const tipo = this.form.get('PrvCpaCodCondicionesPago')?.value;

    if (tipo) {
      if (tipo == 5) {
        this.verPorcentajePago = true;
        this.form.controls.PrvCpaContadoCual.setValidators([
          Validators.required,
        ]);
        this.form.controls.PrvCpaContadoCual.updateValueAndValidity();
      } else {
        this.verPorcentajePago = false;
        this.form.controls.PrvCpaContadoCual.clearValidators();
        this.form.controls.PrvCpaContadoCual.setValue('');
        this.form.controls.PrvCpaContadoCual.updateValueAndValidity();
      }

      if (tipo == 7) {
        this.verCualTipoPago = true;
        this.form.controls.PrvCpaCual.setValidators([Validators.required]);
        this.form.controls.PrvCpaCual.updateValueAndValidity();
      } else {
        this.verCualTipoPago = false;
        this.form.controls.PrvCpaCual.clearValidators();
        this.form.controls.PrvCpaCual.setValue('');
        this.form.controls.PrvCpaCual.updateValueAndValidity();
      }
    } else {
      this.verCualTipoPago = false;
      this.form.controls.PrvCpaCual.clearValidators();
      this.form.controls.PrvCpaCual.setValue('');
      this.form.controls.PrvCpaCual.updateValueAndValidity();

      this.verPorcentajePago = false;

      this.form.controls.PrvCpaContadoCual.clearValidators();
      this.form.controls.PrvCpaContadoCual.setValue('');
      this.form.controls.PrvCpaContadoCual.updateValueAndValidity();
    }
  }

  socios(): FormArray {
    return this.form.get('PrvSocios') as FormArray;
  }

  addSocio() {
    this.socios().push(this.newSocio());
  }

  addSocioIni(data: any) {
    this.socios().push(this.newSocioIni(data));
  }

  removeSocio(i: number) {
    if (!(this.socios().length <= 0)) {
      this.socios().removeAt(i);
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }

  newSocio(): FormGroup {
    return this.fb.group({
      socNombre: ['', [Validators.required]],
      socIdentificacion: ['', [Validators.required]],
      socCodValidacion: [null],
      socCodCiudad: ['', [Validators.required]],
      socDireccion: ['', [Validators.required]],
    });
  }

  newSocioIni(data: any): FormGroup {
    return this.fb.group({
      socNombre: [data.socNombre, [Validators.required]],
      socIdentificacion: [data.socIdentificacion, [Validators.required]],
      socCodValidacion: [data.socIdentificacion, [Validators.required]],
      socCodCiudad: [data.socCodCiudad.toString(), [Validators.required]],
      socDireccion: [data.socDireccion, [Validators.required]],
    });
  }

  referencias(): FormArray {
    return this.form.get('PrvReferencias') as FormArray;
  }

  addReferencia() {
    this.referencias().push(this.newReferencia());
  }

  addReferenciaIni(data: any) {
    this.referencias().push(this.newReferenciaIni(data));
  }

  removeReferencia(i: number) {
    if (!(this.referencias().length <= 0)) {
      this.referencias().removeAt(i);
    }
  }

  newReferencia(): FormGroup {
    return this.fb.group({
      refEmpresa: ['', [Validators.required]],
      refTelefono: ['', [Validators.required]],
      refContacto: ['', [Validators.required]],
    });
  }

  newReferenciaIni(data: any): FormGroup {
    return this.fb.group({
      refEmpresa: [data.refEmpresa, [Validators.required]],
      refTelefono: [data.refTelefono, [Validators.required]],
      refContacto: [data.refContacto, [Validators.required]],
    });
  }

  customSearchFnDepa(term: string, item: any) {
    term = term.toLowerCase();
    return item.departamento1.toLowerCase().indexOf(term) > -1;
  }

  customSearchFnCiudad(term: string, item: any) {
    term = term.toLowerCase();
    return item.ciudad.toLowerCase().indexOf(term) > -1;
  }

  customSearchFnBanco(term: string, item: any) {
    term = term.toLowerCase();
    return item.banDescripcion.toLowerCase().indexOf(term) > -1;
  }

  customSearchFnTipoPro(term: string, item: any) {
    term = term.toLowerCase();
    return item.tipPrvNombreTipoProveedor.toLowerCase().indexOf(term) > -1;
  }

  customSearchFnCondi(term: string, item: any) {
    term = term.toLowerCase();
    return item.condDescripcion.toLowerCase().indexOf(term) > -1;
  }

  customSearchFnProduc(term: string, item: any) {
    term = term.toLowerCase();
    return item.proSer_Descripcion.toLowerCase().indexOf(term) > -1;
  }

  customSearchFnEmpresa(term: string, item: any) {
    term = term.toLowerCase();
    return item.empNombreEmpresa.toLowerCase().indexOf(term) > -1;
  }

  guardar(data: any) {
    this.formData.delete('Proveedor');
    let validDoc = true;

    if (this.action !== 'edit') {
      validDoc = this.validateFormDocuments();
    }

    this.validationMsg = false;

    const validForm = this.form.valid;

    if (!validForm || !validDoc) {
      this.form.markAllAsTouched();
      this.validationMsg = true;
      alert(`Todos los campos son requeridos!!!`);
    } else {
      const dataFormProveedores = this.form.value;

      const dataStringify = JSON.stringify(dataFormProveedores);

      const listDocumentos = JSON.stringify(this.listDocumentos);

      this.formData.append('Proveedor', dataStringify);
      this.formData.append('ListDocuments', listDocumentos);

      this.showFormData(this.formData);

      if (this.action !== 'edit') {
        this.httpService
          .PostFormData(this.formData, 'Proveedor/Create')
          .subscribe((resp) => {
            this.respSaveUpdateProveedor(resp);
          });
      } else {
        this.httpService
          .PutFormData(this.formData, 'Proveedor/Update')
          .subscribe((resp) => {
            this.respSaveUpdateProveedor(resp);
          });
      }
    }
  }

  /**
   * Respuesta que le mostramos al usuario
   * @param resp objeto
   */
  respSaveUpdateProveedor(resp: any) {
    if (resp.status == 200) {
      if (resp.data[0].estado) {
        Swal.fire({
          title: 'CONFIRMAR REGISTRO',
          text: resp.data[0].mensaje,
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then((_) => {
          this.onNavigate(resp.data[0].url);
        });
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al crear proveedor!!!',
      });
    }
  }

  onNavigate(url: string) {
    window.open(url, '_blank');
  }

  //#endregion

  //#region ALFO DOCUMENTS

  /**
   * Validamos el formulario
   */
  validateFormDocuments(): boolean {
    this.showFormData(this.formDataRequired);
    let sendForm = true;

    this.htmlStr = '';

    Promise.all(
      this.listDocumentos.map((file) => {
        if (file.cocrequiered && file.selected === 0) {
          this.htmlStr += `<p><fa-icon [icon]="faUpload"></fa-icon> El archivo <strong>${file.cocNombreDocumento}</strong> es requerido!!!</p>`;
          this.alert = true;
          sendForm = false;
        }

        if (file.cocVigencia && file.vigenciaSelected === 0) {
          this.htmlStr += `<p><fa-icon [icon]="faCalendar"></fa-icon> <strong>Vigencia</strong> del <strong>${file.cocNombreDocumento}</strong> es requerida!!!</p>`;
          this.alert = true;
          sendForm = false;
        }
      })
    );

    if (sendForm) {
      this.alert = false;
      return true;
    } else {
      return false;
    }
  }

  vigencia(e: any): void {
    const validDate = parse(e.target.value, 'yyyy-MM-dd', new Date());

    Promise.all(
      this.listDocumentos.map((item) => {
        if (item.id === parseInt(e.target.id) && isValid(validDate)) {
          item.vigenciaDate = validDate;
          item.vigenciaSelected = 1;
        }

        if (!isValid(validDate)) {
          item.vigenciaSelected = 0;
        }
      })
    );
  }

  /**
   * Capturamos evento de cambio en el input para la carga de Otros Documentos
   * @param fileChangeEvent = evento
   */
  async onFileChange(fileChangeEvent: any) {
    // Get a reference to the file that has just been added to the input
    const file: any = fileChangeEvent.target.files[0];

    if (file) {
      const ext = file.name.split('.')[1];

      if (ext !== 'pdf') {
        alert(`Solo se acepta archivo .pdf`);
        fileChangeEvent.target.value = '';
        return;
      }

      const otrosDocumentos = {
        cocDescripcion: 'Otros documentos',
        cocEstado: true,
        id: 0,
        cocNombreDocumento: 'Otros documentos',
        cocVigencia: false,
        cocVigenciaMaxima: 0,
        coclimitLoad: 0,
        cocrequiered: false,
        codUser: '7777777',
        codUserUpdate: '7777777',
        fechaRegistro: new Date(),
        fechaRegistroUpdate: new Date(),
        info: '0|0|0',
        infoUpdate: '0|0|0',
        selected: 1,
        vigenciaDate: undefined,
        vigenciaSelected: 0,
        name: file.name,
        size: file.size,
        valGestor: false,
        urlDoc: '',
        prvdUrlDocument: '',
        prvdCodDocumento: 0,
      };

      //Variable que muestra en la vista
      this.filesUpload.push(otrosDocumentos);

      // Add the file that was just added to the form data
      this.formData.append(`OthersFiles`, file, `0-${file.name}`);

      this.divFile = false;
    }

    fileChangeEvent.target.value = '';
  }

  /**
   * Capturamos evento de cambio en el input
   * @param fileChangeEvent = evento
   */
  async onFileChangeRequired(fileChangeEvent: any, itemFile: any) {
    // Get a reference to the file that has just been added to the input
    const file: any = fileChangeEvent.target.files[0];

    if (file) {
      const ext = file.name.split('.')[1];
      if (ext !== 'pdf') {
        alert(`Solo se acepta archivo .pdf`);
        fileChangeEvent.target.value = '';
        return;
      }

      // Add the file that was just added to the form data
      this.formData.append(
        `FilesRequired`,
        file,
        `${fileChangeEvent.target.id}-${file.name}`
      );

      //Para temas de validación
      Promise.all(
        this.listDocumentos.map((item) => {
          if (item.id === parseInt(fileChangeEvent.target.id)) {
            item.selected = 1;
          }
        })
      );

      this.divFileRequired = false;
    }

    //fileChangeEvent.target.value = '';
  }

  /**
   * Metodo encargado de borrar archivo cargado
   * @param indexOfelement Indice en el array del elemento a borrar
   */
  deleteFileLoaded(indexOfelement: number) {
    Swal.fire({
      title: 'Borrar archivo?',
      text: 'Estas seguro que quieres borrar el archivo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteFile(indexOfelement);
      }
    });
  }

  /**
   * Metodo encargado de borrar archivo cargado
   * @param index Indice en el array del elemento a borrar
   */
  deleteFile(index: number) {
    this.filesUpload.splice(index, 1);
    this.formData.delete(`fil${index}`);
    this.divFile = true;
  }

  /**
   * Consultamos proveedor por su Id
   * @param idPrv id del Proveedor
   * @param edit acción a realizar
   */
  getProveedor(idPrv = 0, edit = false) {
    console.log(`Por aqui paso`);

    let id = edit ? idPrv : this.data.id;

    const params = new HttpParams().set('id', id);
    this.httpService
      .GetParams(`Proveedor/SearchDetalle`, params)
      .subscribe((resp) => {
        this.prvDocumentos = resp.data.prvDocumentos;
        this.setProveedorForm(resp.data);

        if (edit) {
          this.setListDocument();
        }

        this.display = false;
        this.action = 'edit';
      });
  }

  /**
   * Coloca la data en el formulario para su edicion
   * @param data objeto con la data
   */
  setProveedorForm(data: any) {
    //console.log(data);
    const proveedor = data.proveedores[0];

    this.readAllDocuments = this.validaDocumentSelected();

    this.form.patchValue({
      id: proveedor.id,
      PrvCodBanco: proveedor.prvCodBanco,
      departamento: proveedor.codigoDepartamento,
      PrvCodCiudad: proveedor.prvCodCiudad.toString(),
      PrvCodTipoCuenta: proveedor.prvCodTipoCuenta.toString(),
      PrvCodTipoProveeedor: proveedor.prvCodTipoProveeedor,
      PrvContacto: proveedor.prvContacto,
      PrvCpaCodCondicionesPago: proveedor.prvCpaCodCondicionesPago,
      PrvCpaContadoCual: proveedor.prvCpaContadoCual,
      PrvCpaCual: proveedor.prvCpaCual,
      PrvDeclaramientoInhabilidadesInteres:
        proveedor.prvDeclaramientoInhabilidadesInteres,
      PrvDireccion: proveedor.prvDireccion,
      PrvDtllesBanNroCuenta: proveedor.prvDtllesBanNroCuenta,
      PrvExperienciaSector: proveedor.prvExperienciaSector.toString(),
      prvFechaEnvio: proveedor.fechaTexto,
      PrvMail: proveedor.prvMail,
      PrvNit: proveedor.prvNit,
      PrvNombreProveedor: proveedor.prvNombreProveedor,
      PrvPoliticaTratamientoDatosPersonales:
        proveedor.prvPoliticaTratamientoDatosPersonales,
      PrvProveeedor: proveedor.prvProveeedor.toString(),
      PrvRteLegalApellido: proveedor.prvRteLegalApellido,
      PrvRteLegalCodCiudad: proveedor.prvRteLegalCodCiudad.toString(),
      PrvRteLegalEmail: proveedor.prvRteLegalEmail,
      PrvRteLegalIdentificacion: proveedor.prvRteLegalIdentificacion,
      PrvRteLegalNombre: proveedor.prvRteLegalNombre,
      PrvRteLegalTelefonoMovil: proveedor.prvRteLegalTelefonoMovil,
      PrvTelefono: proveedor.prvTelefono,
      PrvTipoProveedorCual: proveedor.prvTipoProveedorCual,
    });
    this.changeDepartamento();

    this.removeSocio(0);

    Promise.all(
      data.socios.map((socio: any) => {
        this.addSocioIni(socio);
      })
    );

    this.removeReferencia(0);
    Promise.all(
      data.referencias.map((ref: any) => {
        this.addReferenciaIni(ref);
      })
    );

    let empresas: any = [];

    Promise.all(
      data.prvEmpresasSelecteds.map((item: any) => {
        empresas.push(item.codEmpresas);
      })
    );

    let productos: any = [];
    Promise.all(
      data.prvProdServSelecteds.map((item: any) => {
        productos.push(item.codPrvProdServ);
      })
    );

    this.form.controls.ListEmpresas.setValue(empresas);
    this.form.controls.ListProdServicios.setValue(productos);
  }

  /**
   * Agregamos lista de Documentos pdf al array de documentos
   */
  setListDocument() {
    //console.log(this.prvDocumentos);
    //console.log(this.listDocumentos);
    Promise.all(
      this.prvDocumentos.map((doc: IDocumentos) => {
        this.listDocumentos.map((docLoad) => {
          if (docLoad.id === doc.prvdCodDocumento) {
            docLoad.urlDoc = doc.prvdUrlDocument;
          }
        });
      })
    );
  }

  showFormData(formData: any) {
    // Display the key/value pairs
    for (let pair of formData.entries()) console.log(pair[0] + ', ' + pair[1]);
  }
  //#endregion

  //#region ALERT
  onClosed(alert: any) {
    this.alert = false;
  }
  //#endregion

  //#region Captcha
  showResponse(captcha: any) {
    console.log(captcha);
    if (captcha.response) {
      this.form.patchValue({
        captcha: true,
      });
    }
  }

  validDocument(validoGestor: number) {
    let icon = faWindowClose;
    switch (validoGestor) {
      case 0:
        icon = faWindowClose;
        break;
      case 1:
        icon = faCheck;
        break;
      default:
        icon = faWindowClose;
        break;
    }

    return icon;
  }

  //#endregion

  //#region MODAL
  closeModal() {
    this.btnCloseModalPress = true;

    const resp = this.closeModalReturn();

    this.onClose.next(resp);
    //this.onClose.next(false);
    this.modalService.hide();
  }
  //#endregion

  //#region VALIDATE GESTOR PROVEEDOR FILE
  /**
   * Validamos si el Gestor de Documentos abrio todos los documentos
   * @param documento
   */
  openPdf(documento: IDocumentosRegistrados) {
    Promise.all(
      this.prvDocumentos.map((item: any) => {
        if (parseInt(item.id) === documento.id) {
          item.prvdValidationDocument = true;
          return;
        }
      })
    );

    window.open(documento.prvdUrlDocument);
    this.readAllDocuments = this.validaDocumentSelected();

    this.httpService
      .Put({ IdDocument: documento.id }, `Proveedor/UpdateEstadoDocumento`)
      .subscribe((resp) => {});
  }

  /**
   * Valida si existen algun documento q no ha sido abierto
   * @returns boolean
   */
  validaDocumentSelected() {
    let resp = true;
    Promise.all(
      this.prvDocumentos.map((item) => {
        if (item.prvdValidationDocument !== true) {
          resp = false;
        }
      })
    );
    return resp;
  }

  /**
   * Validamos si devolver true o false con relacion a la validación de los documentos
   * @returns boolean
   */
  closeModalReturn() {
    const resp =
      this.tabSelectedInspector &&
      this.readAllDocuments &&
      this.readFormaulario;
    return resp;
  }
  //#endregion

  //#region TAB
  onSelect(e: any) {
    this.tabSelectedInspector = true;

    const prvPlrCodTraza = this.data.prvCodTraza;

    if (this.data.codEstadoInspector != 2) {
      this.data.codEstadoDocumentos = true;
      this.data.codEstadoInspector = 2;
      const obj = {
        IdTrazaGestionProveedores: prvPlrCodTraza,
      };
      this.httpService
        .Put(obj, 'Proveedor/UpdateTrazaInspect')
        .subscribe((_) => {});
    } else {
      this.data.codEstadoDocumentos = true;
      this.data.codEstadoInspector = 2;
    }
  }

  listasRestrictivas() {}
  //#endregion

  showDialog() {
    this.display = true;
  }

  //#region Edit Proveedor
  validEditProveedor(form02: FormGroup) {
    if (!form02.valid) {
      this.form02.markAllAsTouched();
      return;
    }

    const PrvCodValidation = form02.get('PrvCodValidation')?.value;
    const PrvNit = form02.get('PrvNit')?.value;
    const params = new HttpParams()
      .set('CodValidation', PrvCodValidation)
      .set('Nit', PrvNit)
      .set('CodUserUpdate', 0);

    this.httpService
      .GetParams(`Proveedor/SearchByCodValidation`, params)
      .subscribe((resp) => {
        const { status } = resp;
        if (status === 400) {
          Swal.fire({
            title: 'EDITAR PROVEEDOR',
            text: resp.data[0].mensaje,
            icon: 'error',
            confirmButtonText: 'Ok',
          });

          return;
        } else {
          // idPrv
          this.getProveedor(resp.data.id, true);
        }
      });
  }
  //#endregion
}
/**
 * Comentario
 */
