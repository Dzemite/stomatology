import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnkoComponent } from './components/onko/onko.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { ReportListComponent } from './components/report/report-list/report-list.component';
import { ReportComponent } from './components/report/report.component';

const routes: Routes = [
  {
    path: 'patients/list',
    component: PatientsListComponent
  },
  {
    path: 'patient/:id',
    component: OnkoComponent
  },
  {
    path: 'reports/list',
    component: ReportListComponent
  },
  {
    path: 'report/:id',
    component: ReportComponent
  },
  {
    path: 'patient/5c06a18a915a4cb6dbec9779/:id',
    component: OnkoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
