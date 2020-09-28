import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  currentUser:any;

  idbox:boolean;
  


  registration:FormGroup;

  registraionid:number;
  topic:string;
  level:string;
  data:any;
  yetToLogin: boolean;
  al: boolean;

  constructor(private router:Router, private service:UserService,private formBuilder: FormBuilder) { 
    this.al =true;
    
  }

  ngOnInit(): void {
   
  }

  

  afterLogin(event){
    this.currentUser= event
    
    this.al = !this.al
    this.yetToLogin= false;

  }

  
  login(){
    this.yetToLogin= false;
    this.al = false;

  }

    
}
