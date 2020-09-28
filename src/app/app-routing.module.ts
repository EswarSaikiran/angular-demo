import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { TopicPageComponent } from './topic/topic-page/topic-page.component';
import { RegistrationPageComponent } from './user/registration-page/registration-page.component';
import { ExamPageComponent } from './exam/exam-page/exam-page.component';
import { ReportPageComponent } from './report/report-page/report-page.component';



const routes: Routes = [
  {path:'login' ,component: LoginPageComponent},
  {path:'admin', component: AdminPageComponent},
  {path:'topicpage/:id', component: TopicPageComponent},
  {path:'registration', component: RegistrationPageComponent},
  {path:'exam', component: ExamPageComponent},
  {path:'report', component: ReportPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
