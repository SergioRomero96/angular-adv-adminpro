import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit, OnDestroy {
  totalUsers = 0;
  users: Usuario[] = [];
  usersTemp: Usuario[] = [];
  since = 0;
  loading = true;

  imgSupscription: Subscription;

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedaService,
    private modalService: ModalImageService
  ) { }


  ngOnDestroy(): void {
    this.imgSupscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsers();

    this.imgSupscription = this.modalService.newImage
      .pipe(delay(100))
      .subscribe(img => this.loadUsers());
  }

  loadUsers() {
    this.loading = true;
    this.usuarioService.loadUsers(this.since)
      .subscribe(resp => {
        this.users = resp.usuarios;
        this.usersTemp = resp.usuarios;
        this.totalUsers = resp.total;
        this.loading = false;
        console.log(resp);
      });
  }

  changePage(value: number) {
    this.since += value;

    if (this.since < 0) {
      this.since = 0;
    } else if (this.since > this.totalUsers) {
      this.since -= value;
    }

    this.loadUsers();
  }

  search(term: string) {
    if (term.length === 0) {
      return this.users = this.usersTemp;
    }
    this.busquedaService.search('usuarios', term).subscribe(resp => {
      this.users = resp;
    })
  }

  deleteUser(user: Usuario) {
    if (user.uid === this.usuarioService.uid) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

    Swal.fire({
      title: 'Borrar usuario?',
      text: `Esta a punto de borrar a ${user.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUser(user).subscribe(resp => {
          console.log(resp);
          //let index = this.users.indexOf(user);
          //this.users.splice(index, 1);
          Swal.fire(
            'Usuario eliminado!',
            `${user.nombre} fue eliminado correctamente`,
            'success'
          );

          this.loadUsers();
        })

      }
    })
  }

  changeRole(user: Usuario) {
    this.usuarioService.saveUser(user)
      .subscribe(resp => {
        console.log(resp);
      })
  }

  openModal(user: Usuario) {
    console.log(user);
    this.modalService.openModal("usuarios", user.uid, user.img);
  }

}
