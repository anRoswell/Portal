import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

//Componentes
import { DashboardComponent } from '../dashboard.component';

//Roles Guard
import { RolesGuard } from 'src/app/guards/roles.guard';
import { ListRequerimientosComponent } from './list-requerimientos/list-requerimientos.component';
import { NewRequerimientoComponent } from './list-requerimientos/new-requerimiento/new-requerimiento.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'requerimientos',
        component: ListRequerimientosComponent,
        data: {
          role: 'requerimientos',
        },
        //canActivate: [RolesGuard],
      },
      {
        path: 'newrequerimientos',
        component: NewRequerimientoComponent,
        data: {
          role: 'requerimientos',
        },
        //canActivate: [RolesGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionReqBienesServiciosRouteModule {}
