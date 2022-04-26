import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

//Servicios
import { HttpService } from './../../service/http.service';
import { StorageService } from './../../service/storage.service';

//Sweet Alert
import Swal from 'sweetalert2';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss'],
})
export class MensajesComponent implements OnInit {
  //Chat
  public showModalChat = false;
  public form: FormGroup;
  public formData = new FormData();
  public display = false;

  //Drag And Drog
  public files: NgxFileDropEntry[] = [];

  constructor(
    private httpService: HttpService,
    private storageService: StorageService
  ) {
    this.form = new FormGroup({
      CodUser: new FormControl(1, [Validators.required]),
      id: new FormControl(0, [Validators.required]),
      rqaCodRequerimiento: new FormControl(1, [Validators.required]),
      rqaCodProveedor: new FormControl(null),
      rqaCodUsuario: new FormControl(1),
      rqaComentario: new FormControl(null, [Validators.required]),
      rqahasUploadFile: new FormControl(false, [Validators.required]),
      rqaisPrivate: new FormControl(false, [Validators.required]),
      rqaEstado: new FormControl(true, [Validators.required]),
    });
  }

  iconomensaje = 'assets/img/messages-icon.png';
  ngOnInit(): void {}

  //#region Form
  openForm() {
    if (this.showModalChat) {
      this.showModalChat = false;
    } else {
      this.showModalChat = true;
    }
  }

  async validateForm() {
    const dataUser = await this.storageService.read('userLoginPortal');
    console.log(dataUser);

    this.form.patchValue({
      CodUser: dataUser.id,
    });

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
    this.formData.delete('Mensaje');
    const valForm = JSON.stringify(this.form.value);
    this.formData.append('Mensaje', valForm);
    this.httpService
      .PostFormData(this.formData, 'ReqQuestionAnswer/Create')
      .subscribe((resp) => {
        console.log(resp);
      });
  }

  closeForm() {
    this.showModalChat = false;
  }

  mostrar() {
    this.display = true;
  }

  drop() {}
  //#endregion

  //#region DRAG AND DROG
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          // You could upload it like this:
          this.formData.delete('file');
          this.formData.append('file', file, file.name);
          this.form.patchValue({
            rqahasUploadFile: true,
          });

          /**
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }
  //#endregion
}
