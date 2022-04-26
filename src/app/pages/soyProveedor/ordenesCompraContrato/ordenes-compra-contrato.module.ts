import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Componente
import { OrdenesCompraContratoComponent } from './ordenes-compra-contrato/ordenes-compra-contrato.component';
import { ProcesoContratacionComponent } from './proceso-contratacion/proceso-contratacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequerimientosComponent } from './requerimientos/requerimientos.component';


@NgModule({
  declarations: [OrdenesCompraContratoComponent, ProcesoContratacionComponent, RequerimientosComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class OrdenesCompraContratoModule {}
