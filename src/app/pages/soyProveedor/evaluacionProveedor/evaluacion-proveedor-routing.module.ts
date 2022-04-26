import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoyproveedorComponent } from '../soyproveedor.component';
import { EvaluacionProveedorComponent } from './evaluacion-proveedor/evaluacion-proveedor.component';

const routes: Routes = [
  {
    path: 'soyproveedor',
    //canActivate: [AuthGuard],
    component: SoyproveedorComponent,
    children: [
      {
        path: 'evaluacionproveedor',
        component: EvaluacionProveedorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionProveedorRoutingModule { }
