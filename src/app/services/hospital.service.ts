import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http:HttpClient) { }

  getHospitales():Observable<any>{
    return this.http.get(`${base_url}/hospitales`);
  }

  createHospital(hospital: Hospital): Observable<any>{
    return this.http.post(`${base_url}/hospitales`, hospital);
  }

  updateHospital(id: string, hospital:Hospital): Observable<any>{
    return this.http.put(`${base_url}/hospitales/${id}`, hospital);
  }

  deleteHospital(id: string):Observable<any>{
    return this.http.delete(`${base_url}/hospitales/${id}`);
  }
}
