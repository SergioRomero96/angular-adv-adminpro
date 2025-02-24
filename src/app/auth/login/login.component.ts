import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  auth2: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone
  ) {
    this.loginForm = fb.group({
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    })
  }

  ngOnInit(): void {
    this.renderButton();
  }


  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.usuarioService.login(this.loginForm.value)
        .subscribe(resp => {
          if (this.f.remember.value) {
            localStorage.setItem('email', this.f.email.value);
          } else {
            localStorage.removeItem('email');
          }
          this.router.navigateByUrl('/');
          console.log(resp);
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        })
    }
  }


  /* onSuccess(googleUser) {
    //console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    let id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
  }

  onFailure(error) {
    console.log(error);
  } */

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  }

  //function() modifican el this. () => no
  async startApp() {
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.usuarioService.loginGoogle(id_token).subscribe(resp => {
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          });
        });

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  get f() {
    return this.loginForm.controls;
  }
}
