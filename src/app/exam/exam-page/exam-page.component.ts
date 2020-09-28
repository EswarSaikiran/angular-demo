import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamQuestion } from 'src/app/ExamQuestion';
import { NgForm, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MapOperator } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-exam-page',
  templateUrl: './exam-page.component.html',
  styleUrls: ['./exam-page.component.css']
})
export class ExamPageComponent implements OnInit {

  data: Array<any>
  questions: Array<any>;
  totalRecords: number;
  page: number = 1;
  registrationId: number;
  topic: string;
  level: string;
  selectedAnswers: Map<string, string>;
  answers: string[]
  choiceA: string ="A";
  choiceB: string ="B";
  choiceC: string ="C";
  choiceD: string ="D";


  myarray: string[] =[];
  i:number =0;
  idbox:boolean;
  data2:any;


  exampage: boolean;

  expmap: Map<string,string>;
  


  answersForm: FormGroup;
  registration:FormGroup;



  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private service: UserService) {
    
    //this.topic = this.route.snapshot.paramMap.get('topic');
    //this.registrationId = +this.route.snapshot.paramMap.get('id');
    this.selectedAnswers = new Map<string, string>();
    this.answers = new Array();

    this.exampage = true;

    this.data = new Array<any>();
    this.questions = new Array<any>();
    this.idbox=false;
    this.expmap= new Map<string, string>();;

    this.registration= this.fb.group({
      id: ['', Validators.required]
    })


    

  }

  get f() {
    return this.answersForm.controls
  }



  ngOnInit(): void {
    

  }

  submit(){
    this.registrationId= this.registration.controls.id.value;

    this.service.checkForId(this.registrationId).subscribe({
      next: params => {
        this.data=params;
        
        
        
      },
      error: err=> {
        this.handleError2(err)
        

      },
      complete : () => this.idbox= !this.idbox
    })
    

  }

  handleError2(err: any) {
    this.data2= err.error.text;
    if(this.data2=="invalid Registration Id"){
      window.alert("Invalid Registration Id")
    }
    else {
      this.topic=this.data2
      this.idbox=!this.idbox;
    }
  }



  

  get a():FormArray {
    return this.answersForm.controls.givenAnswers as FormArray
  }

  


  handleError(err: any) {
   window.alert(err.error.message)
  }

  getQuestionsL1(level:string) {
    this.level=level;
    this.service.getExamQuestionsByTopicAndLevel(this.registrationId, this.topic, level).subscribe({
      next: params => {
        this.data = params
        
        this.data.forEach(x => {
          let question: ExamQuestion = new ExamQuestion();
          question.questionNumber = x.questionNumber;
          question.question = x.question;
          let optionString: string = JSON.stringify(x.options)
          let options: string[] = optionString.split(/\s\s+/);
          
          question.option1 = options[0]
          question.option2 = options[1]
          question.option3 = options[2]
          question.option4 = options[3]

          this.questions.push(question);


        })


      },
      error: err => {
        this.handleError(err)


      },
      complete: () => this.exampage = false
    })
  }

  // getQuestionsL2() {

  //   this.service.getExamQuestionsByTopicAndLevel(this.registrationId, this.topic, "L2").subscribe({
  //     next: params => {
  //       this.data = params
  //       console.log(this.data)

  //     },
  //     error: err => {
  //       this.handleError(err)


  //     },
  //     complete: () => this.exampage = !this.exampage
  //   })
  // }

  // getQuestionsL3() {

  //   this.service.getExamQuestionsByTopicAndLevel(this.registrationId, this.topic, "L3").subscribe({
  //     next: params => {
  //       this.data = params
  //       console.log(this.data)

  //     },
  //     error: err => {
  //       this.handleError(err)


  //     },
  //     complete: () => this.exampage = !this.exampage
  //   })
  // }




 

  entries: any =[];
  selectedEntry:any;

  save(){
    
   for(let i=1;i<= this.entries.length;i++){
     let k=i-1;
     this.selectedAnswers.set(`${i}`, this.entries[k])
   }
   

   

   this.service.getMarks(this.expmap, this.topic, this.registrationId, this.level).subscribe({
    next: params => {
      this.data = params
      

      

    },
    error: err => {
      this.handleError(err)


    },
    complete : ()=>{
      window.alert("Submitted Successfully")
      window.alert('Redirecting to report page')
      
      this.router.navigate(['/report'])
      
    }

   })
   
    
   
  }

  onSelectionChange(entry, index){
    this.selectedEntry = entry;
    this.entries.push(this.selectedEntry);
    

    this.expmap.set(`${index}`, this.selectedEntry)
    

    
    

  }


 





































}
