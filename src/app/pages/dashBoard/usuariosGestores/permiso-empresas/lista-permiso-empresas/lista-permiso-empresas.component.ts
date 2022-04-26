import { FormPermisoEmpresasComponent } from './../form-permiso-empresas/form-permiso-empresas.component';
import { UserLogin } from 'src/app/models/userLogin.model';
import { StorageService } from 'src/app/service/storage.service';
import { HttpService } from 'src/app/service/http.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import {
  faPlus,
  faPencilAlt,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-lista-permiso-empresas',
  templateUrl: './lista-permiso-empresas.component.html',
  styleUrls: ['./lista-permiso-empresas.component.scss'],
})
export class ListaPermisoEmpresasComponent implements OnInit {
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
    this.storageService.save('view', 'permisosempresa');
  }

  ngOnInit(): void {
    this.userLogin = this.storageService.read('userLoginPortal');
    this.consultar();
  }
  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(FormPermisoEmpresasComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose.subscribe((resp: any) => {
      console.log('results', resp);
      if (resp) {
        this.consultar();
      }
    });
  }

  consultar() {
    this.httpService.Get('EmpresasxUsuario/SearchAll').subscribe((resp) => {
      console.log(resp.data);
      console.log(this.agrupar(resp.data,'peuUsrCodUsuario'));
      
      this.datos = this.agrupar(resp.data,'peuUsrCodUsuario');
    });
  }

  agrupar (miarray:any, prop:any) {
    return Object.values(miarray.reduce((groups:any, item:any) =>{
        var val = item[prop];
        groups[val] = groups[val] || {peuUsrCodUsuario: item.peuUsrCodUsuario,peuUsrNombreCompleto:item.peuUsrNombreCompleto,peuEmpNombreEmpresa:'',peuEmpCodEmpresa:[] };
        groups[val].peuEmpNombreEmpresa = groups[val].peuEmpNombreEmpresa+ '🏬'+item.peuEmpNombreEmpresa +'<br/> ' ;       
        groups[val].peuUsrNombreCompleto = item.peuUsrNombreCompleto;
        groups[val].peuEmpCodEmpresa.push(item.peuEmpCodEmpresa)
        return groups;
    }, {}));
}

  editar(data: any) {
    const initialState: ModalOptions = {
      initialState: {
        data: data,
      },
    };
    this.bsModalRef = this.modalService.show(
      FormPermisoEmpresasComponent,
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
      .Delete(`EmpresasxUsuario/Delete`, data)
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
