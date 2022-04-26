import { Component } from '@angular/core';

//FontAwesome
import {
  faPlus,
  faEdit,
  faTimes,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
//Boostrap
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
//Service
import { HttpService } from 'src/app/service/http.service';
import { StorageService } from 'src/app/service/storage.service';
//Sweet Alert
import Swal from 'sweetalert2';

//Component para modals
import { PerfilformComponent } from './perfilform/perfilform.component';

@Component({
  selector: 'app-perfil-component',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {
  //#region VARIABLES
  public datos: any = [];
  faPlus = faPlus;
  faEdit = faEdit;
  faTimes = faTimes;
  faEye = faEye;
  bsModalRef?: BsModalRef;
  userLoginPortal: any;

  dismissible = true;
  isVisibleAlert = false;
  msg = '';

  //#endregion VARIABLES

  //#region CONSTRUCTOR
  constructor(
    private modalService: BsModalService,
    private httpService: HttpService,
    private storageService: StorageService
  ) {
    this.storageService.save('view', 'perfil');
  }
  //#endregion

  //#region CYCLE LIFE
  async ngOnInit() {
    this.searchAll();
    this.userLoginPortal = await this.storageService.read('userLoginPortal');
  }
  //#endregion

  private searchAll() {
    this.httpService.Get('Perfil/SearchAll').subscribe((resp) => {
      const { data } = resp;
      this.datos = data;
    });
  }

  //#region MODAL
  openModalWithComponent(id: number, data: any, title: string, action: string) {
    const initialState: ModalOptions = {
      initialState: {
        list: ['Ejemplo', 1, 9],
        title,
        action,
        id,
        data,
      },
    };
    this.bsModalRef = this.modalService.show(PerfilformComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose.subscribe((resp: any) => {
      if (resp) {
        this.searchAll();
      }
    });
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
}
