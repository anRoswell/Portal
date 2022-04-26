import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//
import { SoyproveedorComponent } from '../soyproveedor.component';

//Vistas
import { OrdenesCompraContratoComponent } from './ordenes-compra-contrato/ordenes-compra-contrato.component';
import { ProcesoContratacionComponent } from './proceso-contratacion/proceso-contratacion.component';
import { RequerimientosComponent } from './requerimientos/requerimientos.component';

const routes: Routes = [
  {
    path: 'soyproveedor',
    //canActivate: [AuthGuard],
    component: SoyproveedorComponent,
    children: [
      {
        path: 'ordenescompracontrato',
        component: OrdenesCompraContratoComponent,
      },
      {
        path: 'procesocontratacion',
        component: ProcesoContratacionComponent,
      },
      {
        path: 'requerimientos',
        component: RequerimientosComponent,
      },
      {
        path: 'ordenescompra',
        component: OrdenesCompraContratoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenesCompraContratoRoutingModule {}
