import { LoginGuard } from './../../../guards/login.guard';
import { PerfilProveedorComponent } from './perfil-proveedor/perfil-proveedor.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//
import { SoyproveedorComponent } from '../soyproveedor.component';

//Vistas
import { UpdateProveedorComponent } from './update-proveedor/update-proveedor.component';

const routes: Routes = [
  {
    path: 'soyproveedor',
    canActivate: [LoginGuard],
    component: SoyproveedorComponent,
    children: [
      {
        path: 'actualizarproveedor',
        component: UpdateProveedorComponent,
      },
      {
        path: 'perfilproveedor',
        component: PerfilProveedorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarProveedorRoutingModule {}
