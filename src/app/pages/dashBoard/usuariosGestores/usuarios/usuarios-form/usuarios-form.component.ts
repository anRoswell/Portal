import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

// Boostrap Angular
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

//Font Awesome
import {
  faSave,
  faWindowClose,
  faUser,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';

import { HttpService } from 'src/app/service/http.service';
import { IUsuarios } from 'src/app/models/usuarios.model';

//Sweet Alert
import Swal, { SweetAlertIcon } from 'sweetalert2';

//Servicios
import { StorageService } from 'src/app/service/storage.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss'],
})
export class UsuariosFormComponent implements OnInit {
  //#region Variables

  //Selector ng-select
  selectedCar: number;
  peopleLoading = true;
  empresas = [{ id: 2, name: 'Opel 3' }];

  //Modal
  title?: string;
  id: number;
  closeBtnName?: string;
  list: any[] = [];
  action: string;
  data: IUsuarios;
  public onClose: Subject<boolean>;

  // FontAwesome
  faSave = faSave;
  faWindowClose = faWindowClose;
  faUser = faUser;
  faSyncAlt = faSyncAlt;

  //Formulario
  form: FormGroup;
  form2: FormGroup;
  textBtn = 'Guardar';

  //Tab
  isEdit = false;
  //#endregion

  //#region VALIDATIONS
  public validationsMessage = {
    usrCedula: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
      {
        type: 'pattern',
        message: 'ojo! este no es un email valido',
      },
    ],
    usrNombres: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
      {
        type: 'pattern',
        message: 'ojo! este no es un email valido',
      },
    ],
    usrApellidos: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
      {
        type: 'pattern',
        message: 'ojo! este no es un email valido',
      },
    ],
    usrEmail: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
      {
        type: 'pattern',
        message: 'ojo! este no es un email valido',
      },
    ],
    usrEmpresaProceso: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
  };

  public validationsMessage2 = {
    oldPassword: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
      {
        type: 'minlength',
        message: 'Minimo 8 letras para el password',
      },
    ],
    usrPasswordSetter: [
      {
        type: 'required',
        message: 'Confirmación password es requerida',
      },
      {
        type: 'minlength',
        message: 'Minimo 8 letras para el password',
      },
    ],
    usrPassword: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
      {
        type: 'minlength',
        message: 'Minimo 8 letras para el password',
      },
    ],
  };
  selectedEmpresa: number;
  userData: any;
  userLogin: any;
  //#endregion

  //#region CONSTRUCTOR
  constructor(
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private httpService: HttpService,
    private storageService: StorageService
  ) {
    this.form = new FormGroup({
      id: new FormControl(null),
      usrCedula: new FormControl(null, [Validators.required]),
      usrTusrCodTipoUsuario: new FormControl(1, [Validators.required]),
      usrNombres: new FormControl(null, [Validators.required]),
      usrNombreCompleto: new FormControl(null),
      usrApellidos: new FormControl(null, [Validators.required]),
      usrEmail: new FormControl(null, [Validators.required, Validators.email]),
      usrEmpresaProceso: new FormControl(null, [Validators.required]),
      usrTmpSuspendido: new FormControl(0, [Validators.required]),
      usrEstado: new FormControl(2, [Validators.required]),
      codArchivo: new FormControl(null),
      codUser: new FormControl(null, [Validators.required]),
      fechaRegistro: new FormControl(null),
      codUserUpdate: new FormControl(null),
      fechaRegistroUpdate: new FormControl(null),
      info: new FormControl(null),
      infoUpdate: new FormControl(null),
      inputKey: new FormControl(1),
      usrForcePasswordChange: new FormControl(null),
      usrLoginPrimeraVez: new FormControl(true, [Validators.required]),
    });

    this.form2 = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      usrCedula: new FormControl(null, [Validators.required]),
      usrTusrCodTipoUsuario: new FormControl(1, [Validators.required]),
      usrNombres: new FormControl(null, [Validators.required]),
      usrNombreCompleto: new FormControl(null),
      usrApellidos: new FormControl(null, [Validators.required]),
      usrEmail: new FormControl(null, [Validators.required, Validators.email]),
      usrPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      oldPassword: new FormControl(null, [Validators.required]),
      usrPasswordSetter: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      usrEmpresaProceso: new FormControl(null, [Validators.required]),
      usrTmpSuspendido: new FormControl(0, [Validators.required]),
      usrEstado: new FormControl(1, [Validators.required]),
      codArchivo: new FormControl(null),
      codUser: new FormControl(null, [Validators.required]),
      fechaRegistro: new FormControl(null),
      codUserUpdate: new FormControl(null),
      fechaRegistroUpdate: new FormControl(null),
      info: new FormControl(null),
      infoUpdate: new FormControl(null),
      inputKey: new FormControl(1),
      usrForcePasswordChange: new FormControl(null, [Validators.required]),
      usrLoginPrimeraVez: new FormControl(false, [Validators.required]),
    });
  }
  //#endregion

  //#region CYCLE LIFE
  async ngOnInit() {
    console.log('aqui estoy');
    this.userLogin = this.storageService.read('userLoginPortal');

    this.form.controls.codUser.setValue(this.userLogin.id);
    this.onClose = new Subject();
    const parametros = await this.storageService.read('parametros');
    this.empresas = parametros.empresas;

    switch (this.action) {
      case 'create':
        this.textBtn = 'Guardar';
        break;
      case 'update':
        this.isEdit = false;
        this.editRegistro();
        this.textBtn = 'Actualizar';
        break;
      case 'editPerfil':
        this.isEdit = true;
        this.editRegistro();
        break;
      default:
        break;
    }
    this.peopleLoading = false;
  }
  //#endregion

  //#region FORM
  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  changeSelect(e: any) {
    if (![undefined].includes(e)) {
      this.form.patchValue({
        usrEmpresaProceso: e.id,
      });
    }
  }

  async editRegistro() {
    this.userData = await this.storageService.read('userLoginPortal');

    this.form.patchValue({
      id: this.data.id,
      usrCedula: this.data.usrCedula,
      usrTusrCodTipoUsuario: this.data.usrTusrCodTipoUsuario,
      usrNombres: this.data.usrNombres,
      usrApellidos: this.data.usrApellidos,
      usrEmail: this.data.usrEmail,
      usrEmpresaProceso: this.data.usrEmpresaProceso,
      usrTmpSuspendido: this.data.usrTmpSuspendido,
      usrEstado: this.data.usrEstado,
      codUser: this.data.codUser,
      codUserUpdate: this.userData.id,
      codArchivo: this.data.codArchivo,
      fechaRegistro: this.data.fechaRegistro,
      fechaRegistroUpdate: this.data.fechaRegistroUpdate,
      info: this.data.info,
      infoUpdate: this.data.infoUpdate,
      usrForcePasswordChange: this.data.usrForcePasswordChange,
      usrLoginPrimeraVez: false,
    });

    this.form2.patchValue({
      id: this.data.id,
      usrCedula: this.data.usrCedula,
      usrTusrCodTipoUsuario: this.data.usrTusrCodTipoUsuario,
      usrNombres: this.data.usrNombres,
      usrApellidos: this.data.usrApellidos,
      usrEmail: this.data.usrEmail,
      usrEmpresaProceso: this.data.usrEmpresaProceso,
      usrTmpSuspendido: this.data.usrTmpSuspendido,
      usrEstado: this.data.usrEstado,
      codUser: this.data.codUser,
      codUserUpdate: this.userData.id,
      codArchivo: this.data.codArchivo,
      fechaRegistro: this.data.fechaRegistro,
      fechaRegistroUpdate: this.data.fechaRegistroUpdate,
      info: this.data.info,
      infoUpdate: this.data.infoUpdate,
      usrForcePasswordChange: this.data.usrForcePasswordChange,
      usrLoginPrimeraVez: false,
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

  /**
   * Metodo q valida los campos de los formularios
   * @param field = campo a validar
   * @param validationType tipo de validacion a mostrar mensaje de error
   * @returns devuelve boolean
   */
  isValid2(field: string, validationType: string) {
    const f: any = this.form2.get(field);
    return f.hasError(validationType) && (f.dirty || f.touched);
  }

  //#region Validate FORM 1
  async validateForm() {
    console.log(this.form.value);

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      Swal.fire({
        title: 'CONFIRMAR REGISTRO',
        text: 'Los campos del formulario son obligatorios!!!',
        icon: 'warning',
        confirmButtonText: 'Ok',
      }).then((_) => {});
      return;
    }

    switch (this.action) {
      case 'create':
        this.saveForm();
        break;
      case 'update':
        this.updateForm();
        break;
      case 'delete':
        this.deleteForm();
        break;
      default:
        break;
    }
  }

  saveForm() {
    const data = this.form.value;

    this.httpService.Post(data, 'Usuario/Create').subscribe((resp) => {
      const { data, status } = resp;
      let icono: SweetAlertIcon = 'success';
      switch (status) {
        case 200:
          icono = 'success';
          break;
        case 400:
          icono = 'error';
          break;
        default:
          break;
      }

      Swal.fire({
        title: 'GUARDAR REGISTRO!',
        text: data[0].mensaje,
        icon: icono,
        confirmButtonText: 'Ok',
      }).then((_) => {
        this.onClose.next(true);
        this.modalService.hide();
      });
    });
  }

  getById() {
    this.httpService.Get(`/Usuario/Search`).subscribe((resp) => {
      const { data } = resp;
    });
  }

  updateForm() {
    const dataForm = this.form.value;
    this.httpService.Put(dataForm, `Usuario/Update`).subscribe((resp: any) => {
      const { data } = resp;

      Swal.fire({
        title: 'ACTUALIZAR REGISTRO!',
        text: data[0].mensaje,
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then((_) => {
        this.onClose.next(true);
        this.modalService.hide();
      });
    });
  }

  deleteForm() {
    const dataForm = this.form.value;
    const id = this.id;
    this.httpService
      .Delete(dataForm, `Perfiles/Delete/${id}`)
      .subscribe((resp) => {
        const { data } = resp;
        alert(data[0].mensaje);
      });
  }
  //#endregion

  //#region Validate FORM 2
  async validateForm2() {
    if (!this.form2.valid) {
      this.form2.markAllAsTouched();
      Swal.fire({
        title: 'CONFIRMAR REGISTRO',
        text: 'Los campos del formulario son obligatorios!!!',
        icon: 'warning',
        confirmButtonText: 'Ok',
      }).then((_) => {});
      return;
    }

    this.saveForm2();
  }

  saveForm2() {
    const data = this.form2.value;

    this.httpService.Post(data, 'Usuario/ChangePassword').subscribe((resp) => {
      const { data, status } = resp;
      let icono: SweetAlertIcon = 'success';
      switch (status) {
        case 200:
          icono = 'success';
          break;
        case 400:
          icono = 'error';
          break;
        default:
          break;
      }

      const optionsSweet = {
        title: 'ACTUALIZAR PASSWORD!',
        text: data[0].mensaje,
        icon: icono,
        confirmButtonText: 'Ok',
      };

      Swal.fire(optionsSweet).then((_) => {
        this.onClose.next(true);
        this.modalService.hide();
      });
    });
  }
  //#endregion
  //#endregion

  //#region MODAL
  cancelar() {
    this.onClose.next(false);
    this.modalService.hide();
  }
  //#endregion

  //#region ng-select
  customSearchFn(term: string, item: any) {
    term = term.toLowerCase();
    return item.name.toLowerCase().indexOf(term) > -1;
  }
  //#endregion
}
