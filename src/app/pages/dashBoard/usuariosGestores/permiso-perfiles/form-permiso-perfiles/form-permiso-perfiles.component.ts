import { HttpService } from './../../../../../service/http.service';
import { UserLogin } from 'src/app/models/userLogin.model';
import { StorageService } from './../../../../../service/storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-form-permiso-perfiles',
  templateUrl: './form-permiso-perfiles.component.html',
  styleUrls: ['./form-permiso-perfiles.component.scss'],
})
export class FormPermisoPerfilesComponent implements OnInit {
  peopleLoading = true;
  perfiles: any = [];
  menus: any = [];
  faSave = faSave;
  faWindowClose = faWindowClose;
  public onClose: Subject<boolean>;
  editando: boolean = false;
  public form: FormGroup;
  userLogin: UserLogin;
  msgError = 'Todos los campos son obligatorios!!!';
  validationMsg = false;
  textBtn = 'Guardar';
  data: any;

  validation_messages = {
    pmpMenCodMenu: [
      {
        type: 'required',
        message: 'El menu es requerido',
      },
    ],
    pmpPrfCodPerfil: [
      {
        type: 'required',
        message: 'El perfil es requerido',
      },
    ],
  };

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private storage: StorageService,
    private httpService: HttpService
  ) {
    this.form = this.fb.group({
      id: [],
      pmpMenCodMenu: ['', Validators.required],
      pmpPrfCodPerfil: ['', Validators.required],
      codUser: ['', Validators.required],
      pmpAplCodAplicacion: [1],
      pmpEjecutar: [false],
      pmpLeer: [false],
      pmpEditar: [false],
      pmpGrabar: [false],
      pmpBorrar: [false],
      pmpConsultar: [false],
      codUserUpdate: [''],
    });
  }

  ngOnInit(): void {
    this.onClose = new Subject();
    this.userLogin = this.storage.read('userLoginPortal');
    console.log(this.userLogin.id);

    this.form.controls.codUser.setValue(this.userLogin.id);
    this.consultarPerfiles();
    this.consultarMenus();
    if (this.data) {
      console.log(this.data);
      this.editando = true;
      this.textBtn = 'Actualizar';

      this.form.controls.codUserUpdate.setValue(this.userLogin.id);
      this.form.controls.id.setValue(this.data.id);
      this.form.controls.pmpMenCodMenu.setValue(this.data.pmpMenCodMenu);
      this.form.controls.pmpPrfCodPerfil.setValue(this.data.pmpPrfCodPerfil);
      this.form.controls.pmpEjecutar.setValue(this.data.pmpEjecutar);
      this.form.controls.pmpLeer.setValue(this.data.pmpLeer);
      this.form.controls.pmpEditar.setValue(this.data.pmpEditar);
      this.form.controls.pmpGrabar.setValue(this.data.pmpGrabar);
      this.form.controls.pmpBorrar.setValue(this.data.pmpBorrar);
      this.form.controls.pmpConsultar.setValue(this.data.pmpConsultar);
    }
    this.peopleLoading = false;
  }

  cancelar() {
    this.modalService.hide();
  }

  consultarPerfiles() {
    this.httpService.Get('Perfil/SearchAll').subscribe((resp) => {
      console.log(resp);
      this.perfiles = resp.data;
    });
  }

  consultarMenus() {
    const params = new HttpParams()
    .set('TipoUsuario', 1)
    this.httpService.GetParams('Menu/SearchAll',params).subscribe((resp) => {
    
      this.menus = resp.data;
    });
  }

  guardar(data: any) {
    console.log(data);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.validationMsg = true;
    } else {
      if (this.editando) {
        this.httpService.Put(data, 'MenuXPerfil/Update').subscribe((resp) => {
          if (resp.status == 200) {
            console.log(resp);

            if (resp.data[0].estado) {
              Swal.fire({
                title: 'CONFRMAR REGISTRO',
                text: resp.data[0].mensaje,
                icon: 'success',
                confirmButtonText: 'Ok',
              }).then((_) => {
                this.onClose.next(true);
                this.modalService.hide();
              });
            }
          }
        });
      } else {
        this.httpService.Post(data, 'MenuXPerfil/Create').subscribe((resp) => {
          console.log(resp);
          if (resp.status == 200) {
            console.log(resp);

            if (resp.data[0].estado) {
              Swal.fire({
                title: 'CONFRMAR REGISTRO',
                text: resp.data[0].mensaje,
                icon: 'success',
                confirmButtonText: 'Ok',
              }).then((_) => {
                this.onClose.next(true);
                this.modalService.hide();
              });
            } else {
              Swal.fire({
                title: 'Error',
                text: resp.data[0].mensaje,
                icon: 'error',
                confirmButtonText: 'Ok',
              });
            }
          } else {
            Swal.fire({
              title: 'Error',
              text: resp.data[0].mensaje,
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        });
      }
    }
  }

  customSearchFn(term: string, item: any) {
    term = term.toLowerCase();
    return item.prfNombrePerfil.toLowerCase().indexOf(term) > -1;
  }
  customSearchFn2(term: string, item: any) {
    term = term.toLowerCase();
    return item.menModuloDescripcion.toLowerCase().indexOf(term) > -1;
  }
}
