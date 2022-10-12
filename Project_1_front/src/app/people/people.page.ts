import { ActivatedRoute, Params, Router } from '@angular/router';
import { PeopleService } from './../../providers/people-service';
import { Component, OnInit } from '@angular/core';
import { PeopleModal } from '../home/modal/PeopleModal';


@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {
  
  peopleList:PeopleModal[]=[];
  selectedPeople!: PeopleModal;
  constructor(public peopleService:PeopleService , public test:ActivatedRoute, public router:Router){

  }

  ngOnInit():void{
    this.getPeople();
    this.test.queryParams.subscribe((queryParams) => {
      if(this.test.snapshot.queryParams['user']){
        this.selectedPeople = JSON.parse(queryParams['user']);
      };
    }
    )
  }

  getPeople(){
    this.peopleService.getAllData().subscribe((res)=>{
      console.log(res);
      this.peopleList=res;
    })
  }
  editor(){
    console.log(this.selectedPeople);
    
    this.router.navigate(['home'],{queryParams:{user: JSON.stringify(this.selectedPeople)},skipLocationChange:true});
  }
  

  back_to_home(){
    this.router.navigate(['main']);
  // getPeople(){
  //   this.peopleService.getPersonData().subscribe((res)=>{
  //     console.log(res);
  //     this.peopleList=res;
  //     this.peopleList.forEach(ele=>{
  //       console.log(ele.job);
        
  //     })
  //   });
  }



}
