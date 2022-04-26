import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SoyproveedorComponent } from '../soyproveedor.component';
import { GeneracionCertificadosComponent } from './generacion-certificados/generacion-certificados.component';

const routes: Routes = [
  {
    path: 'soyproveedor',
    //canActivate: [AuthGuard],
    component: SoyproveedorComponent,
    children: [
      {
        path: 'generacioncertificados',
        component:GeneracionCertificadosComponent ,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneracionCertificadosRoutingModule { }
