import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  imgUrl = '';
  usuario:Usuario;

  constructor(
    private usuarioService:UsuarioService,
    private router:Router
  ) {
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
  }

  logout(){
    this.usuarioService.logout();
  }

  search(term: string){
    console.log(term);
    if(!term) return;
    this.router.navigateByUrl(`/dashboard/buscar/${term}`);
  }
}
