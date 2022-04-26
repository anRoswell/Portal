import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Componentes del modulo
import { PerfilComponent } from './perfil/perfil.component';

import { FormPermisoPerfilesComponent } from './permiso-perfiles/form-permiso-perfiles/form-permiso-perfiles.component';
import { PerfilUsuariosComponent } from './perfil-usuarios/lista-perfil-usuarios/lista-perfil-usuarios.component';
import { ListaPermisoPerfilesComponent } from './permiso-perfiles/lista-permiso-perfiles/lista-permiso-perfiles.component';
import { FormPerfilUsuariosComponent } from './perfil-usuarios/form-perfil-usuarios/form-perfil-usuarios.component';

import { PerfilformComponent } from './perfil/perfilform/perfilform.component';
import { ListaPermisoEmpresasComponent } from './permiso-empresas/lista-permiso-empresas/lista-permiso-empresas.component';
import { FormPermisoEmpresasComponent } from './permiso-empresas/form-permiso-empresas/form-permiso-empresas.component';

//FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosFormComponent } from './usuarios/usuarios-form/usuarios-form.component';
import { EmpresasUsuarioComponent } from './empresas-usuario/empresas-usuario.component';

//Ng-Boostrap
import { AlertModule } from 'ngx-bootstrap/alert';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

//Ng-select
import { NgSelectModule } from '@ng-select/ng-select';

import { RoleDirective } from 'src/app/directives/role.directive';

//PrimeNG
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    FormPermisoPerfilesComponent,
    PerfilComponent,
    PerfilUsuariosComponent,
    ListaPermisoPerfilesComponent,
    FormPerfilUsuariosComponent,
    PerfilformComponent,
    UsuariosComponent,
    UsuariosFormComponent,
    EmpresasUsuarioComponent,
    ListaPermisoEmpresasComponent,
    FormPermisoEmpresasComponent,
    RoleDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule,
    AlertModule,
    TabsModule,
    TooltipModule.forRoot(),
    NgSelectModule,
    TableModule,
  ],
  exports: [RoleDirective],
})
export class UsuariosGestoresModule {}
