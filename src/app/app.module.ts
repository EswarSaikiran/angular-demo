import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { TopicPageComponent } from './topic/topic-page/topic-page.component';
import { RegistrationPageComponent } from './user/registration-page/registration-page.component';
import { NgxPaginationModule } from 'ngx-pagination'
import { HttpClientModule} from '@angular/common/http';
import { ExamPageComponent } from './exam/exam-page/exam-page.component';
import { ReportPageComponent } from './report/report-page/report-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    AdminPageComponent,
    TopicPageComponent,
    RegistrationPageComponent,
    ExamPageComponent,
    ReportPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
