import { AuthguardGuard } from './shared/guard/authguard.guard';
import { LoginComponent } from './component/auth/login/login.component';
import { ViewDoctorComponent } from './component/dashboard/doctor/view-doctor/view-doctor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './component/dashboard/patient/patient.component';
import { DoctorComponent } from './component/dashboard/doctor/doctor.component';
import { ViewPatientComponent } from './component/dashboard/patient/view-patient/view-patient.component';
import { CitasComponent } from './component/dashboard/citas/citas.component';
import { AppComponent } from './app.component'; 

const routes: Routes = [
  {path : '', redirectTo : 'login', pathMatch : 'full'},
  {path : 'dashboard', children :
  [
    {path : '', redirectTo: 'patient', pathMatch: 'full'},
    {path : 'patient', component: PatientComponent},
    {path : 'doctor', component: DoctorComponent},
    {path : 'doctor/:id', component: ViewDoctorComponent},
    {path : 'patient/:id', component: ViewPatientComponent},
    {path : 'citas' , component: CitasComponent},
    
  ], canActivate: [AuthguardGuard]},
  {path : 'login', component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
