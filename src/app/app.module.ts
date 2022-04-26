import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Componentes
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';

//Interceptors
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';

//Componentes
import { DashboardComponent } from './pages/dashBoard/dashboard.component';
import { SoyproveedorComponent } from './pages/soyProveedor/soyproveedor.component';

//Modulos
import { UsuariosGestoresModule } from './pages/dashBoard/usuariosGestores/usuarios-gestores.module';
import { GestionOrdesCompraContratoModule } from './pages/dashBoard/gestionOrdenesCompraContratos/gestion-ordes-compra-contrato.module';
import { GestionNoticiasModule } from './pages/dashBoard/gestionNoticias/gestion-noticias.module';
import { GestionProveedoresModule } from './pages/dashBoard/gestionProveedores/gestion-proveedores.module';
import { GestionReqBienesServiciosModule } from './pages/dashBoard/gestionReqBienesServicios/gestion-req-bienes-servicios.module';

//Shared
import { MessageComponent } from './shared/message/message.component';
import { LoadingComponent } from './shared/loading/loading.component';

//Ng-Boostrap
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

// FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//SweetAlert
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

//NgSelectModule
import { NgSelectModule } from '@ng-select/ng-select';

//Mensajes (chat)
import { MensajesComponent } from './shared/mensajes/mensajes.component';
import { NotificationsComponent } from './shared/notifications/notifications.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';
import { OlvidoPasswordComponent } from './pages/olvido-password/olvido-password.component';

//Directives
import { RegistrarmeProveedorComponent } from './pages/registrarme-proveedor/registrarme-proveedor.component';
import { EditarUsuarioComponent } from './pages/dashBoard/editar-usuario/editar-usuario.component';
import { OrdenesCompraContratoModule } from './pages/soyProveedor/ordenesCompraContrato/ordenes-compra-contrato.module';
import { ActualizarProveedorModule } from './pages/soyProveedor/actualizarProveedor/actualizar-proveedor.module';

import { EvaluacionProveedorModule } from './pages/soyProveedor/evaluacionProveedor/evaluacion-proveedor.module';
import { FacturacionCarteraModule } from './pages/soyProveedor/facturacionCartera/facturacion-cartera.module';
import { GeneracionCertificadosModule } from './pages/soyProveedor/generacionCertificados/generacion-certificados.module';

// PrimeNg
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelModule } from 'primeng/panel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { CaptchaModule } from 'primeng/captcha';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';

//Drag and Drog
import { NgxFileDropModule } from 'ngx-file-drop';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ChipsModule } from 'primeng/chips';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    SoyproveedorComponent,
    MessageComponent,
    LoadingComponent,
    MensajesComponent,
    NotificationsComponent,
    RecoveryPasswordComponent,
    OlvidoPasswordComponent,
    RegistrarmeProveedorComponent,
    EditarUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    GestionNoticiasModule,
    GestionOrdesCompraContratoModule,
    GestionProveedoresModule,
    GestionReqBienesServiciosModule,
    UsuariosGestoresModule,
    OrdenesCompraContratoModule,
    ActualizarProveedorModule,
    EvaluacionProveedorModule,
    FacturacionCarteraModule,
    GeneracionCertificadosModule,
    CarouselModule.forRoot(),
    SweetAlert2Module.forRoot(),
    LoadingBarModule,
    NgSelectModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    SidebarModule,
    TabViewModule,
    BreadcrumbModule,
    PanelModule,
    ConfirmDialogModule,
    NgxFileDropModule,
    AngularEditorModule,
    ChipsModule,
    DialogModule,
    ToastModule,
    ProgressBarModule,
    CaptchaModule,
    TableModule,
    AccordionModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
