import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturacionCarteraRoutingModule } from './facturacion-cartera-routing.module';
import { FacturacionCarteraComponent } from './facturacion-cartera/facturacion-cartera.component';


@NgModule({
  declarations: [
    FacturacionCarteraComponent
  ],
  imports: [
    CommonModule,
    FacturacionCarteraRoutingModule
  ]
})
export class FacturacionCarteraModule { }
