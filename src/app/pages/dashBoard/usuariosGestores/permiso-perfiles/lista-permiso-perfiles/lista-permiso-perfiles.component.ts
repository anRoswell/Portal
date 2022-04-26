import { UserLogin } from 'src/app/models/userLogin.model';
import { StorageService } from 'src/app/service/storage.service';
import { HttpService } from 'src/app/service/http.service';
import { FormPermisoPerfilesComponent } from '../form-permiso-perfiles/form-permiso-perfiles.component';
import { Component, OnInit } from '@angular/core';
import {
  faPlus,
  faPencilAlt,
  faTimes,
  faTimesCircle,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-permiso-perfiles',
  templateUrl: './lista-permiso-perfiles.component.html',
  styleUrls: ['./lista-permiso-perfiles.component.scss'],
})
export class ListaPermisoPerfilesComponent implements OnInit {
  public datos: any = [];
  faPlus = faPlus;
  faEdit = faPencilAlt;
  faTimes = faTimes;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  bsModalRef?: BsModalRef;
  userLogin: UserLogin;

  constructor(
    private modalService: BsModalService,
    private httpService: HttpService,
    private storageService: StorageService
  ) {
    this.storageService.save('view', 'permisosPerfiles');
  }

  ngOnInit(): void {
    this.userLogin = this.storageService.read('userLoginPortal');
    this.consultar();
  }

  consultar() {
    this.httpService.Get('MenuXPerfil/SearchAll').subscribe((resp) => {
      console.log(resp.data);
      this.datos = resp.data;
    });
  }

  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(FormPermisoPerfilesComponent);
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
      FormPermisoPerfilesComponent,
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
    this.httpService.Delete(`MenuXPerfil/Delete`, data).subscribe((resp) => {
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
