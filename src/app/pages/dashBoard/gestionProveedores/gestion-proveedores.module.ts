import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Ng Boostrap
import { AlertModule } from 'ngx-bootstrap/alert';

//Ng-select
import { NgSelectModule } from '@ng-select/ng-select';
import { PanelModule } from 'primeng/panel';

//PrimeNG
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { ChipsModule } from 'primeng/chips';

//Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { ListProveedoresComponent } from './list-proveedores/list-proveedores.component';
import { ShowRequerimientoComponent } from './list-proveedores/show-requerimiento/show-requerimiento.component';

@NgModule({
  declarations: [ListProveedoresComponent, ShowRequerimientoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    FontAwesomeModule,
    NgSelectModule,
    PanelModule,
    TableModule,
    ToastModule,
    TooltipModule,
    ConfirmDialogModule,
    TabViewModule,
    BadgeModule,
    DialogModule,
    ChipsModule,
    AngularEditorModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class GestionProveedoresModule {}
