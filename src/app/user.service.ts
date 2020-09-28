import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import {tap, catchError} from 'rxjs/operators'
import { Admin } from 'src/admin';
import { Question } from './Question';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser:any;
  url:string;

  constructor(private http:HttpClient) {
    this.currentUser= false;
   }

  loginService(admin:Admin): Observable<Admin |any>{
    
    return this.http.put<Admin>('http://localhost:8090/api/user', admin).
    pipe(
      tap(data => this.currentUser=true),
        catchError(err=> this.errorHandler(err))
        )
    
  }
  errorHandler(err: HttpErrorResponse) {
    console.log(err);
    return throwError(err.error);
  }



  getQuestionsByTopicAndLevel(topic:string, level:string): Observable<any>{
    return this.http.get<any>(`http://localhost:8090/api/showQuestions/?topic=${topic}&&level=${level}`)
  }

  saveRegistration(user:any): Observable<any> { 
    
    return this.http.post<any>('http://localhost:8090/reg/details', user).pipe(
      tap(data => console.log(data)),
      catchError(err=>this.errorHandler(err))
    );
  }


  addNewTopic(topicName:String) : Observable<any> {
    this.url ='http://localhost:8090/api/addTopic/' +topicName;
    return this.http.post<any>(this.url, null)
  }

  getAllTopics(): Observable<any> {
    return this.http.get<any>('http://localhost:8090/api/alltopics')
  }

  getGiftList():Observable<any>{
    return this.http.get<any>(`http://localhost:8090/reg/ShowGifts`)
  }

  
  addQuestion(question:Question): Observable<any> {
    return this.http.post<any>('http://localhost:8090/api/questions', question).pipe(
      tap(data => console.log(data)),
      catchError(err=>this.errorHandler(err))
    );
  }


  getExamQuestionsByTopicAndLevel(registrationID:number, topic:string, level:string): Observable<any>{
    return this.http.get<any>(`http://localhost:8090/reg/questions/?registrationId=${registrationID}&&topic=${topic}&&level=${level}`)
  }


  setCurrentUser(): Observable<any>{
return of(this.currentUser);
  }

  checkForId(registrationID:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8090/reg/validatingRegId/?registrationId=${registrationID}`)
  }


  getReport(registrationId:number, level:string) :Observable<any>{
    return this.http.get<any>(`http://localhost:8090/reg/showReport/?registrationId=${registrationId}&&level=${level}`)
  }

  getMarks(map: Map<string, string>,topic:string,registrationID:number, level:string): Observable<any>{
    let jsonObject = {};  
  map.forEach((value, key) => {  
       jsonObject[key] = value  
});  

    console.log(jsonObject)
    return this.http.put<any>(`http://localhost:8090/reg/getMarks/?registrationId=${registrationID}&&topic=${topic}&&level=${level}`, jsonObject)
  }



}
