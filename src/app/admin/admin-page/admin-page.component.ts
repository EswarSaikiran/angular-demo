import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  isAddTopic: boolean= false;

  submitForm: FormGroup;
  topicName:string;

  topics: string[];

  constructor(private fb:FormBuilder, private service:UserService) {
  

   }

  ngOnInit(): void {
    this.submitForm = this.fb.group({
      topicAdded: ['', Validators.required]
    })
    this.service.getAllTopics().subscribe({
      next: params => {
        this.topics=params;
        console.log(this.topics)
      }
    })
  }

  onClick(){
  

  }
  addTopic(){
    this.topicName = this.submitForm.controls.topicAdded.value;
    
    console.log(this.topicName)
    this.service.addNewTopic(this.topicName).subscribe({
      next: params => {
        this.topics=params;
        console.log(this.topics)
      },
      error: err=> {
        this.isAddTopic=false;
        this.handleError(err);

      }

    }
      
    )

  }
  handleError(err: any) {
    console.log(err)
  }

}
