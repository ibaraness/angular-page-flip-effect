import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  title = 'flipboard-app';
  cardsWidth;
  cardsHeight;

  ngAfterViewInit(): void {
    console.log("windowSize", window.innerWidth, window.innerHeight);
    this.cardsWidth = window.innerWidth;
    this.cardsHeight = window.innerHeight;
  }

}
