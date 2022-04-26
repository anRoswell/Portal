import { StorageService } from 'src/app/service/storage.service';
import { HttpService } from 'src/app/service/http.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserLogin } from 'src/app/models/userLogin.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form-permiso-empresas',
  templateUrl: './form-permiso-empresas.component.html',
  styleUrls: ['./form-permiso-empresas.component.scss'],
})
export class FormPermisoEmpresasComponent implements OnInit {
  peopleLoading = true;
  usuarios: any = [];
  empresas: any = [{ id: 43, name: 'Opel 3' }];
  public form: FormGroup;
  data: any;
  editando: boolean = false;
  public onClose: Subject<boolean>;

  //Font Awesome
  faSave = faSave;
  faWindowClose = faWindowClose;

  textBtn = 'Guardar';

  msgError = 'Todos los campos son obligatorios!!!';
  validationMsg = false;

  validation_messages = {
    peuUsrCodUsuario: [
      {
        type: 'required',
        message: 'El usuario es requerido',
      },
    ],
    peuEmpCodEmpresa: [
      {
        type: 'required',
        message: 'La empresa es requerida',
      },
    ],
  };

  userLogin: UserLogin;

  constructor(
    private modalService: BsModalService,
    private httpService: HttpService,
    private fb: FormBuilder,
    private storage: StorageService,
    public bsModalRef: BsModalRef
  ) {
    this.form = this.fb.group({
      id: [],
      peuUsrCodUsuario: ['', Validators.required],
      peuEmpCodEmpresa: ['', Validators.required],
      codUser: ['', Validators.required],
      CodUserUpdate: [''],
    });
  }

  async ngOnInit(): Promise<void> {
    this.onClose = new Subject();
    this.userLogin = this.storage.read('userLoginPortal');

    const parametros = await this.storage.read('parametros');
    this.empresas = parametros.empresas;

    this.form.controls.codUser.setValue(this.userLogin.id);

    this.consultarUsuarios();
    this.consultarEmpresas();

    if (this.data) {
      this.editando = true;
      this.textBtn = 'Actualizar';
      this.form.controls.CodUserUpdate.setValue(this.userLogin.id);

      
      this.form.controls.peuUsrCodUsuario.setValue(this.data.peuUsrCodUsuario);
      this.form.controls.peuEmpCodEmpresa.setValue(this.data.peuEmpCodEmpresa);
    }

    this.peopleLoading = false;
  }

  consultarUsuarios() {
    this.httpService.Get('Usuario/SearchAll').subscribe((resp) => {
      this.usuarios = resp.data;
    });
  }

  cancelar() {
    this.onClose.next(false);
    this.modalService.hide();
  }

  consultarEmpresas() {
    this.httpService.Get('Perfil/SearchAll').subscribe((resp) => {
      //this.empresas=resp.data
    });
  }

  guardar(data: any) {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.validationMsg = true;
    } else {
      if (this.editando) {
        this.httpService
          .Put(data, 'EmpresasxUsuario/Update')
          .subscribe((resp) => {
            if (resp.status == 200) {
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
        this.httpService
          .Post(data, 'EmpresasxUsuario/Create')
          .subscribe((resp) => {
            if (resp.status == 200) {
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
    return item.empNombreEmpresa.toLowerCase().indexOf(term) > -1;
  }

  customSearchFn2(term: string, item: any) {
    term = term.toLowerCase();
    return item.usrNombreCompleto.toLowerCase().indexOf(term) > -1;
  }
}
