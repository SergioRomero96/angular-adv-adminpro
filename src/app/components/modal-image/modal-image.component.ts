import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.scss']
})
export class ModalImageComponent implements OnInit {
  user: Usuario;
  imagenSubir: File;
  imgTemp: any = null;

  constructor(
    public modalImageService: ModalImageService,
    public fileUploadService:FileUploadService
    ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.imgTemp = null;
    this.modalImageService.closeModal();
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
    const id = this.modalImageService.id;
    const tipo = this.modalImageService.tipo;

    this.fileUploadService.updatePhoto(this.imagenSubir, tipo, id)
      .then(img => {
        Swal.fire('Guardado', 'Imagen actualizada', 'success');
        this.modalImageService.newImage.emit(img);
        this.closeModal();
      }).catch(err => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }

}
