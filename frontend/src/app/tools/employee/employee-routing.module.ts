import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllEmployeeComponent } from './all-employee/all-employee.component';

import { EmployeeComponent } from './employee.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo:'all-employee', pathMatch: 'full'},
  { 
    path: '', component: EmployeeComponent,
    children:[
      {path: 'all-employee', component: AllEmployeeComponent},
      {path: 'my-profile', component: MyProfileComponent},
      {path: 'employee-profile/:id', component: EmployeeProfileComponent},
      {path: 'settings', component: SettingsComponent},
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
