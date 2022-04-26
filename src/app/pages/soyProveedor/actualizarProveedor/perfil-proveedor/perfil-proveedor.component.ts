import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { RegistrarmeProveedorComponent } from './../../../registrarme-proveedor/registrarme-proveedor.component';

//Servicios
import { StorageService } from 'src/app/service/storage.service';
import { HttpService } from 'src/app/service/http.service';

// Font Awesome
import {
  faSave,
  faWindowClose,
  faPencilAlt,
  faList,
} from '@fortawesome/free-solid-svg-icons';

// Ng Boostrap
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-perfil-proveedor',
  templateUrl: './perfil-proveedor.component.html',
  styleUrls: ['./perfil-proveedor.component.scss'],
})
export class PerfilProveedorComponent implements OnInit {
  //#region VARIABLES

  //Otros
  user: any;
  proveedor: any;

  //Icon
  faSave = faSave;
  faWindowClose = faWindowClose;
  faEdit = faPencilAlt;
  faList = faList;
  iconUser: string = 'assets/img/proveedor.png';

  //Modal
  bsModalRef?: BsModalRef;
  //#endregion

  //#region CONSTRUCTOR WITH CICLY LIFE
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private modalService: BsModalService
  ) {}

  async ngOnInit() {
    this.user = await this.storageService.read('userLoginPortal');
    this.getProveedor();
  }
  //#endregion

  //#region CONSULTAS INICIALES
  getProveedor() {
    const params = new HttpParams().set('nit', this.user.usrCedula);

    this.httpService.GetParams('Proveedor/Search', params).subscribe((resp) => {
      if (resp.status == 200) {
        this.proveedor = resp.data;
      }
    });
  }
  //#endregion

  //#region MODAL
  /**
   * Abre modal con la vista a mostrar
   * @param id = id a editar
   * @param data = objeto con la información
   * @param title = titutlo a mostrar
   * @param action = bandera q indica accion a ejecutar
   */
  openModalWithComponent(id: number, data: any, title: string, action: string) {
    const initialState: ModalOptions = {
      initialState: {
        list: ['Ejemplo', 1, 9],
        title,
        action,
        id,
        data,
      },
      class: 'modal-xl',
    };
    this.bsModalRef = this.modalService.show(
      RegistrarmeProveedorComponent,
      initialState
    );
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose?.subscribe((resp: any) => {});
  }
  //#endregion
}
