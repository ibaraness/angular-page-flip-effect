import { CardFlipPanComponent } from './card/card-flip-pan/card-flip-pan.component';
import { CardComponent } from './card/card.component';
import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardsComponent implements OnInit, AfterViewInit {
  @Input() width: number;
  @Input() height: number;
  @Input() cssClass = "my-cards-container";
  @ViewChildren(CardFlipPanComponent) cardComponents: QueryList<CardFlipPanComponent>;
  cardComponentsArray: CardFlipPanComponent[];
  cards = [];

  private activeCardIndex;

  constructor() { }

  ngOnInit() {
    this.cards = [
      {id: 'firstCard', topState: 'foldedIn', disable: false, bottomState: ''},
      {id: 'seconedCard', topState: 'foldedIn', disable: false, bottomState: ''},
      {id: 'thirdCard', topState: 'foldedIn', disable: false, bottomState: ''},
      {id: 'forthCard', topState: 'foldedIn', disable: false, bottomState: ''}
    ];
    this.activeCardIndex = this.cards.length - 1;
  }

  ngAfterViewInit(): void {
    this.cardComponentsArray = this.cardComponents.toArray();
  }

  onBottomFoldInDone(index) {
    //console.log("onBottomFoldInDone")
    if (index >= 0) {
      // Start top animation
      //console.log("Start top animation", this.cardComponents);
      if (this.cardComponentsArray) {
        console.log("this.cardComponentsArray[index]", this.cardComponentsArray[index]);
        this.cardComponentsArray[index].animateTopFoldOut(); //.animationTop = "foldedOut";
        this.activeCardIndex = index;
      }
      // this.cards[index].topState = 'active';
    }
  }

  onTopFoldOutDone(event, index) {
    if (index < this.cards.length) {
      this.cards[index].disable = true;
      // this.cards[index - 1].topState = '';
      //console.log("true onTopFoldOutDone");
    }
  }

  onTopFoldInDone(event, index) {
    console.log("onTopFoldInDone", event);
    if (index < this.cards.length) {
      // this.cards[index].bottomState = 'inactive';
      this.cardComponentsArray[index].animateBottomFoldOut(); //animationBottom = 'foldedOut';
      this.activeCardIndex = index;
      // console.log("true onTopFoldInDone");
    }
  }

  onTopFoldInStart(event, index) {
    // console.log("test", event);
    if (index < this.cards.length) {
      this.cards[index].disable = false;
      // console.log("true onTopFoldInStart");
    }
  }

  flipUp(){
    console.log("clicked flipUp")
    if (this.activeCardIndex < this.cards.length) {
      console.log("this.activeCardIndex", this.cardComponentsArray[this.activeCardIndex]);
      this.cardComponentsArray[this.activeCardIndex].animateBottomFoldIn();
    }
  }

  flipDown(){
    console.log("clicked flipDown")
    if (this.activeCardIndex < this.cards.length) {
      console.log("this.activeCardIndex", this.activeCardIndex);
      this.cardComponentsArray[this.activeCardIndex].animateTopFoldIn();
    }
  }

}
