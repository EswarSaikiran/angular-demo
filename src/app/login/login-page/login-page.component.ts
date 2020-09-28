import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { UserService } from 'src/app/user.service';
import  { Router,ActivatedRoute } from '@angular/router'
import { Admin } from 'src/admin';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  admin:Admin;
  loggedInAdmin:Admin;

  loading = false;
  submitted = false;
  loginSuccess:boolean = false;
  message: string='';
  
  receivedUser:any;


  @Output() valueChange = new EventEmitter();


  

  
  constructor(private service:UserService, private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,) { 
      this.admin=new Admin();


  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  }

  get f() { return this.loginForm.controls; }

  onLogin(){
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
  }
    else{
      this.loading = true;
      
      this.admin.userName= this.f.username.value;
      this.admin.passWord= this.f.password.value;


      //console.log(this.admin);

      this.service.loginService(this.admin).subscribe({
        next: params => {
          this.receivedUser=params.userName;
          this.router.navigate(['/admin']);
        },
        error: err=> {
          this.loading=false;
          this.handleError(err);

        },
        complete: () => this.sendOutput()

      })
       

       this.loading=false;

      

      
    }

  }
  handleError(err: any) {
    console.log(err)
    window.alert(err.message)
  }


  sendOutput() {
    
    this.valueChange.emit(this.receivedUser)
   

  }


  


  

}
