import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

//FontAwesome
import {
  faEye,
  faWindowClose,
  faSearch,
  faCheck,
  faThumbsUp,
  faThumbsDown,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

//Boostrap
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

//Service
import { HttpService } from './../../../../service/http.service';
import { StorageService } from './../../../../service/storage.service';

//Sweet Alert
import Swal from 'sweetalert2';

// WYSYING
import { AngularEditorConfig } from '@kolkov/angular-editor';

//Component para modals
import { RegistrarmeProveedorComponent } from './../../../registrarme-proveedor/registrarme-proveedor.component';
import { ShowRequerimientoComponent } from './show-requerimiento/show-requerimiento.component';

// Interface
import { IEstados } from 'src/app/models/estados.mode';
import { IProveedor } from 'src/app/models/proveedor.model';

// PrimeNg
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-list-proveedores',
  templateUrl: './list-proveedores.component.html',
  styleUrls: ['./list-proveedores.component.scss'],
})
export class ListProveedoresComponent implements OnInit {
  //#region VARIABLES

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
    placeholder: 'Enter text here...',
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

  //TABLE
  prvActivos: Array<IProveedor> = [];
  prvInactivos: Array<IProveedor> = [];
  prvEnCoreccion: Array<IProveedor> = [];
  prvPendientesXAprobar: Array<IProveedor> = [];
  prvNoAprobados: Array<IProveedor> = [];
  prvEstados: Array<IEstados>;
  prvPendientesXAprobarCont: string;
  prvActivosCont: string;
  prvInactivosCont: string;
  prvEnCoreccionCont: string;
  prvNoAprobadosCont: string;

  // FontAwesome
  faEye = faEye;
  faWindowClose = faWindowClose;
  faSearch = faSearch;
  faCheck = faCheck;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faCog = faCog;

  bsModalRef?: BsModalRef;
  userLoginPortal: any;

  //Estados
  categoriasServicio: string[] = [];

  dismissible = true;
  isVisibleAlert = false;
  msg = '';

  selectedProveedores: string[];
  loading = false;
  revisadoProveedor = false;

  form: FormGroup;
  formNM: FormGroup;
  position: string;
  displayMaximizable = false;

  cco: string[] = [];
  to: string[] = [];
  proveedoresAll: string[];

  //#endregion

  //#region CONSTRUCTOR
  constructor(
    private modalService: BsModalService,
    private httpService: HttpService,
    private storageService: StorageService,
    private messageService: MessageService
  ) {
    this.form = new FormGroup({
      idLocalidad: new FormControl(''),
      idCategoriaServicio: new FormControl(null),
      idEstado: new FormControl(null),
      razonSocial: new FormControl(''),
      nit: new FormControl(''),
    });

    this.formNM = new FormGroup({
      To: new FormControl({ value: null, disabled: true }),
      CCO: new FormControl(null, Validators.required),
      asunto: new FormControl(null, Validators.required),
      Body: new FormControl(null, Validators.required),
    });
  }
  //#endregion

  //#region CYCLE LIFE
  async ngOnInit() {
    this.searchAll();
    this.userLoginPortal = await this.storageService.read('userLoginPortal');
    this.to.push(this.userLoginPortal.usrEmail);
  }

  public onReady(editor: any) {
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
  }
  //#endregion

