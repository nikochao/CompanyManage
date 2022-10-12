import { Component, OnInit } from '@angular/core';
import { PeopleModal } from '../home/modal/PeopleModal';
import { PeopleService } from './../../providers/people-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  people='';
  peopleList:PeopleModal[]=[];

  constructor(public peopleService:PeopleService, public router:Router){
    this.getPeople();
  }
  
  ngOnInit():void{
  }
 
  getPeople(){
    this.peopleService.getAllData().subscribe((res)=>{//!!!!!
      this.peopleList=[];
      console.log(res);
      
      this.peopleList=res
      this.peopleList.forEach(ele=>{
        console.log(ele.depart_id);
      })
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

  new(){
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

  department_one(){
    this.peopleService.getDepartmentEmployee('1').subscribe((res)=>{
      console.log(res);
      this.peopleList=res;
    })
  }
  department_two(){
    this.peopleService.getDepartmentEmployee('2').subscribe((res)=>{
      console.log(res);
      this.peopleList=res;
    })
  }
  
  


  }


