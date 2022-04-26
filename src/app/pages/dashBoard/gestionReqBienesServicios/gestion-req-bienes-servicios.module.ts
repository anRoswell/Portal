import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRequerimientosComponent } from './list-requerimientos/list-requerimientos.component';

//Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//PrimeNg
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { NewRequerimientoComponent } from './list-requerimientos/new-requerimiento/new-requerimiento.component';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';

// NgSelect
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [ListRequerimientosComponent, NewRequerimientoComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    TableModule,
    MessagesModule,
    DropdownModule,
    NgSelectModule,
    PanelModule,
    AngularEditorModule,
  ],
})
export class GestionReqBienesServiciosModule {}
