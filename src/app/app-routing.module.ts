import { HomeGuard } from './guards/home.guard';
import { NgModule } from '@angular/core';

import { LoginComponent } from './pages/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';

//RoutingModules
import { UsuariosGestoresRoutingModule } from './pages/dashBoard/usuariosGestores/usuariosGestores-routing.module';
import { gestionOrdenesCompraContratosRouteModule } from './pages/dashBoard/gestionOrdenesCompraContratos/gestion-ordenes-compra-contratos-routing.module';
import { GestionNoticiasRoutingModule } from './pages/dashBoard/gestionNoticias/gestion-noticias-routing.module';
import { gestionProveedoresRouteModule } from './pages/dashBoard/gestionProveedores/gestion-proveedores-routing.module';
import { GestionReqBienesServiciosRouteModule } from './pages/dashBoard/gestionReqBienesServicios/gestion-req-bienes-servicios-routing.module';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';
import { OlvidoPasswordComponent } from './pages/olvido-password/olvido-password.component';
import { RegistrarmeProveedorComponent } from './pages/registrarme-proveedor/registrarme-proveedor.component';

import { HomeComponent } from './pages/home/home.component';
import { ActualizarProveedorRoutingModule } from './pages/soyProveedor/actualizarProveedor/actualizar-proveedor-routing.module';
import { EvaluacionProveedorRoutingModule } from './pages/soyProveedor/evaluacionProveedor/evaluacion-proveedor-routing.module';
import { FacturacionCarteraRoutingModule } from './pages/soyProveedor/facturacionCartera/facturacion-cartera-routing.module';
import { GeneracionCertificadosRoutingModule } from './pages/soyProveedor/generacionCertificados/generacion-certificados-routing.module';
import { ListRequerimientosComponent } from './pages/dashBoard/gestionReqBienesServicios/list-requerimientos/list-requerimientos.component';
import { OrdenesCompraContratoRoutingModule } from './pages/soyProveedor/ordenesCompraContrato/ordenes-compra-contrato-routing.module';

//Guards

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [HomeGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'recoveryPassword', component: RecoveryPasswordComponent },
  { path: 'recoveryPassword/:token', component: RecoveryPasswordComponent },
  { path: 'olvidoPassword', component: OlvidoPasswordComponent },
  { path: 'resgistro-proveedor', component: RegistrarmeProveedorComponent },
  { path: 'requerimientos', component: ListRequerimientosComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      relativeLinkResolution: 'legacy',
    }),
    GestionNoticiasRoutingModule,
    gestionOrdenesCompraContratosRouteModule,
    UsuariosGestoresRoutingModule,
    gestionProveedoresRouteModule,
    GestionReqBienesServiciosRouteModule,
    ActualizarProveedorRoutingModule,
    EvaluacionProveedorRoutingModule,
    FacturacionCarteraRoutingModule,
    GeneracionCertificadosRoutingModule,
    OrdenesCompraContratoRoutingModule
    
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
