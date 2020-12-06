import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Medico } from '../../../models/medico';
import { BusquedaService } from '../../../services/busqueda.service';
import { MedicoService } from '../../../services/medico.service';
import { ModalImageService } from '../../../services/modal-image.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss']
})
export class MedicosComponent implements OnInit {
  loading = true;
  medicos: Medico[];
  term = new FormControl();
  private imgSubscription: Subscription;

  constructor(
    private medicoService:MedicoService,
    private modalImageService:ModalImageService,
    private busquedaService:BusquedaService
  ) { }

  ngOnInit(): void {
    this.getMedicos();

    this.imgSubscription = this.modalImageService.newImage
      .pipe(delay(500))
      .subscribe(img => this.getMedicos());

      this.term.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((term: any) => {
          if (term)
            return this.busquedaService.search('medicos', term);
          else
            return this.medicoService.getMedicos();
        })
      ).subscribe(resp => {
        console.log(resp);
        this.medicos = resp.medicos || resp.resultados;
      })
  }

  getMedicos() {
    this.medicoService.getMedicos().subscribe(resp => {
      console.log(resp);
      this.medicos = resp.medicos;
      this.loading = false;
    })
  }

  createMedico(){

  }
  

  editMedico(medico: Medico) {
    this.medicoService.updateMedico(medico._id, medico)
      .subscribe(resp => {
        console.log(resp);
        Swal.fire('Actualizado', medico.nombre, 'success');
      });
  }

  deleteMedico(medico: Medico) {
    this.medicoService.deleteMedico(medico._id)
      .subscribe(resp => {
        const index = this.medicos.indexOf(medico);
        this.medicos.splice(index, 1);
        Swal.fire('Eliminado', medico.nombre, 'success');
      })
  }

  showModal(medico: Medico) {
    this.modalImageService.openModal('medicos', medico._id, medico.img);
  }

}
