import { environment } from './../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PeopleModal } from 'src/app/home/modal/PeopleModal';

@Injectable()
export class PeopleService {
  mainUrl=environment.apiUrl;

  constructor(public http: HttpClient) {
  }

  getAllData(): Observable<PeopleModal[]> {
    return this.http.get<PeopleModal[]>(`${this.mainUrl}/employee`);
  }
  CreatePersonData(people:PeopleModal){
    return this.http.post<PeopleModal>(`${this.mainUrl}/employee`,people);
  }
  updatePersonData(id:string, people:PeopleModal){
    return this.http.put<PeopleModal>(`${this.mainUrl}/employee/${id}`, people);
  }
  deletePersonData(id:string){
    return this.http.delete<PeopleModal>(`${this.mainUrl}/employee/${id}`);
  }
  getDepartmentEmployee(id:string): Observable<PeopleModal[]> {
    return this.http.get<PeopleModal[]>(`${this.mainUrl}/employeedepartment/${id}`);
  }
  
}