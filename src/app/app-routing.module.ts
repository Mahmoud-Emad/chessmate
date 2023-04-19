import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BoardComponent } from './components/board/board.component';

const routes: Routes = [
  { path: 'mainpage', component: HomepageComponent },
  { path: 'iframepage', component: BoardComponent },
  { path: '', redirectTo: '/mainpage', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }