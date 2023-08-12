import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { VoteComponent } from './pages/vote/vote.component';
import { NewBookComponent } from './pages/vote/new-book/new-book.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/login/register/register.component';
import { AccountComponent } from './pages/login/account/account.component';
import { HttpInterceptService } from './http-intercept.service';

@NgModule({
  declarations: [
    AppComponent,
    LeaderboardComponent,
    BrowseComponent,
    VoteComponent,
    NewBookComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
