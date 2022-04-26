import { Component, OnInit } from '@angular/core';

//Font awesome
import {
  faPlus,
  faEdit,
  faTimes,
  faKey,
} from '@fortawesome/free-solid-svg-icons';

//Modal
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';

//
import { HttpService } from 'src/app/service/http.service';
import { StorageService } from 'src/app/service/storage.service';

//Sweet Alert
import Swal from 'sweetalert2';

//
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import { IUsuarios } from 'src/app/models/usuarios.model';
import { Subscription } from 'rxjs';

//PrimeNg
import { Table } from 'primeng/table';

//Component para modals

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  public datos: any;
  faPlus = faPlus;
  faEdit = faEdit;
  faTimes = faTimes;
  faKey = faKey;
  bsModalRef?: BsModalRef;

  loading = false;

  dismissible = true;
  isVisibleAlert = false;
  msg = '';

  cedula = '';
  srcReporteador: SafeResourceUrl;
  result: any;

  timerSubscription: Subscription;
  typeAlert: string;

  constructor(
    private modalService: BsModalService,
    private httpService: HttpService,
    private storageService: StorageService,
    private sanitizer: DomSanitizer
  ) {
    this.storageService.save('view', 'usuarios');
  }

  ngOnInit() {
    this.searchAll();
  }

  ngAfterViewInit(): void {}

  cleanURL(oldURL: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
  }

  private searchAll() {
    this.loading = true;
    this.httpService.Get('Usuario/SearchAll').subscribe((resp) => {
      const { data } = resp;
      this.datos = data;
      this.loading = false;
    });
  }

  /**
   *
   * Metodo para abrir modal con vista incrustada
   * @param id => Id del registro
   * @param data => data del registro
   * @param title => Titulo de la acción
   * @param action => crear, editar o eliminar
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
      backdrop: 'static',
    };
    // modal-(sm, md, lg, xl)
    this.bsModalRef = this.modalService.show(
      UsuariosFormComponent,
      initialState
    );
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose.subscribe((resp: any) => {
      console.log(resp);

      if (resp) {
        this.searchAll();
      }
    });
  }

  //#region
  updateRegistro(id: number, action: string) {}

  /**
   *
   * @param e evento
   * @param dataForm objeto
   */
  changeStateEstado(e: any, dataForm: any) {
    console.log(e);

    dataForm.usrEstado = e;

    this.httpService.Put(dataForm, `Usuario/Update`).subscribe((resp) => {
      this.msg = resp.data[0].mensaje;
      this.isVisibleAlert = true;
    });
  }

  onClosedAlert(e: any) {
    this.isVisibleAlert = false;
  }

  resetPassword(item: IUsuarios) {
    Swal.fire({
      title: 'RESETEAR PASSWORD',
      text: 'Realmente desea resetear el password del usuario!!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
    }).then((resp) => {
      if (resp.isConfirmed) {
        this.httpService
          .Post(item, `Usuario/ForgottenPassword`)
          .subscribe((resp) => {
            this.msg = resp.data[0].mensaje;
            this.isVisibleAlert = true;

            const { status } = resp;
            switch (status) {
              case 200:
                this.typeAlert = 'success';
                this.searchAll();
                break;
              case 400:
                this.typeAlert = 'warning';
                this.msg = resp.data[0].error;
                break;
              default:
                this.typeAlert = 'success';
                break;
            }
          });
      }
    });
  }
  //#endregion

  //#region Prime Ng Table
  clear(table: Table) {
    table.clear();
  }

  //#endregion

  prueba() {
    console.log(`Hola`);
  }
}
