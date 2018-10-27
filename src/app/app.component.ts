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
    setTimeout(() => {
      console.log("windowSize", window.innerWidth, window.innerHeight);
      this.cardsWidth = 300;//window.innerWidth;
      this.cardsHeight = 600;//window.innerHeight;
    });

  }

}
