import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu = [];

  loadMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }

  // menu:any[] = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu:[
  //       {titulo: 'Main', url:'/'},
  //       {titulo: 'ProgressBar', url:'progress'},
  //       {titulo: 'Gráficas', url:'grafica1'},
  //       {titulo: 'Promesas', url:'promesas'},
  //       {titulo: 'rxjs', url:'rxjs'}
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu:[
  //       {titulo: 'Usuarios', url: 'usuarios'},
  //       {titulo: 'Hospitales', url: 'hospitales'},
  //       {titulo: 'Médicos', url: 'medicos'}
  //     ]
  //   }
  // ]

  constructor() { }
}
