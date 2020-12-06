import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Hospital } from '../../../../models/hospital';
import { Medico } from '../../../../models/medico';
import { HospitalService } from '../../../../services/hospital.service';
import { MedicoService } from '../../../../services/medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.scss']
})
export class MedicoComponent implements OnInit {
  medicoForm: FormGroup;
  hospitales: Hospital[];
  hospitalSelected: Hospital;
  medicoSelected: Medico;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.medicoForm = fb.group({
      nombre: ['', [Validators.required]],
      hospital: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.getMedicoById(id);
    })

    this.getHospitales();

    this.medicoForm.get('hospital').valueChanges.subscribe(hospitalId => {
      this.hospitalSelected = this.hospitales.find(h => h._id === hospitalId);
    })
  }

  getMedicoById(id: string) {
    if (id) {
      this.medicoService.getMedicoById(id)
        .pipe(delay(1000))
        .subscribe(resp => {
          this.medicoSelected = resp.medico;
          const { nombre, hospital: { _id } } = this.medicoSelected;
          this.medicoForm.setValue({
            nombre, hospital: _id
          })
          console.log(resp);
        })
    }
  }

  getHospitales() {
    this.hospitalService.getHospitales()
      .subscribe(resp => {
        this.hospitales = resp.hospitales
        console.log(resp);
      })
  }

  save() {
    const medico = new Medico(this.medicoForm.value);
    if (!this.medicoSelected) {
      this.medicoService.createMedico(medico).subscribe(resp => {
        console.log(resp);
        Swal.fire('Creado', `${medico.nombre} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/medicos/edit/${resp.medico._id}`)
      });
    } else {
      this.medicoService.updateMedico(this.medicoSelected._id, medico).subscribe(resp => {
        Swal.fire('Actualizado', `${medico.nombre} actualizado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/medicos`);
      })
    }

  }

  get f() {
    return this.medicoForm.controls;
  }
}
