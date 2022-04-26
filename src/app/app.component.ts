import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { PrimeNGConfig } from 'primeng/api';
import { SignalrService } from './service/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'PortalProveedores';
  loader = this.loadingBar.useRef();
  constructor(
    private loadingBar: LoadingBarService,
    private config: PrimeNGConfig,
    private signalrService: SignalrService
  ) {
    this.loader.start();
  }

  ngOnInit() {
    this.signalrService
      .startConnection()
      .then(() => {
        console.log('Hub Connection Started!');
        this.signalrService.askServerListener('AskServerResponse');
      })
      .catch((err: any) =>
        console.log('Error while starting connection: ' + err)
      );
  }

  ngOnDestroy() {
    this.signalrService.removeServerHubMethod('AskServerResponse');
  }

  ngAfterViewInit() {
    this.loader.complete();
    this.config.setTranslation({
      startsWith: 'Empieza con',
      contains: 'Contiene',
      notContains: 'No contiene',
      endsWith: 'Finaliza con',
      equals: 'Igual',
      notEquals: 'No igual',
      noFilter: 'No filtro',
      lt: 'Menor que',
      lte: 'Menor que o igual a',
      gt: 'Mayor que',
      gte: 'Mayor que o igual a',
      is: 'Is',
      isNot: 'Is not',
      before: 'Antes',
      after: 'Despues',
      dateIs: 'Date is',
      dateIsNot: 'Date is not',
      dateBefore: 'Date is before',
      dateAfter: 'Date is after',
      clear: 'Limpiar',
      apply: 'Aplicar',
      matchAll: 'Match todo',
      matchAny: 'Match cualquiera',
      addRule: 'Agregar Regla',
      removeRule: 'Remover Regla',
      accept: 'Si',
      reject: 'No',
      choose: 'Elegir',
      upload: 'Upload',
      cancel: 'Cancelar',
      dayNames: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      monthNamesShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      dateFormat: 'mm/dd/yy',
      today: 'Today',
      weekHeader: 'Wk',
      weak: 'Weak',
      medium: 'Medium',
      strong: 'Strong',
      passwordPrompt: 'Enter a password',
      emptyMessage: 'No results found',
      emptyFilterMessage: 'No results found',
    });
  }
}
