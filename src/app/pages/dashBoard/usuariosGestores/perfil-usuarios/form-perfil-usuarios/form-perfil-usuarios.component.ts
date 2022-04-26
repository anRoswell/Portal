import { UserLogin } from 'src/app/models/userLogin.model';
import { StorageService } from './../../../../../service/storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from './../../../../../service/http.service';
import { Component, Input, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form-perfil-usuarios',
  templateUrl: './form-perfil-usuarios.component.html',
  styleUrls: ['./form-perfil-usuarios.component.scss'],
})
export class FormPerfilUsuariosComponent implements OnInit {
  peopleLoading = true;
  usuarios: any = [];
  perfiles: any = [];
  public form: FormGroup;
  data: any;
  editando: boolean = false;
  public onClose: Subject<boolean>;
  faSave = faSave;
  faWindowClose = faWindowClose;
  textBtn = 'Guardar';

  msgError = 'Todos los campos son obligatorios!!!';
  validationMsg = false;

  userLogin: UserLogin;

  validation_messages = {
    pxuUsrCodUsuario: [
      {
        type: 'required',
        message: 'El usuario es requerido',
      },
    ],
    pxuPrfCodPerfil: [
      {
        type: 'required',
        message: 'El perfil es requerido',
      },
    ],
  };

  constructor(
    private modalService: BsModalService,
    private httpService: HttpService,
    private fb: FormBuilder,
    private storage: StorageService,
    public bsModalRef: BsModalRef
  ) {
    this.form = this.fb.group({
      id: [],
      pxuUsrCodUsuario: ['', Validators.required],
      pxuAplCodAplicacion: [1],
      pxuPrfCodPerfil: ['', Validators.required],
      codUser: ['', Validators.required],
      CodUserUpdate: [''],
    });
  }

  ngOnInit(): void {
    this.onClose = new Subject();
    this.userLogin = this.storage.read('userLoginPortal');

    this.form.controls.codUser.setValue(this.userLogin.id);

    this.consultarUsuarios();
    this.consultarPerfiles();

    if (this.data) {
      this.editando = true;
      this.textBtn = 'Actualizar';
      console.log(this.data);
      this.form.controls.CodUserUpdate.setValue(this.userLogin.id);

      this.form.controls.id.setValue(this.data.id);
      this.form.controls.pxuUsrCodUsuario.setValue(this.data.pxuUsrCodUsuario);
      this.form.controls.pxuPrfCodPerfil.setValue(this.data.pxuPrfCodPerfil);
    }

    this.peopleLoading = false;
  }

  consultarUsuarios() {
    this.httpService.Get('Usuario/SearchAll').subscribe((resp) => {
      console.log(resp.data);

      this.usuarios = resp.data;
    });
  }

  cancelar() {
    this.onClose.next(false);
    this.modalService.hide();
  }

  consultarPerfiles() {
    this.httpService.Get('Perfil/SearchAll').subscribe((resp) => {
      this.perfiles = resp.data;
    });
  }

  guardar(data: any) {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.validationMsg = true;
    } else {
      if (this.editando) {
        this.httpService
          .Put(data, 'PerfilesXusuario/Update')
          .subscribe((resp) => {
            if (resp.status == 200) {
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
          });
      } else {
        this.httpService
          .Post(data, 'PerfilesXusuario/Create')
          .subscribe((resp) => {
            if (resp.status == 200) {
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
    return item.usrNombreCompleto.toLowerCase().indexOf(term) > -1;
  }
}
