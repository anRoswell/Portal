import { BsModalService } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { environment, ApiNodeJs } from '../../environments/environment';
import { of, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  public apiUrl = ApiNodeJs;
  public httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  };
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  logout(): boolean {
    this.storageService.destroy('userLoginPortal');
    this.storageService.destroy('_token');
    this.modalService.hide();
    this.router.navigate(['/login']);
    
    return false;
  }

  updatePassword(id: number, password: string) {
    //return this.httpService.Put({ usrPassword: password }, `passmbusers/${id}`)
  }

  isAuth(): Promise<boolean> {
    // const result = await this.storageService.read('_token')
    const result = this.storageService.read('userLoginPortal');
    return result;
  }

  home() {
    const result = this.storageService.read('userLoginPortal');
    console.log(result);
    
    switch (result.usrTusrCodTipoUsuario) {
      case 1:
        this.router.navigate(['/dashboard']);
        break;
      case 2:
        this.router.navigate(['/soyproveedor']);
        break;
    }
  }

  private apiRest(rutaApi: string) {
    const api = ApiNodeJs;
    const apiRest = `${api}${rutaApi}`;
    return apiRest;
  }
}
