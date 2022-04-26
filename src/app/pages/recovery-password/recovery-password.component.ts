import { Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  faSave,
  faWindowClose,
  faUser,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'src/app/service/http.service';

//Sweet Alert
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { CustomValidators } from './CustomValidators';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss'],
})
export class RecoveryPasswordComponent implements OnInit {
  //#region Variables

  // FontAwesome
  faSave = faSave;
  faWindowClose = faWindowClose;
  faUser = faUser;
  faSyncAlt = faSyncAlt;

  //Formulario
  form: FormGroup;
  textBtn = 'Guardar';
  token: number;

  public validationsMessage = {
    usrPasswordSetter: [
      {
        type: 'required',
        message: 'Confirmación password es requerida',
      },
      {
        type: 'minlength',
        message: 'Minimo 8 letras para el password',
      },
    ],
    newPassword: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
      {
        type: 'minlength',
        message: 'Minimo 8 letras para el password',
      },
      {
        type: 'hasNumber',
        message: 'Debe contener un número',
      },
      {
        type: 'hasCapitalCase',
        message: 'Debe contener una mayuscula',
      },
      {
        type: 'hasSmallCase',
        message: 'Debe contener una minuscula',
      },
      {
        type: 'hasSpecialCharacters',
        message: 'Debe contener un caracter especial',
      },
    ],
  };
  //#endregion

  //#region CONSTRUCTOR
  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.token = [undefined].includes(this.route.snapshot.params.token)
      ? null
      : this.route.snapshot.params.token;
  }
  //#endregion

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        id: new FormControl(null),
        newPassword: new FormControl(null, [
          // 1. Password Field is Required
          Validators.required,
          // 2. check whether the entered password has a number
          CustomValidators.patternValidator(/\d/, { hasNumber: true }),
          // 3. check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          // 4. check whether the entered password has a lower-case letter
          CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
          // 5. check whether the entered password has a special character
          CustomValidators.patternValidator(
            /[\.\*\_\-\$\(\)\@\!\#\%\^\&\*\+\=\{\}\;\:\|\,\<\>\?\/\'\"\?\¿\¡]/,
            {
              hasSpecialCharacters: true,
            }
          ),

          // 6. Has a minimum length of 8 characters
          Validators.minLength(8),
        ]),
        usrPasswordSetter: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
        // usrLoginPrimeraVez: new FormControl(null),
        token: new FormControl(null),
      },
      CustomValidators.mustMatch('newPassword', 'usrPasswordSetter')
    );

    this.changePass();
  }

  //#region Validate FORM 1
  async validateForm() {
    this.form.get('token')?.setValue(this.token);
    console.log(this.form.value);

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      Swal.fire({
        title: 'CONFIRMAR REGISTRO',
        text: 'Los campos del formulario son obligatorios!!!',
        icon: 'warning',
        confirmButtonText: 'Ok',
      }).then((_) => {});
      return;
    }

    this.saveForm();
  }

  saveForm() {
    const data = this.form.value;
    let ruta = 'Usuario/RecoveryPassword';

    switch (ruta) {
      case '1':
        ruta = 'Usuario/ChangePassword';
        break;
      case '2':
        ruta = 'Usuario/RecoveryPassword';
        break;
    }

    this.httpService.Post(data, ruta).subscribe((resp) => {
      console.log(resp);
      const status = resp.status;
      const mensaje = resp.data[0].mensaje;
      let icono: SweetAlertIcon = 'success';
      switch (status) {
        case 200:
          icono = 'success';
          break;
        case 400:
          icono = 'error';
          break;
        default:
          break;
      }

      Swal.fire({
        title: 'GUARDAR REGISTRO!',
        text: mensaje,
        icon: icono,
        confirmButtonText: 'Ok',
      }).then((_) => {
        this.router.navigate(['./login']);
      });
    });
  }

  /**
   * Metodo q valida los campos de los formularios
   * @param field = campo a validar
   * @param validationType tipo de validacion a mostrar mensaje de error
   * @returns devuelve boolean
   */
  isValid(field: string, validationType: string) {
    const f: any = this.form.get(field);
    return f.hasError(validationType) && (f.dirty || f.touched);
  }

  changePass() {
    const userpass = this.form.get('newPassword');
    userpass?.valueChanges.subscribe((_) => {
      this.form.get('usrPasswordSetter')?.setValue('');
    });
  }
  //#endregion

  home() {
    this.router.navigate(['/login']);
  }
}
