import { PeopleModal } from 'src/app/home/modal/PeopleModal';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PeopleService } from './../../providers/people-service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  id='';
  name='';
  department='';
  job='';
  birthday='';
  phone='';
  selectedPeople!: PeopleModal;

  peopleList:PeopleModal[]=[];

  constructor(public router:Router , public ps:PeopleService, public ac:ActivatedRoute) {   
  }

  ngOnInit():void{
    this.getPeople();
    this.ac.queryParams.subscribe((queryParams) => {
      if(this.ac.snapshot.queryParams['user']){   
        this.selectedPeople = JSON.parse(queryParams['user']);
        this.id=this.selectedPeople.id;
        this.name= this.selectedPeople.name;
        this.department= this.selectedPeople.depart_id;
        // this.job=this.selectedPeople.job;
      };
    }
    )
  }

  getPeople(){
    this.ps.getAllData().subscribe((res)=>{
      console.log(res);
      this.peopleList=res;
      console.log(this.peopleList);
      this.peopleList.forEach(ele=>{
        console.log(ele.depart_id);
      })
    });
  }
  
  insertData(){
  
    const data:PeopleModal={
      id: this.id,
      name: this.name,
      depart_id: this.department,
      // job: this.job
      };
      if(data.name==''||data.depart_id==''){
        alert('還有東西沒輸入哦')
      }else{
        if(data.id==''){
          console.log('new');
          data.id=data.name;
          this.ps.CreatePersonData(data).subscribe(data=>{
          console.log(data);
          this.getPeople();
        })
        }else{
        // alert(data.name);
        console.log('edit');
        this.ps.updatePersonData( this.id, data)
        .subscribe(data=>{
          console.log(data);
          this.getPeople();
        })}
       
      this.router.navigate(['people'],{queryParams:{user: JSON.stringify(data)},skipLocationChange:true});
      }
   
    }
    back(){
      this.getPeople();
      this.router.navigate(['main']);
    }

    
  }
  
  
