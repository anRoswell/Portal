import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

//Servicio
import { StorageService } from '../service/storage.service';

@Directive({
  selector: '[appRole]',
})
export class RoleDirective {
  private currentUser: any = {};
  private permissions: Array<string> = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private storageService: StorageService
  ) {}

  async ngOnInit(): Promise<void> {
    this.currentUser = await this.storageService.read('permisosXUsuario');

    const view = await this.storageService.read('view');
    console.log(view);

    if (![this.currentUser].includes(null, undefined)) {
      this.currentUser.scopes = [];
      this.currentUser.map((permiso: any) => {
        if (permiso.men_Accion.toUpperCase() === view.toUpperCase()) {
          this.currentUser.scopes.push(permiso.pmp_Borrar);
          this.currentUser.scopes.push(permiso.pmp_Editar);
          this.currentUser.scopes.push(permiso.pmp_Grabar);
          this.currentUser.scopes.push(permiso.pmp_Leer);
        }
      });
      //console.log(this.currentUser);
    }

    this.updateView();
  }

  @Input()
  set appRole(val: Array<string>) {
    // ['write']
    //console.log(` ****`, val);
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.permissions = val;
    this.updateView();
  }

  private updateView(): void {
    this.viewContainer.clear();
    const permiso = this.checkPermission();

    if (permiso) {
      //true , false
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private checkPermission(): boolean {
    let hasPermission = false;
    if (this.currentUser && this.currentUser.scopes) {
      // TODO: USER scopes: ['write']

      if (![this.currentUser.scopes].includes(null, undefined)) {
        for (const checkPermission of this.permissions) {
          // TODO: DATA scopes: ['write']
          const permissionFound = this.currentUser.scopes.find((p: any) => {
            return p.toUpperCase() === checkPermission.toUpperCase();
          });

          if (permissionFound) {
            //console.log('SI tienes permiso: ', permissionFound);
            hasPermission = true;
            break;
          }
        }
      }
    }
    return hasPermission;
  }
}
