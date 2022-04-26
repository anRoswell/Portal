import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoyproveedorComponent } from '../soyproveedor.component';
import { FacturacionCarteraComponent } from './facturacion-cartera/facturacion-cartera.component';

const routes: Routes = [
  {
    path: 'soyproveedor',
    //canActivate: [AuthGuard],
    component: SoyproveedorComponent,
    children: [
      {
        path: 'facturacioncartera',
        component: FacturacionCarteraComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturacionCarteraRoutingModule { }
