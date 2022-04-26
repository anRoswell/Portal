import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Sweet Alter
import Swal from 'sweetalert2';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'src/app/service/http.service';
import { IPerfil } from 'src/app/models/perfil.model';
import { StorageService } from 'src/app/service/storage.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-perfilform',
  templateUrl: './perfilform.component.html',
  styleUrls: ['./perfilform.component.scss'],
})
export class PerfilformComponent implements OnInit {
  //#region Variables
  title?: string;
  id: number = 0;
  closeBtnName?: string;
  list: any[] = [];
  action: string;
  data: IPerfil;

  public onClose: Subject<boolean>;

  //Font Awesome
  faSave = faSave;
  faWindowClose = faWindowClose;

  form: FormGroup;
  textBtn = 'Guardar';
  userLoginPortal: any;
  //#region VALIDATIONS
  public validationsMessage = {
    prfNombrePerfil: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
    ],
  };
  //#endregion

  //bn-boostrap Alert
  msgError = 'Todos los campos son obligatorios!!!';
  validationMsg = false;

  //#endregion

  //#region CONSTRUCTOR
  constructor(
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private httpService: HttpService,
    private fb: FormBuilder,
    private storageService: StorageService
  ) {
    this.form = this.fb.group({
      id: [null],
      prfNombrePerfil: [null, Validators.required],
      prfEstado: [false],
      prfAdministrador: false,
      codUser: '0',
      codUserUpdate: '0',
    });
  }
  //#endregion

  //#region CYCLE LIFE
  async ngOnInit() {
    this.onClose = new Subject();
    const userData = await this.storageService.read('userLoginPortal');
    this.userLoginPortal = userData;

    this.form.patchValue({
      id: this.id,
      codUser: this.userLoginPortal.id.toString(),
      codUserUpdate: this.userLoginPortal.id.toString(),
    });

    switch (this.action) {
      case 'create':
        this.textBtn = 'Guardar';
        break;
      case 'update':
        this.editRegistro();
        this.textBtn = 'Actualizar';
        break;
      default:
        break;
    }
  }
  //#endregion

  editRegistro() {
    this.form.patchValue({
      prfNombrePerfil: this.data.prfNombrePerfil,
      prfEstado: this.data.prfEstado,
    });
  }

  closeModal() {
    this.onClose.next(false);
    this.modalService.hide();
  }

  //#region FORM
  async validateForm() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      // Swal.fire({
      //   title: 'VALIDAR FORMULARIO',
      //   text: 'Los campos del formulario son obligatorios!!!',
      //   icon: 'warning',
      //   confirmButtonText: 'Ok',
      // });
      this.validationMsg = true;
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

    this.httpService.Post(data, 'Perfil/Create').subscribe((resp) => {
      const { data } = resp;
      Swal.fire({
        title: 'CONFRMAR REGISTRO',
        text: data[0].mensaje,
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then((_) => {
        this.onClose.next(true);
        this.modalService.hide();
      });
    });
  }

  /**
   * Actualizamos el perfil en la base de datos
   */
  updateForm() {
    const dataForm = this.form.value;
    this.httpService.Put(dataForm, `Perfil/Update`).subscribe((resp: any) => {
      const { data } = resp;
      Swal.fire({
        title: 'CONFIRMAR REGISTRO',
        text: data[0].mensaje,
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then((_) => {
        this.onClose.next(true);
        this.closeModal();
      });
    });
  }

  deleteForm() {
    const dataForm = this.form.value;
    const id = this.id;
    this.httpService
      .Delete(dataForm, `Perfil/Delete/${id}`)
      .subscribe((resp) => {
        const { data } = resp;
        Swal.fire({
          title: 'CONFIRMAR REGISTRO',
          text: data[0].mensaje,
          icon: 'success',
          confirmButtonText: 'Ok',
        });
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

  //#endregion FORM
}
