import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { ProjectComponent } from './project.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SingleBoardViewComponent } from './single-board-view/single-board-view.component';
import { SettingsComponent } from './settings/settings.component';
import { BoardComponent } from './board/board.component';
import { MyProjectTaskComponent } from './my-project-task/my-project-task.component';
import { MyTaskComponent } from './my-task/my-task.component';

const routes: Routes = [
  { path: '', redirectTo:'/tools/project/my-projects', pathMatch: 'full'},
  {
    path: '', component: ProjectComponent,
    children:[
      {path: 'my-projects', component: MyProjectsComponent},
      {path: 'all-projects', component: AllProjectsComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'schedule/:id', component: ScheduleComponent},
      {path: 'single-board-view/:id', component: SingleBoardViewComponent},
      {path: 'board/:id', component: BoardComponent},
      {path: 'my-project-task', component: MyProjectTaskComponent},
      {path: 'my-task', component: MyTaskComponent},
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
