import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  //menuItems: any[];
  usuario:Usuario;

  constructor(
    public sidebarService:SidebarService,
    private usuarioService:UsuarioService
  ) { 
    //this.menuItems = sidebarService.menu;
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
