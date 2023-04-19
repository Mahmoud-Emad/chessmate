import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NgxChessBoardComponent } from 'ngx-chess-board';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  queryParams: Params = {};
  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.queryParams = params
    });
  }
  // let intialized = false;

  @ViewChild('board') board!: NgxChessBoardComponent;

  // Method to reverse the board orientation
  reverseBoard() {
    this.board.reverse();
  }

  resetBoard() {
    this.board.reset();
  }


  getRoutes() {
    this.route.queryParams.subscribe(params => {
      // Do something with the params object
      console.log(params);
    });
  }

  ngOnInit(): void {
    // Code to run after component initialization
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
    const isReversed = this.queryParams['revers']
    setTimeout(() => {
      if (isReversed === 'true') {
        return this.reverseBoard()
      }
    });
  }
}
