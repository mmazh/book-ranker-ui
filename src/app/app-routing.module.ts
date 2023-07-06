import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { BrowseComponent } from './pages/browse/browse.component';

const routes: Routes = [
  { path: '', component: LeaderboardComponent },
  { path: 'browse', component: BrowseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
