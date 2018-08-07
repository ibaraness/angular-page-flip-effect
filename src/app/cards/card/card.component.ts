import { Component, OnInit } from '@angular/core';

function bottomHandler(event) {
  console.log('Done!', event.target);
  event.target.removeEventListener('transitionend', bottomHandler);
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  bottomCardAnimation = false;

  constructor() { }

  ngOnInit() {
  }

  onClickUp(cardBottom) {
    this.bottomCardAnimation = true;
    cardBottom.addEventListener('transitionend', bottomHandler);
  }

  onClickDown() {
    this.bottomCardAnimation = false;
  }

}
