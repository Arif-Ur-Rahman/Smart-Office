import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Names } from 'src/app/enum/names';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  base_url = Names.db_name;
  
  // access_token = this.cookieService.get('access_token');
  access_token = sessionStorage.getItem('access_token');

  show_all_priority_url1 = `${this.base_url}/api/priorities/showActivePriorities`;

  show_all_project_url = `${this.base_url}/api/project/showActiveProject`;
  // my_project_url = `${this.base_url}/api/project/showIndividualProject`;
  my_project_url = `${this.base_url}/api/project/showIndividualProjectDetailsofEmployee`;
  delete_project_url = `${this.base_url}/api/project/deleteProject`;
  create_project_url = `${this.base_url}/api/project/createProject`;
  update_project_url = `${this.base_url}/api/project/updateProject`;
  
  show_all_role_url = `${this.base_url}/api/roles/showActiveRoles`;
  show_all_priority_url = `${this.base_url}/api/priorities/showActivePrioritiess`;
  show_all_technology_url = `${this.base_url}/api/technology/showActiveTechnologys`;
  
  delete_role_url = `${this.base_url}/api/roles/deleteRole`;
  delete_technology_url = `${this.base_url}/api/technology/deleteTechnology`;
  delete_priority_url = `${this.base_url}/api/priorities/deletePriority`;
  delete_dificulty_url = `${this.base_url}/api/difficultylevel/deleteDifficultyLevel`;
  
  add_role_url = `${this.base_url}/api/roles/createRole`;
  add_priority_url = `${this.base_url}/api/priorities/createPriority`;
  add_tech_url = `${this.base_url}/api/technology/createTechnology`;
  add_dificulty_url = `${this.base_url}/api/difficultylevel/createDifficultyLevel`;
  
  update_role_url = `${this.base_url}/api/roles/updateRole`;
  update_priority_url = `${this.base_url}/api/priorities/updatePriority`;
  update_tech_url = `${this.base_url}/api/technology/updateTechnology`;
  update_dificulty_url = `${this.base_url}/api/difficultylevel/updateDifficultyLevel`;
  
  show_status_url = `${this.base_url}/api/status/showActiveStatus`;
  add_member_url =  `${this.base_url}/api/members/addMember`;
  delete_member_url =  `${this.base_url}/api/members/deleteMember`;
  show_deficulties_url =  `${this.base_url}/api/difficultylevel/showActiveDifficultyLevels`;


  delete_task_url =  `${this.base_url}/api/task/deleteTask`;
  create_task_url =  `${this.base_url}/api/task/createTask`;
  update_task_url =  `${this.base_url}/api/task/updateTask`;
  show_task_details_url =  `${this.base_url}/api/task/showTaskDetails`;
  show_all_task_ofSingleEmp_url =  `${this.base_url}/api/task/showTaskByTheEmployee`;
  export_xlsx_url = `${this.base_url}/api/task/IndividualProjectXlxsDownload`;


  move_task_url =  `${this.base_url}/api/task/changeTaskPosition`;
  add_task_member_url =  `${this.base_url}/api/task/addTaskMember`;

  show_project_new_tasks_url =  `${this.base_url}/api/task/taskStatusNew`;
  show_project_backlog_tasks_url =  `${this.base_url}/api/task/taskStateBacklog`;
  show_project_ready_tasks_url =  `${this.base_url}/api/task/taskStateReady`;
  show_project_InProgress_tasks_url =  `${this.base_url}/api/task/taskStateInProgress`;
  show_project_InReview_tasks_url =  `${this.base_url}/api/task/taskStateInReview`;
  show_project_done_tasks_url =  `${this.base_url}/api/task/taskStateDone`;
  moves_task_url =  `${this.base_url}/api/task/moveTask`;

 show_single_project_info_url =  `${this.base_url}/api/project/showProjectDetails`;

 show_task_under_project_url = `${this.base_url}/api/task/showTaskUnderProject`;


  
  constructor(
    private http:HttpClient) { }

  show_all_role(data:any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token)
    return this.http.post<any>(this.show_all_role_url, data, {headers: httpHeaders});
  }

  show_Priorities(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.show_all_priority_url1, data, {headers: httpHeaders});
  }

  show_all_technology(data:any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.show_all_technology_url, data, {headers: httpHeaders});
  }

  delete_Role(data:any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.delete_role_url, data, {headers: httpHeaders});
  }

  delete_Priority(data:any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.delete_priority_url, data, {headers: httpHeaders});
  }

  delete_Technology(data:any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.delete_technology_url, data, {headers: httpHeaders});
  }

  delete_dificulty(data:any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.delete_dificulty_url, data, {headers: httpHeaders});
  }


  add_Role(data:any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.add_role_url, data, {headers: httpHeaders});
  }

  add_Priority(data:any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.add_priority_url, data, {headers: httpHeaders});
  }

  add_Tech(data:any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.add_tech_url, data, {headers: httpHeaders});
  }

  add_dificulty(data:any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.add_dificulty_url, data, {headers: httpHeaders});
  }


  update_Role(data:any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.update_role_url, data, {headers: httpHeaders});
  }

  update_Priority(data:any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.update_priority_url, data, {headers: httpHeaders});
  }

  update_Tech(data:any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.update_tech_url, data, {headers: httpHeaders});
  }

  update_dificulty(data:any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.update_dificulty_url, data, {headers: httpHeaders});
  }



  show_status(data:any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.show_status_url, data, {headers: httpHeaders});
  }


  show_all_project(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.show_all_project_url, data, {headers: httpHeaders});
  }

  show_my_project(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.my_project_url, data, {headers: httpHeaders});
  }


  delete_project(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.delete_project_url, data, {headers: httpHeaders});
  }
  
  create_project(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.create_project_url, data, {headers: httpHeaders});
  }

  update_project(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.update_project_url, data, {headers: httpHeaders});
  }

  add_member(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.add_member_url, data, {headers: httpHeaders});
  }
  
  delete_member(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.delete_member_url, data, {headers: httpHeaders});
  }

  show_deficulties(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.show_deficulties_url, data, {headers: httpHeaders});
  }


  delete_task(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.delete_task_url, data, {headers: httpHeaders});
  }

  create_task(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.create_task_url, data, {headers: httpHeaders});
  }

  update_task(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.update_task_url, data, {headers: httpHeaders});
  }


  move_task(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.move_task_url, data, {headers: httpHeaders});
  }
  
  add_task_member(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.add_task_member_url, data, {headers: httpHeaders});
  }

  show_task_details(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.show_task_details_url, data, {headers: httpHeaders});
  }


  show_all_task_ofSingleEmp(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.show_all_task_ofSingleEmp_url, data, {headers: httpHeaders});
  }

  export_xlsx(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.show_task_under_project_url, data, {headers: httpHeaders});
  }
  

  show_project_new_tasks(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.show_project_new_tasks_url, data, {headers: httpHeaders});
  }

  show_project_backlog_tasks(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.show_project_backlog_tasks_url, data, {headers: httpHeaders});
  }

  show_project_ready_tasks(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.show_project_ready_tasks_url, data, {headers: httpHeaders});
  }

  show_project_InProgress_tasks(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.show_project_InProgress_tasks_url, data, {headers: httpHeaders});
  }

  show_project_InReview_tasks(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.show_project_InReview_tasks_url, data, {headers: httpHeaders});
  }

  show_project_done_tasks(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.show_project_done_tasks_url, data, {headers: httpHeaders});
  }

  moves_task(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.moves_task_url, data, {headers: httpHeaders});
  }

  show_single_project_info(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.show_single_project_info_url, data, {headers: httpHeaders});
  }

  show_task_under_project_info(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.show_task_under_project_url, data, {headers: httpHeaders});
  }
  

}
