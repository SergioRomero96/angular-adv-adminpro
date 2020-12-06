import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CollectionType } from '../models/types/entity-types';
import { Usuario } from '../models/usuario';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(private http: HttpClient) { }

  get token(): string {
    const token = localStorage.getItem('token') || '';
    return token;
  }

  get headers() {
    return {
      headers: new HttpHeaders({
        'x-token': this.token
      })
    }
  }

  search(type: CollectionType, term: string = '') {
    return this.http.get<any>(`${base_url}/todo/coleccion/${type}/${term}`)
      .pipe(
        map(resp => {
          switch (type) {
            case 'usuarios': return this.buildUsers(resp.resultados);
            default: return resp;
          }
        })
      );
  }

  private buildUsers(result: any[]): Usuario[] {
    return result.map(user => new Usuario(user));
  }
}
