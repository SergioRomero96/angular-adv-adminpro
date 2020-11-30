import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({providedIn: 'root'})
export class FileUploadService {
    
    constructor() { }

    async updatePhoto(file: File, tipo: 'usuarios'|'medicos'|'hospitales', id: string){
        try {
            
            const url = `${base_url}/upload/${tipo}/${id}`;
            const formData = new FormData();
            formData.append('imagen', file);

            const resp = await fetch(url, {
                method: 'PUT',
                headers:{
                    'x-token': localStorage.getItem('token') || ''
                },
                body: formData
            });

            const data = await resp.json();

            if(data.ok){
                console.log(data);
                return data.nombreArchivo;
            }else{
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
}