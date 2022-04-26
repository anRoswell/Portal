import { LoginGuard } from './../../../guards/login.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ListProveedoresComponent } from './list-proveedores/list-proveedores.component';
import { DashboardComponent } from '../dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [LoginGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'proveedor',
        component: ListProveedoresComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class gestionProveedoresRouteModule {}
