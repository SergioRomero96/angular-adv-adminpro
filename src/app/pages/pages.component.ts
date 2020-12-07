import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';

//Codigo declarado de manera global
declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    customInitFunctions();
    this.sidebarService.loadMenu();
  }

}
