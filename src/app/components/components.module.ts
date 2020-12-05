import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { ChartsModule } from 'ng2-charts';
import { PruebaComponent } from './prueba/prueba.component';
import { ModalImageComponent } from './modal-image/modal-image.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    PruebaComponent,
    ModalImageComponent
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    PruebaComponent,
    ModalImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
