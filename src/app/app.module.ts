import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BoardComponent } from './components/board/board.component';
import { NgxChessBoardModule } from 'ngx-chess-board';
import { PlayLocalComponent } from './components/play-local-component/play-local-component.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule } from '@angular/forms';
import { GameComponent } from './components/game/game.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from './utils/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BoardComponent,
    PlayLocalComponent,
    ButtonComponent,
    InputComponent,
    GameComponent,
  ],
  imports: [
    NgxChessBoardModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule, // Make sure RouterModule is imported here
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
