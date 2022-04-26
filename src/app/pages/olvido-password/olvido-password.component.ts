import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';

import {
  faSave,
  faWindowClose,
  faUser,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';

//Sweet Alert
import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olvido-password',
  templateUrl: './olvido-password.component.html',
  styleUrls: ['./olvido-password.component.scss'],
})
export class OlvidoPasswordComponent implements OnInit {
  //#region Variables

  // FontAwesome
  faSave = faSave;
  faWindowClose = faWindowClose;
  faUser = faUser;
  faSyncAlt = faSyncAlt;

  //Formulario
  form: FormGroup;
  textBtn = 'Guardar';

  public validationsMessage = {
    usrCedula: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
      {
        type: 'minlength',
        message: 'Minimo 8 letras para el password',
      },
    ],
    usrEmail: [
      {
        type: 'required',
        message: 'Campo requerido',
      },
      {
        type: 'minlength',
        message: 'Minimo 8 letras para el password',
      },
    ],
  };

  //bn-boostrap Alert
  msgError = 'Todos los campos son obligatorios!!!';
  validationMsg = false;

  //#endregion

  //#region CONSTRUCTOR
  constructor(private httpService: HttpService, private router: Router) {
    this.form = new FormGroup({
      usrEmail: new FormControl(null, [Validators.required]),
      usrCedula: new FormControl(null, [Validators.required]),
    });
  }
  //#endregion

  ngOnInit(): void {}

  //#region Validate FORM 1
  async validateForm() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.validationMsg = true;

      // Swal.fire({
      //   title: 'CONFIRMAR REGISTRO',
      //   text: 'Los campos del formulario son obligatorios!!!',
      //   icon: 'warning',
      //   confirmButtonText: 'Ok',
      // }).then((_) => {});
      return;
    }

    this.saveForm();
  }

  saveForm() {
    const data = this.form.value;

    this.httpService
      .Post(data, 'Usuario/ForgottenPassword')
      .subscribe((resp) => {
        const { data, status } = resp;
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

        const optionsSweet: SweetAlertOptions = {
          title: 'RECUPERAR PASSWORD!',
          text: data[0].mensaje,
          icon: icono,
          confirmButtonText: 'Ok',
        };

        Swal.fire(optionsSweet).then((_) => {});
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
  //#endregion

  home() {
    this.router.navigate(['/login']);
  }
}
