import { Injectable } from "@angular/core";
import {BehaviorSubject} from 'rxjs';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Names } from 'src/app/enum/names';


@Injectable({
    providedIn: 'root',
})

export class kanbanBoardService{

    base_url = Names.db_name;

    
    access_token = sessionStorage.getItem('access_token');

    get_project_state_url = `${this.base_url}/api/state/showActiveState`;
    delete_task_member_url = `${this.base_url}/api/task/deleteTaskMember`;
    
    constructor(private http:HttpClient) { }
  

    get_project_state$(data:any) {
        const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
        return this.http.post<any>(this.get_project_state_url, data, {headers: httpHeaders});
    }

    delete_task_member(data:any) {
        const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
        return this.http.post<any>(this.delete_task_member_url, data, {headers: httpHeaders});
    }
    
}