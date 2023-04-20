import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BoardComponent } from './components/board/board.component';
import { PlayLocalComponent } from './components/play-local-component/play-local-component.component';
import { GameComponent } from './components/game/game.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'room/:roomID', component: GameComponent },
  { path: 'play/local', component: PlayLocalComponent },
  { path: 'board', component: BoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
