import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';
import { ImagenPipe } from './pipes/imagen.pipe';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    NopagefoundComponent,
    ImagenPipe
  ],
  exports:[
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    NopagefoundComponent,
    ImagenPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
