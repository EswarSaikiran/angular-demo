import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  registrationForm: FormGroup;
  user:User;
  address:string;
  quizTopics: any;

  constructor(private fb:FormBuilder, private service:UserService) {
    this.user=null;
    this.quizTopics = []
   }

  ngOnInit(): void {

    this.service.getAllTopics().subscribe({
      next: params => {
        this.quizTopics=params;
        
       },
       error: err=> {
         this.handleError(err);
 
       }
    })

    this.registrationForm= this.fb.group({
      name:['', [Validators.required]],
      age: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      qualification: ['',[Validators.required]],
      contact: ['', [Validators.required, Validators.maxLength(10)]],
      quiz: ['', [Validators.required]],
      address: this.buildAddress()

    })

  }

  buildAddress():FormGroup {
    return this.fb.group({
      street1:['', [Validators.required]],
      street2:'',
      city:'',
      state:'',
      pincode:''
    })
  }

  get f() {
    return this.registrationForm.controls;
    
  }

  get a(){
    return this.registrationForm.get('address')
  }




  save(){
    console.log(this.registrationForm);
    this.user= {...this.registrationForm.value}
    this.user.address= this.a.get('street1').value+","+this.a.get('street2').value+","+this.a.get('city').value+","+this.a.get('state').value+","+this.a.get('pincode').value;
    this.user.interestedQuiz= this.f.quiz.value;
    console.log(this.user.address)


    console.log(this.user);
    this.service.saveRegistration(this.user).subscribe({
      next: params => {
       this.user.registrationId=params;
       console.log(params)
      },
      error: err=> {
        this.handleError(err);

      },
      complete: ()=> {window.alert("RegistrationId:" + this.user.registrationId)
      this.registrationForm.reset();
    
    }

    })

    
  }
  handleError(err: any) {
    console.log(err);
    throw new Error("Somethings Not Right");
  }




}
