import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiNodeJs } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrlNodeJs = ApiNodeJs;
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  public Get(rutaApi: string): Observable<any> {
    const APIREST = `${ApiNodeJs}${rutaApi}`;

    return this.http.get<any>(APIREST, this.httpOptions).pipe(
      tap((resp) => {
        of(resp);
      })
    );
  }

  public GetParams(rutaApi: string, params: HttpParams): Observable<any> {
    const APIREST = `${ApiNodeJs}${rutaApi}`;
    return this.http
      .get<any>(APIREST, { params, headers: this.httpOptions.headers })
      .pipe(
        tap((resp) => {
          of(resp);
        })
      );
  }

  /**
   * httpPost generico para todas las consulta
   * @param body data
   * @param opcion indica si se llama al backend csharp o nodeJs
   * @param rutaApi ruta del backend
   */
  public Post(
    body: any,
    rutaApi: string = '',
    opcion: string = 'node'
  ): Observable<any> {
    const APIREST = this.apiRest(rutaApi, opcion);
    return this.http
      .post<any>(`${APIREST}`, JSON.stringify(body), this.httpOptions)
      .pipe(tap((resp) => of(resp)));
  }

  getData(rutaApi: string): Observable<any[]> {
    const opcion: string = 'node';
    const APIREST = this.apiRest(rutaApi, opcion);
    return this.http.get<any[]>(`${APIREST}`);
  }

  getAllEmployeesWithPaging(dtParams: any): Observable<any> {
    const APIREST = this.apiRest('SSR/SSR', 'node');
    return this.http.put(APIREST, dtParams);
  }

  /**
   * httpPost generico para todas las consulta
   * @param body data
   * @param opcion indica si se llama al backend csharp o nodeJs
   * @param rutaApi ruta del backend
   */
  public PostFormData(
    body: FormData,
    rutaApi: string = '',
    opcion: string = 'node'
  ): Observable<any> {
    const APIREST = this.apiRest(rutaApi, opcion);
    return this.http.post<any>(APIREST, body).pipe(tap((resp) => of(resp)));
  }

  /**
   * Metodo httpDelete generico
   * @param rutaApi ruta a ser llamada
   */
  public Delete(rutaApi: string, body = {}): Observable<any> {
    return this.http
      .delete<any>(`${ApiNodeJs}${rutaApi}`, {
        body: JSON.stringify(body),
        headers: this.httpOptions.headers,
      })
      .pipe(tap((data) => of(data)));
  }

  /**
   * Metodo httpDelete generico
   * @param rutaApi ruta a ser llamada
   */
  public DeleteParams(rutaApi: string, params: HttpParams): Observable<any> {
    return this.http
      .delete<any>(`${ApiNodeJs}${rutaApi}`, {
        params,
        headers: this.httpOptions.headers,
      })
      .pipe(tap((data) => of(data)));
  }

  /**
   * Realiza paticion http de tipo PUT
   * @param urlApi url del backend
   * @param body data a enviar
   */
  public Put(
    body: any,
    rutaApi: string = '',
    opcion: string = 'node'
  ): Observable<any> {
    const APIREST = this.apiRest(rutaApi, opcion);
    return this.http
      .put(APIREST, JSON.stringify(body), this.httpOptions)
      .pipe(tap((data) => of(data)));
  }

  public PutParams(rutaApi: string, params: HttpParams): Observable<any> {
    const APIREST = `${ApiNodeJs}${rutaApi}`;
    return this.http
      .put<any>(APIREST, null, { params, headers: this.httpOptions.headers })
      .pipe(
        tap((resp) => {
          of(resp);
        })
      );
  }

  /**
   * Realiza paticion http de tipo PUT
   * @param urlApi url del backend
   * @param body data a enviar
   */
  public PutFormData(
    body: any,
    rutaApi: string = '',
    opcion: string = 'node'
  ): Observable<any> {
    const APIREST = this.apiRest(rutaApi, opcion);
    return this.http.put(APIREST, body).pipe(tap((data) => of(data)));
  }

  /**
   * Para el manejo de errores
   * @param error error generado
   */
  private handleError(error: HttpErrorResponse) {
    return throwError('Ups algo paso...');
  }

  private apiRest(rutaApi: string, opcion: any) {
    const api = ApiNodeJs;
    const apiRest = `${api}${rutaApi}`;
    return apiRest;
  }
}
