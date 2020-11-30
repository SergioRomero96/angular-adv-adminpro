import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  perfilForm: FormGroup;
  usuario: Usuario;
  imagenSubir: File;
  imgTemp: any = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    this.perfilForm = fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm.patchValue(this.usuario);
  }

  updateProfile() {
    this.usuarioService.updateProfile(this.perfilForm.value)
      .subscribe(resp => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
        console.log(resp);
      }, err => {
        Swal.fire('Error', err.error.msg, 'error');
      })
  }

  changeImage(file: File) {
    this.imagenSubir = file;

    if (!file) {
      return this.imgTemp = null;
    };

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  uploadImage() {
    this.fileUploadService.updatePhoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then(img => {
        this.usuario.img = img;
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch(err => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }

}
