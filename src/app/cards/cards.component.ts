import { CardFlipPanComponent } from "./card/card-flip-pan/card-flip-pan.component";
import { CardComponent } from "./card/card.component";
import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  AfterViewInit,
  Input,
  ViewEncapsulation,
  Type,
  ViewChild,
  ContentChild,
  AfterContentInit
} from "@angular/core";
import { CardFlipAnimation } from "./models/card-flip-anim";
import { CardFlipAnimationComponent } from "./card/card-flip-animation/card-flip-animation.component";
import { CardTemplateComponent } from "./card-template/card-template.component";

@Component({
  selector: "app-cards",
  templateUrl: "./cards.component.html",
  styleUrls: ["./cards.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class CardsComponent implements OnInit, AfterViewInit, AfterContentInit {

  @Input()
  width: number;
  @Input()
  height: number;
  @Input()
  cssClass = "my-cards-container";
  @ViewChildren(CardFlipAnimationComponent)
  cardComponents: QueryList<CardFlipAnimation>;

  @ViewChildren(CardTemplateComponent)
  cardTemplates: QueryList<CardTemplateComponent>;

  @ContentChild('templateContainer') templateContainer;

  cardComponentsArray: CardFlipAnimation[];
  cards = [];

  protected animationState: { animation: string; degree: number };

  private activeCardIndex;

  public activePan = true;

  constructor() {}

  ngOnInit() {
    this.cards = [
      {
        id: "firstCard",
        topState: "foldedIn",
        disable: false,
        bottomState: ""
      },
      {
        id: "seconedCard",
        topState: "foldedIn",
        disable: false,
        bottomState: ""
      },
      {
        id: "thirdCard",
        topState: "foldedIn",
        disable: false,
        bottomState: ""
      },
      { id: "forthCard", topState: "foldedIn", disable: false, bottomState: "" }
    ];
    this.activeCardIndex = this.cards.length - 1;
  }

  ngAfterViewInit(): void {
    this.cardComponentsArray = this.cardComponents.toArray();
    console.log("cards templates", this.templateContainer, this.cardTemplates);
  }

  ngAfterContentInit(): void {
    console.log("cards templates", this.templateContainer, this.cardTemplates);
  }

  onBottomFoldInDone(index) {
    if (index >= 0) {
      // Start top animation
      if (this.cardComponentsArray) {
        this.cardComponentsArray[index].animateTopFoldOut();
        this.activeCardIndex = index;
      }
    }
  }

  onTopFoldOutDone(event, index) {
    if (index < this.cards.length) {
      this.cards[index].disable = true;
    }
  }

  onTopFoldInDone(event, index) {
    if (index < this.cards.length) {
      this.cardComponentsArray[index].animateBottomFoldOut();
      this.activeCardIndex = index;
    }
  }

  onTopFoldInStart(event, index) {
    if (index < this.cards.length) {
      this.cards[index].disable = false;
    }
  }

  flipUp() {
    if (this.activeCardIndex < this.cards.length) {
      this.cardComponentsArray[this.activeCardIndex].animateBottomFoldIn();
    }
  }

  flipDown() {
    if (this.activeCardIndex < this.cards.length) {
      this.cardComponentsArray[this.activeCardIndex].animateTopFoldIn();
    }
  }
}
