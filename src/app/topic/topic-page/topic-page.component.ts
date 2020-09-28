import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Question } from 'src/app/Question';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic-page.component.html',
  styleUrls: ['./topic-page.component.css']
})
export class TopicPageComponent implements OnInit {

  addQuestionForm: FormGroup;

  question:Question;
  arrayOfOptions:string[];
  arrayOfTypedOptions:string[]
  level1questions: Array<any>;
  level2questions: Array<Question>;
  level3questions: Array<Question>;

  data1:Array<any>
  totalRecords:number;
  page:number=1;


  topic:string;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private service:UserService) { 
    this.question= new Question();
    this.data1= new Array<any>();
    this.level1questions= new Array<any>();
    
    this.topic= this.route.snapshot.paramMap.get('id');
    this.arrayOfOptions= ['A','B', 'C', 'D']

    this.addQuestionForm=this.fb.group({

      level:['', [Validators.required]],
      questionNumber:['', [Validators.required, Validators.min(1), Validators.max(25)]],
      question:['', [Validators.required]],
      formOptions: new FormArray([
        new FormControl('', Validators.required),
        new FormControl('', Validators.required),
        new FormControl('', ),
        new FormControl('', )
      ]),
      correctAnswer:['', [Validators.required]]

    })
   
  }

  ngOnInit(): void {
   

  }

  get options(): FormArray {
    return this.addQuestionForm.get('formOptions') as FormArray;
  }

  get f() {
    return this.addQuestionForm.controls;
    
  }

  save(){
    this.arrayOfTypedOptions= this.options.value;
    this.question.topic= this.topic;
    this.question.level = this.f.level.value;
    this.question.questionNumber = this.f.questionNumber.value;
    this.question.question = this.f.question.value;
    let fullString='';
    for(let i=0; i<this.arrayOfOptions.length; i++){
      if(this.arrayOfTypedOptions[i]!=''){
        fullString =fullString + `${this.arrayOfOptions[i]}) ${this.arrayOfTypedOptions[i]}  ` 
        
      }
  
    }
    this.question.options = fullString;
  
    
    
  
    // this.question.option1 = this.arrayOfOptions[0]
    // this.question.option2 = this.arrayOfOptions[1]
    // this.question.option3 = this.arrayOfOptions[2]
    // this.question.option4 = this.arrayOfOptions[3]
    this.question.answer= this.f.correctAnswer.value;

    

    this.service.addQuestion(this.question).subscribe({
      next: params => {
        
        
      },
      error: err=> {
        
        this.handleError(err);

      },
      complete: ()=>{
       
       
        window.alert("Added Question Successfully with question number " + this.question.questionNumber )
        window.alert("Next Question Number" + (this.question.questionNumber+1))
        this.addQuestionForm.reset()
        this.addQuestionForm.controls['questionNumber'].setValue(this.question.questionNumber+1)
        
        
      }

    })
    

  }
  handleError(err: any) {
    window.alert("Try Again");
    console.log(err);
  }


  getQuestionsL(level:string){
  this.service.getQuestionsByTopicAndLevel(this.topic, level).subscribe({
    next: params => {
      
      
      this.data1=params;
      
      this.totalRecords= this.data1.length;
    
    },
    error: err=> {
      
      this.handleError(err);

    }

  })

 
  
  
  function levelValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value == "L1" || control.value == "L2"||control.value == "L3" ) {
        return { 'level': true };
    }
    return null;
}





  }

  


}
