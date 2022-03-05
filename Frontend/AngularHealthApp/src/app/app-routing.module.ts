import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientAddComponent } from './components/patient-add/patient-add.component';
import { PatientDetailComponent } from './components/patient-detail/patient-detail.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'patients', pathMatch: 'full' },
  { path: 'patients', component: PatientListComponent },
  { path: 'patients/:id', component: PatientDetailComponent },
  { path: 'patientsAdd', component: PatientAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
