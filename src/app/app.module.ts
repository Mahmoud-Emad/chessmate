import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BoardComponent } from './components/board/board.component';
import { NgxChessBoardModule } from 'ngx-chess-board';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BoardComponent,
  ],
  imports: [
    NgxChessBoardModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule // Make sure RouterModule is imported here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
