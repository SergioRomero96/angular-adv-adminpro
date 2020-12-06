import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Medico } from '../models/medico';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class MedicoService {
    constructor(private http: HttpClient) { }

    getMedicos(): Observable<any> {
        return this.http.get(`${base_url}/medicos`);
    }

    getMedicoById(id: string): Observable<any> {
        return this.http.get(`${base_url}/medicos/${id}`);
    }

    createMedico(medico: Medico): Observable<any> {
        return this.http.post(`${base_url}/medicos`, medico);;
    }

    updateMedico(id: string, medico: Medico): Observable<any> {
        return this.http.put(`${base_url}/medicos/${id}`, medico);;
    }

    deleteMedico(id: string): Observable<any> {
        return this.http.delete(`${base_url}/medicos/${id}`);;
    }

}