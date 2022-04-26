import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneracionCertificadosRoutingModule } from './generacion-certificados-routing.module';
import { GeneracionCertificadosComponent } from './generacion-certificados/generacion-certificados.component';


@NgModule({
  declarations: [
    GeneracionCertificadosComponent
  ],
  imports: [
    CommonModule,
    GeneracionCertificadosRoutingModule
  ]
})
export class GeneracionCertificadosModule { }
