import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

//Servicios
import { HttpService } from './../../service/http.service';
import { StorageService } from './../../service/storage.service';

//Sweet Alert
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { IPermisosXUsuario } from 'src/app/models/permisosXusuario.model';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  userLogin: any;

  validation_messages = {
    email: [
      {
        type: 'required',
        message: 'El correo es requerido',
      },
    ],
    password: [
      {
        type: 'required',
        message: 'La contraseña es requerida',
      },
    ],
  };
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private storage: StorageService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      recordar: [false],
    });

    const resp = this.storage.read('recordUserPortal');
    if (resp != null) {
      this.form.controls.email.setValue(resp.email);
      this.form.controls.password.setValue(resp.password);
      this.form.controls.recordar.setValue(true);
    }
  }

  ngOnInit(): void {}

  login(data: any) {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.httpService.Post(data, 'Usuario/Authentication').subscribe(
        (resp) => {
          if (resp.status == 200) {
            this.userLogin = resp.data.usuario;
            const parametros = resp.data.parametros;
            const permisosXUsuario: IPermisosXUsuario =
              resp.data.permisosXUsuario;

            this.storage.save('userLoginPortal', this.userLogin);
            this.storage.save('parametros', parametros);
            this.storage.save('permisosXUsuario', permisosXUsuario);

            const recordar = this.form.get('recordar')?.value;

            if (recordar) {
              this.storage.save('recordUserPortal', data);
            } else {
              this.storage.destroy('recordUserPortal');
            }

            this.checkUserAtributes();
          } else {
            const optionsSweet: SweetAlertOptions = {
              title: 'ACCESO AL SISTEMA!',
              text: resp.data[0].mensaje,
              icon: 'warning',
              confirmButtonText: 'Ok',
            };

            Swal.fire(optionsSweet).then((_) => {});
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  private checkUserAtributes() {
    if (this.userLogin.usrForcePasswordChange) {
      const optionsSweet: SweetAlertOptions = {
        title: 'RECUPERAR PASSWORD!',
        text: 'Sr. usuario, su contraseña se ha vencido, por favor actualizar!',
        icon: 'warning',
        confirmButtonText: 'Ok',
      };

      Swal.fire(optionsSweet).then((_) => {
        this.router.navigate(['/recoveryPassword/' + this.userLogin.usrToken]);
      });
    } else {
      switch (this.userLogin.usrTusrCodTipoUsuario) {
        case 1:
          this.router.navigate(['/dashboard']);
          break;
        case 2:
          this.router.navigate(['/soyproveedor']);
          break;
      }
    }
  }

  redirecTo() {
    this.router.navigate(['/recoveryPassword']);
  }
}
