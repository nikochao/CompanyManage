import { environment } from './../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DepartmentModal } from 'src/app/home/modal/DepartmentModal';

@Injectable()
export class DepartmentService {
  mainUrl=environment.apiUrl;

  constructor(public http: HttpClient) {
  }

  getAllDepartment(): Observable<DepartmentModal[]> {
    return this.http.get<DepartmentModal[]>(`${this.mainUrl}/department`);
  }
  CreateDepartmentData(department:DepartmentModal){
    return this.http.post<DepartmentModal>(`${this.mainUrl}/department`,department);
  }
  // updateDepartmentData(id:string, department:DepartmentModal){
  //   return this.http.put<DepartmentModal>(`${this.mainUrl}/department/${id}`, department);
  // }
  // deleteDepartmentData(id:string){
  //   return this.http.delete<DepartmentModal>(`${this.mainUrl}/department/${id}`);
  // }
  
  
}