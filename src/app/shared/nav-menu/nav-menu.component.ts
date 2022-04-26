import { IconService } from './../../service/icon.service';
import { HttpService } from './../../service/http.service';
import { Component } from '@angular/core';

//Servicios
import { AuthenticateService } from './../../service/authenticate.service';

//Boostrap
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

//Font Awesome

//Boostrap
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { UsuariosFormComponent } from 'src/app/pages/dashBoard/usuariosGestores/usuarios/usuarios-form/usuarios-form.component';
import { StorageService } from 'src/app/service/storage.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true },
    },
  ],
})
export class NavMenuComponent {
  isExpanded = false;
  /*faUser = faUser;
  faUserCog = faUserCog;
  faBell = faBell;
  faBuilding = faBuilding;
  faUserEdit = faUserEdit;
  faUserCircle = faUserCircle;
  faKey = faKey;
  faCogs = faCogs;*/
  logo: string = 'assets/img/logoubs.png';
  bsModalRef: any;
  menus: any = [];
  textoCabecera: any = '';
  user: any;
  /**
   *
   */
  constructor(
    private authenticateService: AuthenticateService,
    private modalService: BsModalService,
    private storageService: StorageService,
    private httpService: HttpService,
    public iconService: IconService
  ) {
    this.user = this.storageService.read('userLoginPortal');

    if (this.user.usrTusrCodTipoUsuario == 1) {
      this.textoCabecera = 'DashBoard';
    } else {
      this.textoCabecera = 'Soy Proveedor';
    }

    const params = new HttpParams().set(
      'TipoUsuario',
      this.user.usrTusrCodTipoUsuario
    );

    this.httpService.GetParams('Menu/SearchAll', params).subscribe((resp) => {
      if (resp.status == 200) {
        this.menus = resp.data.filter((o: any) => !o.menuId);
        this.menus.map((m: any) => {
          m.menus = resp.data.filter((o: any) => m.id === o.menuId);
        });
      }
    });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  salir() {
    this.authenticateService.logout();
  }

  /**
   *
   * Metodo para abrir modal con vista incrustada
   */
  async openModalWithComponent() {
    const userData = await this.storageService.read('userLoginPortal');

    const initialState: ModalOptions = {
      initialState: {
        list: ['Ejemplo', 1, 9],
        data: userData,
        action: 'editPerfil',
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
      if (resp) {
        console.log(`Ok`);
      }
    });
  }
}
