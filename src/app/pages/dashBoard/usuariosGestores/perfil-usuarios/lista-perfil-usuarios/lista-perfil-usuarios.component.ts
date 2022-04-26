import { UserLogin } from 'src/app/models/userLogin.model';
import { HttpService } from 'src/app/service/http.service';
import { FormPerfilUsuariosComponent } from './../form-perfil-usuarios/form-perfil-usuarios.component';
import { Component, OnInit } from '@angular/core';
import {
  faPlus,
  faPencilAlt,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/service/storage.service';
@Component({
  selector: 'perfil-usuarios',
  templateUrl: './lista-perfil-usuarios.component.html',
  styleUrls: ['./lista-perfil-usuarios.component.scss'],
})
export class PerfilUsuariosComponent implements OnInit {
  public datos: any = [];
  faPlus = faPlus;
  faEdit = faPencilAlt;
  faTimes = faTimes;
  bsModalRef?: BsModalRef;
  userLogin: UserLogin;

  constructor(
    private modalService: BsModalService,
    private httpService: HttpService,
    private storageService: StorageService
  ) {
    this.storageService.save('view', 'perfilusuarios');
  }

  ngOnInit(): void {
    this.userLogin = this.storageService.read('userLoginPortal');
    this.consultar();
  }

  consultar() {
    this.httpService.Get('PerfilesXusuario/SearchAll').subscribe((resp) => {
      console.log(resp.data);
      this.datos = resp.data;
    });
  }

  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(FormPerfilUsuariosComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose.subscribe((resp: any) => {
      console.log('results', resp);
      if (resp) {
        this.consultar();
      }
    });
  }

  editar(data: any) {
    const initialState: ModalOptions = {
      initialState: {
        data: data,
      },
    };
    this.bsModalRef = this.modalService.show(
      FormPerfilUsuariosComponent,
      initialState
    );
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose.subscribe((resp: any) => {
      console.log('results', resp);
      if (resp) {
        this.consultar();
      }
    });
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Estas seguro?',
      html: `¿Realmente desea eliminar el registro con id: <strong>${id}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
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
      CodUser: this.userLogin.id,
      CodUserUpdate: this.userLogin.id,
    };

    this.httpService
      .Delete(`PerfilesXusuario/Delete`, data)
      .subscribe((resp) => {
        if (resp.status == 200) {
          const { data } = resp;
          Swal.fire({
            title: 'CONFIRMAR REGISTRO',
            text: data[0].mensaje,
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then((_) => {
            this.consultar();
          });
        }
      });
  }
}
