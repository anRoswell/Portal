import { Component, OnInit } from '@angular/core';

//
import { HttpService } from 'src/app/service/http.service';
import { StorageService } from 'src/app/service/storage.service';

//PrimeNg
import { Table } from 'primeng/table';

//Font awesome
import {
  faPlus,
  faEdit,
  faTimes,
  faKey,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

//Modal
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

import { Message, MessageService } from 'primeng/api';
import { NewRequerimientoComponent } from './new-requerimiento/new-requerimiento.component';
import { FormControl, FormGroup } from '@angular/forms';
import { IEstados } from 'src/app/models/estados.mode';

@Component({
  selector: 'app-list-requerimientos',
  templateUrl: './list-requerimientos.component.html',
  styleUrls: ['./list-requerimientos.component.scss'],
  providers: [MessageService],
})
export class ListRequerimientosComponent implements OnInit {
  //#region
  public datos: any;

  public msgsError: Message[];

  //Font Awesome
  faPlus = faPlus;
  faEdit = faEdit;
  faTimes = faTimes;
  faKey = faKey;
  bsModalRef?: BsModalRef;
  faSearch = faSearch;

  loading = false;

  form: FormGroup;

  //Estados
  categoriasServicio: string[] = [];

  //Table
  prvEstados: Array<IEstados>;

  //#endregion

  //#region CONSTRUCTOR
  constructor(
    private modalService: BsModalService,
    private httpService: HttpService,
    private storageService: StorageService
  ) {
    this.form = new FormGroup({
      idLocalidad: new FormControl(''),
      idCategoriaServicio: new FormControl(null),
      idEstado: new FormControl(null),
      razonSocial: new FormControl(''),
      nit: new FormControl(''),
    });
  }
  //#endregion

  //#region CYCLE LYFE
  ngOnInit(): void {
    this.searchAll();
  }
  //#endregion

  private searchAll() {
    this.loading = true;
    this.httpService.Get('Requerimientos/SearchRequerimientos').subscribe(
      (resp) => {
        const { data } = resp;
        this.datos = data;
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.datos = [];
        this.msgsError = [
          {
            severity: 'error',
            summary: 'ERROR',
            detail: 'Error al consultar datos, favor contactar a soporte!!!',
          },
        ];
        this.loading = false;
      }
    );
  }

  //#region MODAL
  /**
   *
   * Metodo para abrir modal con vista incrustada
   * @param id => Id del registro
   * @param data => data del registro
   * @param title => Titulo de la acción
   * @param action => crear, editar o eliminar
   */
  openModalWithComponent(id: number, data: any, title: string, action: string) {
    const initialState: ModalOptions = {
      initialState: {
        list: ['Ejemplo', 1, 9],
        title,
        action,
        id,
        data,
      },
      class: 'modal-xl',
      backdrop: 'static',
    };
    // modal-(sm, md, lg, xl)
    this.bsModalRef = this.modalService.show(
      NewRequerimientoComponent,
      initialState
    );
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose.subscribe((resp: any) => {
      console.log(resp);

      if (resp) {
        //this.searchAll();
      }
    });
  }
  //#endregion

  //#region Prime Ng Table
  clear(table: Table) {
    table.clear();
  }

  //#endregion
}
