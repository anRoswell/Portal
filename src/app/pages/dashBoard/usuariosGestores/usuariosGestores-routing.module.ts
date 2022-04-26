import { LoginGuard } from './../../../guards/login.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../dashboard.component';

import { PerfilUsuariosComponent } from './perfil-usuarios/lista-perfil-usuarios/lista-perfil-usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ListaPermisoPerfilesComponent } from './permiso-perfiles/lista-permiso-perfiles/lista-permiso-perfiles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ListaPermisoEmpresasComponent } from './permiso-empresas/lista-permiso-empresas/lista-permiso-empresas.component';

//Roles Guard
import { RolesGuard } from 'src/app/guards/roles.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'perfil',
        component: PerfilComponent,
        data: {
          role: 'perfil',
        },
        canActivate: [RolesGuard],
      },
      {
        path: 'permisosperfiles',
        component: ListaPermisoPerfilesComponent,
        data: {
          role: 'permisosperfiles',
        },
        canActivate: [RolesGuard],
      },
      {
        path: 'permisosperfiles/form/:id',
        component: ListaPermisoPerfilesComponent,

        canActivate: [RolesGuard],
      },
      {
        path: 'perfilusuarios',
        component: PerfilUsuariosComponent,
        data: {
          role: 'perfilusuarios',
        },
        canActivate: [RolesGuard],
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        data: {
          role: 'usuarios',
        },
        canActivate: [RolesGuard],
      },
      {
        path: 'permisosempresa',
        component: ListaPermisoEmpresasComponent,
        data: {
          role: 'permisosempresa',
        },
        canActivate: [RolesGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosGestoresRoutingModule {}
