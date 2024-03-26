import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ToolsComponent } from './tools.component';

const routes: Routes = [
  { path: '', redirectTo:'/tools/home', pathMatch: 'full'},
  { 
    path: '', component: ToolsComponent,
    
    children:[
      { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
      
      { path: 'project', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) },
    ]
  },
      
  { path: 'home', component: HomeComponent}  
      
  
  
  
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }
