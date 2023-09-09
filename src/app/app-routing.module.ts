import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { VoteComponent } from './pages/vote/vote.component';
import { NewBookComponent } from './pages/vote/new-book/new-book.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/login/register/register.component';
import { AccountComponent } from './pages/login/account/account.component';
import { authenticationGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: '', component: LeaderboardComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'vote', component: VoteComponent, canActivate: [authenticationGuard()] },
  { path: 'new-book', component: NewBookComponent, canActivate: [authenticationGuard()] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent, canActivate: [authenticationGuard()] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
