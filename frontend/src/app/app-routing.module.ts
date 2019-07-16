import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StomComponent } from './components/stom/stom.component';
import { LoginComponent } from './components/login/login.component';
import { PatientsListComponent } from './components/stom/patients-list/patients-list.component';
import { PatientComponent } from './components/stom/patient/patient.component';
import { CreatePatientComponent } from './components/stom/create/create-patient/create-patient.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: StomComponent,
    // canActivate: [
    //   AuthGuard
    // ],
    children: [
      {
        path: 'data',
        children: [
          {
            path: 'patient/:id',
            component: PatientComponent
          },
          {
            path: 'patients/list',
            component: PatientsListComponent
          }
        ]
      },
      {
        path: 'create',
        children: [
          {
            path: 'patient',
            component: CreatePatientComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
