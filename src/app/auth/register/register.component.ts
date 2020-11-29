import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private usuarioService: UsuarioService
  ) {
    this.registerForm = this.fb.group({
      nombre: ['test100', [Validators.required]],
      email: ['test100@gmail.com', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      terminos: [false, Validators.required]
    }, {
      validators: this.passwordsEquals('password', 'password2')
    })
  }

  ngOnInit(): void {
  }


  createUser() {
    this.submitted = true;
    if (this.registerForm.valid && this.f.terminos.value) {
      this.usuarioService.createUser(this.registerForm.value)
        .subscribe(resp => {
          console.log(resp);
          this.router.navigateByUrl('/');
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
    }
  }

  passwordsEquals(password: string, password2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(password);
      const pass2Control = formGroup.get(password2);
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEqual: true });
      }
    };
  }

  get f() {
    return this.registerForm.controls;
  }

}
