import { DepartmentService } from './../../providers/department-service';
import { Component, OnInit } from '@angular/core';
import { PeopleModal } from '../home/modal/PeopleModal';
import { PeopleService } from './../../providers/people-service';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentModal } from '../home/modal/DepartmentModal';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  people='';
  peopleList:PeopleModal[]=[];
  departmentList:DepartmentModal[]=[];
  department_name='';
  option:"all";

  constructor(public peopleService:PeopleService, public departmentService:DepartmentService, private changeDetectorRef: ChangeDetectorRef, public ac:ActivatedRoute,
    public router:Router){
    this.getPeople();
    this.getDepartment();
   
  }
  
  ngOnInit():void{
    this.ac.queryParams.subscribe((queryParams) => {
      if(this.ac.snapshot.queryParams['user']){  
        this.peopleList = JSON.parse(queryParams['user']);
        this.getPeople();
      };
    }
    
    )
  
  }
 
  getPeople(){
    this.peopleService.getAllData().subscribe((res)=>{//!!!!!
      this.peopleList=res;
      console.log('detect!');
      // this.peopleList.forEach(ele=>{
      //   console.log(ele.department.id);
      // })
    });
  }

  getPersonId(choose:PeopleModal){
    // console.log(this.peopleList.find(function(item){
    //   return item.id==choose.id
    // }));
    // console.log(choose.id);
    
    this.router.navigate(['people'],
      {queryParams:{user: JSON.stringify(choose)},skipLocationChange:false});
  }

  transfer_to_home(){
    this.router.navigate(['home']);
  }
  edit(choose:PeopleModal){
    this.router.navigate(['home'],
    {queryParams:{user:JSON.stringify(choose)}}
    );

  }
  delete(choose:PeopleModal){
    this.peopleService.deletePersonData(choose.id).subscribe((res)=>{
      console.log("Delete Succcessful");
      
      this.getPeople();

    })
  }
  CreateDepartment(){
    this.department_name=prompt("請問要建立的部門名字是什麼?")
    const data:DepartmentModal={
      name: this.department_name,
      // job: this.job
      };
    this.departmentService.CreateDepartmentData(data).subscribe(data=>{
      console.log("Create Successful")
      this.getDepartment();

    }
      )
  }
  getDepartment(){
    this.departmentService.getAllDepartment().subscribe(data=>{
      console.log(data);
      this.departmentList=data;
    })
  }
  department_filter(){
    console.log(this.option)
    if(this.option=='all'){
      this.getPeople();
    }else{
    this.peopleService.getDepartmentEmployee(this.option).subscribe((res)=>{
        console.log(res);
        this.peopleList=res;
    })
  
  }
}

  
  


  }


