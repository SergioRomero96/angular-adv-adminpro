import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu:any[] = [
    {
      titulo: 'Principal',
      icono: 'mdi mid-gauge',
      submenu:[
        {titulo: 'Main', url:'/'},
        {titulo: 'ProgressBar', url:'progress'},
        {titulo: 'Gráficas', url:'grafica1'},
      ]
    }
  ]

  constructor() { }
}