  //#region SEARCH ALL
  private searchAll() {
    this.loading = true;
    this.httpService.Get('Proveedor/ParametrosGestionProveedor').subscribe(
      (resp) => {
        const { data } = resp;
        //this.prvActivos = data.proveedores;
        this.proveedoresAll = data.proveedores;

        this.prvPendientesXAprobar = data.proveedores.filter(
          (prv: any) => prv.usrEstado === 1
        );

        this.prvActivos = data.proveedores.filter(
          (prv: any) => prv.usrEstado === 2
        );

        this.prvInactivos = data.proveedores.filter(
          (prv: any) => prv.usrEstado === 3
        );

        this.prvNoAprobados = data.proveedores.filter(
          (prv: any) => prv.usrEstado === 4
        );

        this.prvEnCoreccion = data.proveedores.filter(
          (prv: any) => prv.usrEstado === 5
        );

        this.prvPendientesXAprobarCont =
          this.prvPendientesXAprobar.length.toString();
        this.prvActivosCont = this.prvActivos.length.toString();
        this.prvInactivosCont = this.prvInactivos.length.toString();
        this.prvEnCoreccionCont = this.prvEnCoreccion.length.toString();
        this.prvNoAprobadosCont = this.prvNoAprobados.length.toString();
        this.categoriasServicio = data.prvProdServ;
        this.prvEstados = data.estadosProveedor;
        this.loading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //#endregion

  //#region MODAL
  openModalWithComponent(
    id: number,
    data: IProveedor,
    title: string,
    action: string
  ) {
    const initialState: ModalOptions = {
      initialState: {
        list: ['Ejemplo', 1, 9],
        title,
        action,
        id,
        data,
      },
      keyboard: true,
      class: 'modal-xl',
      backdrop: 'static',
    };

    this.bsModalRef = this.modalService.show(
      RegistrarmeProveedorComponent,
      initialState
    );

    this.bsModalRef.content.closeBtnName = 'Close';

    this.bsModalRef.content.onClose?.subscribe((resp: any) => {
      console.log(resp);
      if (resp) {
        //this.searchAll();
        this.actualizaParametrosInspectorDocuments(data);
        this.revisadoProveedor = true;
      }
    });
  }

  actualizaParametrosInspectorDocuments(data: any) {
    data.codEstadoDocumentos = true;
    data.codEstadoInspector = 2;
  }

  //#endregion

  //#region FORM
  deletePerfil(id: number, action: string) {
    Swal.fire({
      title: '¿Estas seguro?',
      html: `¡Realmente desea eliminar el registro con id: <strong>${id}</strong>!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      // inputValidator: (value) => {
      //   console.log(value.trim().length);
      //   return new Promise((resolve) => {
      //     if (value.trim().length !== 0 && !(value.trim().length < 10)) {
      //       resolve(null);
      //     } else {
      //       if (value.trim().length === 0) {
      //         resolve('La observación es obligatoria :)');
      //       } else if (value.trim().length < 10) {
      //         resolve('La observación debe contener al menos 10 caractares :)');
      //       }
      //     }
      //   });
      // },
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteForm(id);
      } else if (result.isDismissed) {
      }
    });
  }

  deleteForm(id: number) {
    const data = {
      id,
      CodUser: this.userLoginPortal.id,
      CodUserUpdate: this.userLoginPortal.id,
    };
    this.httpService.Delete(`Perfil/Delete`, data).subscribe((resp) => {
      const { data } = resp;
      Swal.fire({
        title: 'CONFIRMAR REGISTRO',
        text: data[0].mensaje,
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then((_) => {
        this.modalService.hide();
        this.searchAll();
      });
    });
  }

  /**
   *
   * @param e evento
   * @param dataForm objeto
   */
  changeStateEstado(e: any, dataForm: any) {
    dataForm.prfEstado = e;

    this.httpService.Put(dataForm, `Perfil/Update`).subscribe((resp) => {
      this.msg = resp.data[0].mensaje;
      this.isVisibleAlert = true;
    });
  }

  onClosedAlert(e: any) {
    this.isVisibleAlert = false;
  }
  //#endregion

  //#region FormFiltro
  validateForm() {
    this.loading = true;
    const data = this.form.value;

    const params = new HttpParams()
      .set('idLocalidad', data.idLocalidad)
      .set('idCategoriaServicio', data.idCategoriaServicio | 0)
      .set('idEstado', data.idEstado | 0)
      .set('razonSocial', data.razonSocial)
      .set('nit', data.nit);

    this.httpService
      .GetParams('Proveedor/FiltroProveedor', params)
      .subscribe((resp) => {
        if (resp.status == 200) {
          this.prvPendientesXAprobar = resp.data.filter(
            (prv: any) => prv.usrEstado === 1
          );
          this.prvActivos = resp.data.filter((prv: any) => prv.usrEstado === 2);
          this.prvInactivos = resp.data.filter(
            (prv: any) => prv.usrEstado === 3
          );
          this.prvNoAprobados = resp.data.filter(
            (prv: any) => prv.usrEstado === 4
          );

          this.loading = false;
        }
      });
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
  //#endregion

  //#region TABLE
  clear(table: Table) {
    table.clear();
  }

  //#endregion

  //#region DIALOG
  confirm1(proveedor: any, estado: number) {
    switch (estado) {
      case 5:
        Swal.fire({
          title: 'Actualizar estado del Proveedor',
          text: '¿Seguro que desea proceder?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, Actualizar!',
          cancelButtonText: 'Cancelar!',
          input: 'textarea',
        }).then((result) => {
          if (result.isConfirmed) {
            this.updateEstadoProveedor(proveedor, estado, result.value);
          }
        });
        break;
      default:
        Swal.fire({
          title: 'Actualizar estado del Proveedor',
          text: '¿Seguro que desea proceder?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, Actualizar!',
          cancelButtonText: 'Cancelar!',
        }).then((result) => {
          if (result.isConfirmed) {
            this.updateEstadoProveedor(proveedor, estado);
          }
        });
        break;
    }
  }

  /**
   * Actualizamos el estado del proveedor
   * @param proveedor
   * @param estado
   */
  updateEstadoProveedor(proveedor: any, estado: number, observaciones = null) {
    const data = {
      prvNit: proveedor.prvNit,
      estado,
      observaciones,
    };

    this.httpService.Put(data, 'Proveedor/UpdateEstado').subscribe((resp) => {
      let severity = 'success';
      let detail = 'Proveedor actualizado exitosamente!!!';

      // switch (key) {
      //   case 200:
      //     severity = 'success';
      //     detail = 'Proveedor actualizado exitosamente!!!';
      //     break;
      //   case 400:
      //     severity = 'err';
      //     detail = 'Error al actualizar!!!';
      //     break;
      // }
      this.messageService.add({
        severity,
        summary: 'Confirmado',
        detail,
      });
      this.searchAll();
    });
  }

  //#endregion

  //#region NOTIFICACION MASIVA
  notificacionMasiva(table: Table) {
    this.cco = [];

    if (table._selection === undefined) {
      this.messageService.add({
        severity: 'info',
        summary: 'VALIDACIONES',
        detail: 'Debe seleccionar por lo menos un proveedor!!!!!!',
      });
      return;
    }

    Promise.all(
      this.proveedoresAll.map((prv: any) => {
        table._selection.map((item: any) => {
          if (prv.id == item.id) {
            this.cco.push(item.prvMail);
          }
        });
      })
    );
    this.to = [];
    this.to.push(this.userLoginPortal.usrEmail);
    this.formNM.patchValue({
      To: this.to,
      CCO: this.cco,
    });

    this.displayMaximizable = true;
  }

  validarFormNotMas(): boolean {
    console.log(this.formNM.value);

    if (!this.formNM.valid) {
      this.messageService.add({
        severity: 'info',
        summary: 'VALIDACIONES',
        detail: 'Faltan campos obligatorios!!!',
      });
      return false;
    }

    this.sendMail();

    return true;
  }

  sendMail() {
    const formData = new FormData();
    const file = '';
    const { CCO, asunto, Body } = this.formNM.value;
    const cco2 = this.splitCCO(CCO);
    formData.append('To', this.userLoginPortal.usrEmail);
    formData.append('CCO', cco2);
    formData.append('Asunto', asunto);
    formData.append('Body', Body);
    formData.append('Attachments', file);

    this.httpService
      .PostFormData(formData, 'Proveedor/SendMasive')
      .subscribe((resp) => {
        console.log(resp);
        this.displayMaximizable = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmación',
          detail: 'Notificación enviada exitosamente!!!',
        });
      });
  }

  splitCCO(CCO: any) {
    let ccoConvertido: any = '';
    let cont = 0;
    CCO.map((cco: any) => {
      ccoConvertido += cco;

      if (CCO.length >= cont) {
        ccoConvertido += ';';
      }

      cont++;
    });

    return ccoConvertido;
  }
  //#endregion

  //#region showRequerimientos(proveedor)
  showRequerimientos(proveedor: any) {
    const initialState: ModalOptions = {
      initialState: {
        list: ['Ejemplo', 1, 9],
        // title,
        // action,
        // id,
        // data,
      },
      class: 'modal-xl',
    };
    this.bsModalRef = this.modalService.show(
      ShowRequerimientoComponent,
      initialState
    );
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose?.subscribe((resp: any) => {
      if (resp) {
        this.searchAll();
      }
    });
  }
  //#endregion
}
