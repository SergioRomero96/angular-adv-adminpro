import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';
import { BusquedaService } from '../../../services/busqueda.service';
import { ModalImageService } from '../../../services/modal-image.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.scss']
})
export class HospitalesComponent implements OnInit, OnDestroy {
  loading = true;
  hospitals: Hospital[];
  term = new FormControl();

  @ViewChild('txtTerm') input: ElementRef;

  private imgSubscription: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImageService: ModalImageService,
    private busquedaService: BusquedaService
  ) { }
  ngOnDestroy(): void {
    this.imgSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getHospitales();

    this.imgSubscription = this.modalImageService.newImage
      .pipe(delay(1000))
      .subscribe(img => this.getHospitales());

    this.term.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((term: any) => {
          if (term)
            return this.busquedaService.search('hospitales', term);
          else
            return this.hospitalService.getHospitales();
        })
      ).subscribe(resp => {
        console.log(resp);
        this.hospitals = resp.hospitales || resp.resultados;
      })
  }


  getHospitales() {
    this.hospitalService.getHospitales().subscribe(resp => {
      console.log(resp);
      this.hospitals = resp.hospitales;
      this.loading = false;
    })
  }

  async createHospital() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      input: 'text',
      inputLabel: 'Nombre del hospital',
      inputPlaceholder: 'Ingresa el nombre del hospital',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Nombre del hospital es requerido'
        }
      }
    });

    if (value.trim().length > 0) {
      this.hospitalService.createHospital({ nombre: value })
        .subscribe(resp => {
          console.log(resp);
          this.hospitals.push(resp.hospital);
          Swal.fire('Agregado', 'Hospital agregado correctamente', 'success');
        })
    }
  }

  editHospital(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital._id, hospital)
      .subscribe(resp => {
        console.log(resp);
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.deleteHospital(hospital._id)
      .subscribe(resp => {
        const index = this.hospitals.indexOf(hospital);
        this.hospitals.splice(index, 1);
        Swal.fire('Eliminado', hospital.nombre, 'success');
      })
  }

  showModal(hospital: Hospital) {
    this.modalImageService.openModal('hospitales', hospital._id, hospital.img);
  }

}
