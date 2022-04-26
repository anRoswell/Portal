import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Componente
import { UpdateProveedorComponent } from './update-proveedor/update-proveedor.component';
import { PerfilProveedorComponent } from './perfil-proveedor/perfil-proveedor.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [UpdateProveedorComponent, PerfilProveedorComponent],
  imports: [CommonModule,
    FontAwesomeModule,
  ],
})
export class ActualizarProveedorModule {}
