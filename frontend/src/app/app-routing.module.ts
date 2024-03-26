import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

// dashboard component inport



const routes: Routes = [

  {path: '', redirectTo:'login', pathMatch: 'full'},
  {path: 'login', component:LoginComponent},
  {path: 'forgot-password', component:ForgotPasswordComponent},
  {path: 'reset-password/:id', component:ResetPasswordComponent},

  { path: 'tools', loadChildren: () => import('./tools/tools.module').then(m => m.ToolsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
