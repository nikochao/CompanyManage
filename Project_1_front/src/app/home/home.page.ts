import { DepartmentModal } from './modal/DepartmentModal';
import { PeopleModal } from 'src/app/home/modal/PeopleModal';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PeopleService } from './../../providers/people-service';
import { DepartmentService } from 'src/providers/department-service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  id='';
  name='';
  department='';
  department_id='';
  job='';
  birthday='';
  phone='';
  selectedPeople!: PeopleModal;
  choose_depart="";
  title='新增';

  peopleList:PeopleModal[]=[];
  departmentList:DepartmentModal[]=[];

  constructor(public router:Router , public ps:PeopleService, public ds:DepartmentService,
    public ac:ActivatedRoute) {   
  }

  ngOnInit():void{
    this.getPeople();
    this.getDepartment();
    this.ac.queryParams.subscribe((queryParams) => {
      if(this.ac.snapshot.queryParams['user']){   
        this.selectedPeople = JSON.parse(queryParams['user']);
        console.log(this.selectedPeople)
        this.id=this.selectedPeople.id;
        this.name= this.selectedPeople.name;
        this.department_id= this.selectedPeople.department.id;
        this.department=this.selectedPeople.department.name;
        // this.job=this.selectedPeople.job;
        console.log(this.id)
          this.title='修改';
      
      };
    }
    
    )
  }

  getPeople(){
    this.ps.getAllData().subscribe((res)=>{
      this.peopleList=res;
      
      console.log(this.peopleList);
      console.log('home')
      
    });
  }
  
  insertData(){
  
    const data:PeopleModal={
      id: this.id,
      name: this.name,
      department:{ id: this.choose_depart}
      // job: this.job
      };
        if(data.id==''){
          if(data.name==''||data.department.id==""){
            alert('還有東西沒輸入哦')
          }else{
          console.log(data.department.name);
          this.ps.CreatePersonData(data).subscribe(data=>{
          console.log(data);
          this.getPeople();
          this.router.navigate(['main'],{queryParams:{user: JSON.stringify(this.peopleList)},skipLocationChange:false})
          })
        }
        }else{
          // alert(data.name);
          if(data.name==''){
            alert('還有東西沒輸入哦')
          }else{
            if(data.department.id==''){
              data.department.id=this.department_id;
            }
          this.ps.updatePersonData( this.id, data)
          .subscribe(data=>{
            console.log(data);
            this.getPeople();
            this.router.navigate(['main'],{queryParams:{user: JSON.stringify(this.peopleList)},skipLocationChange:false})
          })}
         
      }
      
    }
    cancel(){
      this.getPeople();
      this.router.navigate(['main']);
    }
    
  getDepartment(){
    this.ds.getAllDepartment().subscribe(data=>{
      //console.log(data);
      this.departmentList=data;
    })
  }
}
  
  
