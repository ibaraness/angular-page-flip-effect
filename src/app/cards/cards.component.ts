import { CardComponent } from './card/card.component';
import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, AfterViewInit {

  @ViewChildren(CardComponent) cardComponents: QueryList<CardComponent>;
  cardComponentsArray: CardComponent[];
  cards = [];

  constructor() { }

  ngOnInit() {
    this.cards = [
      {id: 'firstCard', topState: 'foldedIn', disable: false, bottomState: ''},
      {id: 'seconedCard', topState: 'foldedIn', disable: false, bottomState: ''},
      {id: 'thirdCard', topState: 'foldedIn', disable: false, bottomState: ''},
      {id: 'forthCard', topState: 'foldedIn', disable: false, bottomState: ''}
    ];
  }

  ngAfterViewInit(): void {
    this.cardComponentsArray = this.cardComponents.toArray();
  }

  onBottomFoldInDone(index) {
    console.log("onBottomFoldInDone")
    if (index >= 0) {
      // Start top animation
      console.log("Start top animation", this.cardComponents);
      if (this.cardComponentsArray) {
        this.cardComponentsArray[index].animateTopFoldOut(); //.animationTop = "foldedOut";
      }
      // this.cards[index].topState = 'active';
    }
  }

  onTopFoldOutDone(event, index) {
    if (index < this.cards.length) {
      this.cards[index].disable = true;
      // this.cards[index - 1].topState = '';
      console.log("true onTopFoldOutDone");
    }
  }

  onTopFoldInDone(event, index) {
    console.log("onTopFoldInDone", event);
    if (index < this.cards.length) {
      // this.cards[index].bottomState = 'inactive';
      this.cardComponentsArray[index].animateBottomFoldOut(); //animationBottom = 'foldedOut';
      console.log("true onTopFoldInDone");
    }
  }

  onTopFoldInStart(event, index) {
    console.log("test", event);
    if (index < this.cards.length) {
      this.cards[index].disable = false;
      console.log("true onTopFoldInStart");
    }
  }

}
