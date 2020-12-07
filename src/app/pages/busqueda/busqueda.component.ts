import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from '../../models/hospital';
import { Medico } from '../../models/medico';
import { Usuario } from '../../models/usuario';
import { BusquedaService } from '../../services/busqueda.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {
  usuarios: Usuario[];
  hospitales: Hospital[];
  medicos: Medico[];

  constructor(
    private activedRoute:ActivatedRoute,
    private busquedaService:BusquedaService
  ) { }

  ngOnInit(): void {
    this.activedRoute.params.subscribe(params =>{
      let term = params['termino'];
      this.globalSearch(term);
    })
  }

  globalSearch(term: string){
    this.busquedaService.globalSearch(term).subscribe(resp =>{
      this.usuarios = resp.usuarios;
      this.hospitales = resp.hospitales;
      this.medicos = resp.medicos;
      console.log(resp);
    })
  }

}
