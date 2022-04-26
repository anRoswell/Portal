import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluacionProveedorRoutingModule } from './evaluacion-proveedor-routing.module';
import { EvaluacionProveedorComponent } from './evaluacion-proveedor/evaluacion-proveedor.component';


@NgModule({
  declarations: [
    EvaluacionProveedorComponent
  ],
  imports: [
    CommonModule,
    EvaluacionProveedorRoutingModule
  ]
})
export class EvaluacionProveedorModule { }
