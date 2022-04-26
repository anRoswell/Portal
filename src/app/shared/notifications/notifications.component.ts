import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { faBell } from '@fortawesome/free-solid-svg-icons';

//Servicios
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  faBell = faBell;

  cantNotificaciones = 0;
  notifications: any = [];
  display = false;

  constructor(private httpService: HttpService) {
    this.getNotificationsByUser();
  }

  ngOnInit(): void {}

  getNotificationsByUser() {
    this.httpService.Get('Notifications/Search').subscribe((resp) => {
      this.cantNotificaciones = resp.data.length;
      this.notifications = resp.data;
    });
  }

  showNotification() {
    this.display = true;
  }

  updateNotification(idNotification: number) {
    const params = new HttpParams().set('id', idNotification);

    this.httpService
      .PutParams(`Notifications/Update`, params)
      .subscribe((resp) => {
        this.notifications.map((notification: any) => {
          if (notification.id === idNotification) {
            this.cantNotificaciones--;

            notification.estadoNotificacion = true;
          }
        });
      });
  }
}
