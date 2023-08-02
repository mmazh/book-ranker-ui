import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { VoteComponent } from './pages/vote/vote.component';
import { NewBookComponent } from './pages/vote/new-book/new-book.component';

const routes: Routes = [
  { path: '', component: LeaderboardComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'vote', component: VoteComponent },
  { path: 'new-book', component: NewBookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
