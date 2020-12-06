import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico/medico.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate:[AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' } },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' } },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesa' } },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rjxs' } },
      { path: 'profile', component:ProfileComponent, data: {titulo: 'Perfil de usuario'}},

      //Mantenimientos
      {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento de Usuarios'}},
      {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de Hospitales'}},
      {path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de Medicos'}},
      {path: 'medicos/nuevo', component: MedicoComponent, data: {titulo: 'Mantenimiento de Medicos'}},
      {path: 'medicos/edit/:id', component: MedicoComponent, data: {titulo: 'Mantenimiento de Medicos'}}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
