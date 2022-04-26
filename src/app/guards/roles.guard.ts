import { MessageService } from './../service/message.service';
import { IMessage } from './../models/message.model';
import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../service/storage.service';

@Injectable({
  providedIn: 'root',
})
export class RolesGuard implements CanActivate {
  private msg: IMessage;
  constructor(
    private storageService: StorageService,
    private router: Router,
    private message: MessageService
  ) {
    this.msg = { type: '', message: '' };
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return await this.checkUserLogin(route);
  }

  private checkUserLogin(route: ActivatedRouteSnapshot): boolean {
    const permisosXUsuario = this.storageService.read('permisosXUsuario');
   
    const ventActual = route.data.role;
   

    const permiso = permisosXUsuario.find(
      (item: any) => item.men_Accion == ventActual
    );
    if (permiso) {
      return true;
    } else {
      this.msg.type = 'error';
      this.msg.message = 'Actualmete no cuenta con permisos a esta ventana';

      this.message.dispatch.next(this.msg);
      return false;
    }

    // console.log(rutaRole);

    // if (permisosXUsuario.includes(route.data.role)) {
    //   return true;
    // } else {
    //   this.router.navigate(['/', 'home']);
    //   return false;
    // }
  }
}
