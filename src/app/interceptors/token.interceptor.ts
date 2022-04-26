import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, share, map, catchError } from 'rxjs/operators';
import { IMessage } from '../models/message.model';
import { StorageService } from '../service/storage.service';
import { MessageService } from '../service/message.service';
import { AuthenticateService } from '../service/authenticate.service';
import Swal from 'sweetalert2';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private msg: IMessage;
  constructor(
    private storage: StorageService,
    private auth: AuthenticateService,
    private message: MessageService
  ) {
    this.msg = { type: '', message: '' };
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return of(this.storage.read('_token')).pipe(
      switchMap((token) => {
        if (token) {
          request = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
          });
        }
        return next.handle(request).pipe(
          share(),
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              token = event.headers.get('authorization');
              if (token) {
                this.storage.save('_token', token);
              }
              // Proceso para mostrar los mensaje en las acciones CRUD
              const { status } = event.body;
              // if (event.body.data[0]) {
              //   const { mensaje, estado } = event.body.data[0];
              //   if (status == 200) {
              //     if (mensaje) {
              //       if (!estado) {
              //         Swal.fire({
              //           title: 'Error',
              //           text: mensaje,
              //           icon: 'error',
              //           confirmButtonText: 'Ok',
              //         });
              //       }
              //     }
              //   } else {
              //     Swal.fire({
              //       title: 'Error',
              //       text: mensaje,
              //       icon: 'error',
              //       confirmButtonText: 'Ok',
              //     });
              //   }
              // }

              // const {
              //   body: { action },
              // } = event;
              // if (action) {
              //   this.msg.type = 'success';
              //   if (action === 'created') {
              //     this.msg.message = 'Registro creado con éxito';
              //   } else if (action === 'updated') {
              //     this.msg.message = 'Registro actualizado con éxito';
              //   } else if (action === 'deleted') {
              //     this.msg.message = 'Registro eliminado con éxito';
              //   } else {
              //     this.msg.message = 'Mensaje de prueba';
              //   }
              //   this.message.dispatch.next(this.msg);
              // }
            }

            if (event instanceof HttpErrorResponse) {
              const { status, error } = event;
              if ([401, 403].includes(status)) {
                this.auth.logout();
              }
              // Validación mensaje de error
               if (!status) {
                 this.msg.type = 'error';
                 this.msg.message = 'Error de conexión al servidor';
               } else {
                 this.msg.type = 'error';
                 this.msg.message = event.error.data[0].mensaje;
               }
              this.message.dispatch.next(this.msg);
            }

            return event;
          }),
          catchError((error) => {
            const { status } = error;
            this.validateError(status);
            return throwError(error);
          })
        );
      })
    );
  }

  validateError(status: any) {
    if ([401, 403].includes(status)) {
      this.auth.logout();
    }
  }
}
