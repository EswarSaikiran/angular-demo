import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.css']
})
export class ReportPageComponent implements OnInit {


  data:any;
  idbox:boolean;

  reports:Array<any>;

  giftBox:boolean;
  giftList:Array<any>;


  registration:FormGroup;

  registraionId:number;
  topic:string;
  levels:string[];
  choosenGift:string;

  constructor(private service:UserService,private formBuilder: FormBuilder) {
    this.levels = ["L1", "L2", "L3"]
    this.reports = new Array<any>();
    this.giftList = new Array<any>();
    this.idbox=false;
    this.giftBox=false;
    this.registration= this.formBuilder.group({
      id: ['', Validators.required]
    })
    
   }


  

  ngOnInit(): void {
  }



  getReportL1(level:string){
    
    this.service.getReport(this.registraionId, level).subscribe({
      next: params =>{
        this.reports.push(params)

      },
      error: err=> {
        this.handleError1(err)
        

      },
      complete: ()=>{
        if(this.reports.length===3){
          this.getGifts();
            this.giftBox=!this.giftBox

        }
      }

    
    })
  }
  // getReportL2(){
  //   this.service.getReport(this.registraionId, "L2").subscribe({
  //     next: params =>{
  //       this.data=params

  //     },
  //     error: err=> {
  //       this.handleError1(err)
        

  //     }
    
  //   })
  // }
  // getReportL3(){
  //   this.service.getReport(this.registraionId, "L3").subscribe({
  //     next: params =>{
  //       this.data=params

  //     },
  //     error: err=> {
  //       this.handleError1(err)
        

  //     }
    
  //   })
  // }
  
  handleError1(err: any) {
    window.alert(err.error.message)
  }

  submit(){
    this.registraionId= this.registration.controls.id.value;

    this.service.checkForId(this.registraionId).subscribe({
      next: params => {
        this.data=params;
        console.log(this.data)
        
        
      },
      error: err=> {
        this.handleError(err)
        

      },
      complete : () => this.idbox= !this.idbox
    })
    

  }
  handleError(err: any) {
    this.data= err.error.text;
    if(this.data=="invalid Registration Id"){
      window.alert("Invalid Registration Id")
    }
    else {
      this.topic=this.data
      this.idbox=!this.idbox;
    }
  }

  getGifts(){
    this.service.getGiftList().subscribe({
      next: params => {
        this.giftList=params
        console.log(this.giftList)
        
      },
      error : err =>{
        this.handleError1(err.message)
      }


    })
  }

  sendGift(){
    window.alert(`Congratulations ${this.choosenGift} will be delivered`)
  }

}
