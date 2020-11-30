import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../models/interfaces/login-form';
import { RegisterForm } from '../models/interfaces/register-form';
import { Usuario } from '../models/usuario';

const base_url = environment.base_url;
declare const gapi: any;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  auth2: any;
  usuario: Usuario;
  

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token() {
    const token = localStorage.getItem('token') || '';
    return token;
  }

  googleInit() {
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '390738683987-pqrj31buoudc3i6klusoi67nhr3vpek8.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    })

  }

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validateToken(): Observable<boolean> {
    const httpOption = {
      headers: new HttpHeaders({
        'x-token': this.token
      })
    }

    return this.http.get(`${base_url}/login/renew`, httpOption).pipe(
      map((resp: any) => {
        console.log(resp);
        localStorage.setItem('token', resp.token);
        this.usuario = new Usuario(resp.usuario);
        if (!this.usuario.img) this.usuario.img = '';
        return true;
      }),
      catchError(err => of(false))
    );
  }

  createUser(formData: RegisterForm): Observable<any> {
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap(resp => {
          localStorage.setItem('token', resp.token)
        })
      );
  }

  updateProfile(data: any) {
    const httpOption = {
      headers: new HttpHeaders({
        'x-token': this.token
      })
    }

    data = {
      ...data,
      role: this.usuario.role
    }
    return this.http.put(`${base_url}/usuarios/${this.usuario.uid}`, data, httpOption);
  }

  login(formData: LoginForm): Observable<any> {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap(resp => {
          localStorage.setItem('token', resp.token)
        })
      );
  }

  loginGoogle(token): Observable<any> {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap(resp => {
          localStorage.setItem('token', resp.token)
        })
      );
  }
}
