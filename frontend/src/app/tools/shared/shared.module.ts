import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// material imports


import { A11yModule } from '@angular/cdk/a11y';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';



import { ProjectCardComponent } from './card/project-card/project-card.component';


import { FabButtonComponent } from './button/fab-button/fab-button.component';

import { ProjectSidebarComponent } from './sidebar/project-sidebar/project-sidebar.component';
import { EmployeeSidebarComponent } from './sidebar/employee-sidebar/employee-sidebar.component';


import { DeleteConfirmationDialogComponent } from './dialog/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EditDetailsProjectDialogComponent } from './dialog/edit-details-project-dialog/edit-details-project-dialog.component';
import { ViewDetailsProjectDialogComponent } from './dialog/view-details-project-dialog/view-details-project-dialog.component';
import { CreateEditTaskDialogComponent } from './dialog/create-edit-task-dialog/create-edit-task-dialog.component';

import { UploadRnrFileComponent } from './dialog/upload-rnr-file/upload-rnr-file.component';
import { AssignTaskToEngineersComponent } from './dialog/assign-task-to-engineers/assign-task-to-engineers.component';
import { AddEmployeeComponent } from './dialog/add-employee/add-employee.component';
import { AddMemberDialogComponent } from './dialog/add-member-dialog/add-member-dialog.component';
import { UpdateProjectComponent } from './dialog/update-project/update-project.component';


import { CreateRolePriorityTechComponent } from './dialog/create-role-priority-tech/create-role-priority-tech.component';
import { UpdateRolePriorityTechComponent } from './dialog/update-role-priority-tech/update-role-priority-tech.component';
import { UpdateTaskComponent } from './dialog/update-task/update-task.component';
import { UpdateEmployeeDialogComponent } from './dialog/update-employee-dialog/update-employee-dialog.component';
import { DeleteConfirmDialogEmpModuleComponent } from './dialog/delete-confirm-dialog-emp-module/delete-confirm-dialog-emp-module.component';
import { ViewTaskDetialsDialogComponent } from './dialog/view-task-detials-dialog/view-task-detials-dialog.component';
import { CreateEmpSettingComponentDialogComponent } from './dialog/create-emp-setting-component-dialog/create-emp-setting-component-dialog.component';
import { UpdateEmpSettingComponentDialogComponent } from './dialog/update-emp-setting-component-dialog/update-emp-setting-component-dialog.component';
import { AddTaskMemberDialogComponent } from './dialog/add-task-member-dialog/add-task-member-dialog.component';
import { AddProjectMemberDialogComponent } from './dialog/add-project-member-dialog/add-project-member-dialog.component';
import { ShowEmployeeDetailsComponent } from './dialog/show-employee-details/show-employee-details.component';
import { CreateNewProjectDialogComponent } from './dialog/create-new-project-dialog/create-new-project-dialog.component';
import { EditProjectInfoDialogComponent } from './dialog/edit-project-info-dialog/edit-project-info-dialog.component';





@NgModule({
  declarations: [
   
    ProjectCardComponent,
   
    
    FabButtonComponent,
    
    ProjectSidebarComponent,
    
    EmployeeSidebarComponent,
    
   
    DeleteConfirmationDialogComponent,
    EditDetailsProjectDialogComponent,
    ViewDetailsProjectDialogComponent,
    
    CreateEditTaskDialogComponent,
    
    UploadRnrFileComponent,
    AssignTaskToEngineersComponent,
   
    AddEmployeeComponent,
    AddMemberDialogComponent,
    UpdateProjectComponent,
   
   
    
    CreateRolePriorityTechComponent,
    UpdateRolePriorityTechComponent,
    UpdateTaskComponent,
    UpdateEmployeeDialogComponent,
    DeleteConfirmDialogEmpModuleComponent,
   
    ViewTaskDetialsDialogComponent,
    CreateEmpSettingComponentDialogComponent,
    UpdateEmpSettingComponentDialogComponent,
    AddTaskMemberDialogComponent,
    AddProjectMemberDialogComponent,
    ShowEmployeeDetailsComponent,
    CreateNewProjectDialogComponent,
    EditProjectInfoDialogComponent,
    
    
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    // * MATERIAL IMPORTS
    A11yModule,
    CdkAccordionModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule
  ],
  exports: [
    
    ProjectCardComponent,
    FabButtonComponent,
    ProjectSidebarComponent,
    EmployeeSidebarComponent,
    DeleteConfirmationDialogComponent,
    EditDetailsProjectDialogComponent,
    ViewDetailsProjectDialogComponent,
    CreateEditTaskDialogComponent,
    UploadRnrFileComponent,
    AssignTaskToEngineersComponent,
    AddEmployeeComponent,
    UpdateProjectComponent,
    CreateRolePriorityTechComponent,
    AddProjectMemberDialogComponent,
    CreateNewProjectDialogComponent,
    EditProjectInfoDialogComponent
  ]
})
export class SharedModule { }
