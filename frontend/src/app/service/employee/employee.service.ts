import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Names } from 'src/app/enum/names';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // access_token = this.cookieService.get('access_token');
  access_token = sessionStorage.getItem('access_token');

  base_url = Names.db_name;
  
  get_all_emp_url = `${this.base_url}/api/routes/employee/user/showAllEmployees`;


  update_emp_url =`${this.base_url}/api/users/updateUser`;
  delete_emp_url = `${this.base_url}/api/users/deleteUser`;


  show_all_emp_url = `${this.base_url}/api/users/showActiveUsers`;
  show_all_designation_url = `${this.base_url}/api/designation/showActiveDesignations`;
  show_all_department_url =  `${this.base_url}/api/department/showActiveDepartments`;
  show_all_technology_url =  `${this.base_url}/api/technology/showActiveTechnologys`;
  show_all_access_url =  `${this.base_url}/api/access/showActiveAccesses`;

  create_emp_designation_url = `${this.base_url}/api/designation/createDesignation`;
  create_emp_department_url = `${this.base_url}/api/department/createDepartment`;
  create_emp_technology_url = `${this.base_url}/api/technology/createTechnology`;
  create_emp_access_url = `${this.base_url}/api/access/createAccess`;

  delete_emp_access_url = `${this.base_url}/api/access/deleteAccess`;
  delete_emp_designation_url = `${this.base_url}/api/designation/deleteDesignation`;
  delete_emp_department_url = `${this.base_url}/api/department/deleteDepartment`;
  delete_emp_technology_url = `${this.base_url}/api/technology/deleteTechnology`;


  create_emp_url =  `${this.base_url}/api/users/createUser`;
  show_emp_profile_url = `${this.base_url}/api/users/showUser`;
  
  create_designation_url =  `${this.base_url}/api/designation/createDesignation`;
  create_department_url =  `${this.base_url}/api/department/createDepartment`;
  create_technology_url = `${this.base_url}/api/technology/createTechnology`;
  create_access_url = `${this.base_url}/api/access/createAccess`;


  update_designation_url = `${this.base_url}/api/designation/updateDesignation`;
  update_department_url = `${this.base_url}/api/department/updateDepartment`;
  update_technology_url = `${this.base_url}/api/technology/updateTechnology`;
  update_access_url = `${this.base_url}/api/access/updateAccess`;

  constructor(private http:HttpClient ) { }

  

  get_all_employee(data: any) {
    return this.http.post<any>(this.get_all_emp_url, data);
  }
  show_all_dept(data: any){
    return this.http.post<any>(this.show_all_department_url, data);
  }
  delete_employee(data: any){
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.delete_emp_url, data, {headers: httpHeaders});
  }



  update_employee(data: any){
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.update_emp_url, data, {headers: httpHeaders});
  }


  show_all_emp(data: any){
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.show_all_emp_url, data, {headers: httpHeaders});
  }
  
  show_all_designation(data: any){
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.show_all_designation_url, data, {headers: httpHeaders});
  }
  delete_emp_designation(data: any){
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.delete_emp_designation_url, data, {headers: httpHeaders});
  }

  show_all_department(data: any){
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.show_all_department_url, data, {headers: httpHeaders});
  }
  delete_emp_department(data: any){
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.delete_emp_department_url, data, {headers: httpHeaders});
  }
  show_all_technology(data: any){
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.show_all_technology_url, data, {headers: httpHeaders});
  }
  delete_emp_technology(data: any){
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.delete_emp_technology_url, data, {headers: httpHeaders});
  }

  show_all_access(data: any){
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.show_all_access_url, data, {headers: httpHeaders});
  }
  delete_emp_access(data: any){
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.delete_emp_access_url, data, {headers: httpHeaders});
  }

  create_emp(data: any){
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.create_emp_url, data, {headers: httpHeaders});
  }

  show_emp_profile(data: any){
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.show_emp_profile_url, data, {headers: httpHeaders});
  }

  create_designation(data: any){
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.create_designation_url, data, {headers: httpHeaders});
  }
  create_department(data: any){
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.create_department_url, data, {headers: httpHeaders});
  }
  create_technology(data: any){
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.create_technology_url, data, {headers: httpHeaders});
  }
  create_access(data: any){
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.create_access_url, data, {headers: httpHeaders});
  }

  update_designation(data: any){
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.update_designation_url, data, {headers: httpHeaders});
  }

  update_department(data: any){
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.update_department_url, data, {headers: httpHeaders});
  }
  update_technology(data: any){
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.update_technology_url, data, {headers: httpHeaders});
  }
  update_access(data: any){
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.update_access_url, data, {headers: httpHeaders});
  }


  


}
