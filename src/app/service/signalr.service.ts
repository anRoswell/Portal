import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { from, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  public hubConnection: signalR.HubConnection;

  constructor() {}

  /**
   * Método que inicia el SignalR
   */
  startConnection = () => {
    // const sockect = "testsocket";
    const sockect = 'proveedorsocket';
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.server}/${sockect}`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    return this.hubConnection.start();
  };

  /**
   * Método para siempre escuchar respuestas del backend
   * @param serverHubMethod Nombre del método Hub a agregar al SignalR Handler
   */
  askServerListener(serverHubMethod: string) {
    this.hubConnection.on(serverHubMethod, (someText: any) => {
      console.log(someText);
    });
  }

  backData(data: Observable<string>): Observable<string> {
    return data.pipe(
      tap((resp) => {
        of(resp);
      })
    );
  }

  /**
   * Método para remover todos los Handler para el método hub especificado
   * @param serverHubMethod Nombre del método Hub a remover del SignalR Handler
   */
  removeServerHubMethod(serverHubMethod: string) {
    this.hubConnection.off(serverHubMethod);
  }

  /**
   * Método para enviar algun dato al backend y obtener respuesta
   * @param serverMethod Nombre del método en el servidor a invocar
   */
  askServer(serverMethod: string, paramData: any) {
    this.hubConnection
      .invoke(serverMethod, paramData)
      // .then()
      .catch((err: any) => console.error(err));
  }
}
