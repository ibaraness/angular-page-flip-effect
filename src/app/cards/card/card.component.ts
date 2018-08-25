import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ElementRef,
  TemplateRef
} from "@angular/core";
import { cardAnimationTriggers } from "./animation-triggers/animation-triggers";
import { map, debounceTime } from "rxjs/operators";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
  animations: cardAnimationTriggers
})
export class CardComponent implements OnInit {
  // ***********[ Dimensions ] ************
  /**
   * Card content width and height must be pre-calculated for
   * the effect to work propery. Only number should be set without 'px' prefix
   */
  @Input()
  width: number;
  @Input()
  height: number;

  // ***********[ Geometry settings ] ************

  /**
   * Should the card top half should be fliped inwards by defaut
   */
  @Input()
  topFlipped: boolean;

  // ***********[ animation ] ************

  @Input()
  disableBottomAnimation: boolean;
  @Input()
  disableTopAnimation: boolean;

  /**
   * Animation top start state (active or inactive).
   */
  @Input()
  animationTop: string;

  /**
   * Animation top start state (active or inactive).
   */
  private _animationBottom = "foldedOut";
  get animationBottom() {
    return this._animationBottom;
  }
  @Input()
  set animationBottom(value) {
    // console.log("set animationBottom", value, this.id);
    if (value) {
      this._animationBottom = value;
    }
    if (value === "foldedOut") {
      this.sendToBack = false;
    }
  }

  @Output()
  bottomFoldInDone: EventEmitter<any> = new EventEmitter();
  @Output()
  topFoldOutDone: EventEmitter<any> = new EventEmitter();

  @Output()
  topFoldInDone: EventEmitter<any> = new EventEmitter();
  @Output()
  topFoldInStart: EventEmitter<any> = new EventEmitter();

  // ***********[ Content ] ************
  @Input()
  template: TemplateRef<any>;

  // ***********[ Presentation ] ************

  /**
   * Hide and disable card flag
   */
  @Input()
  disable: boolean;

  @Input()
  id: string; //TODO: remove in prod

  public bottomCardScreenAnimation = "transparent";
  public sendToBack = false;
  public bottomDeg = 0;
  public pixelToDegree;

  private panStart = false;
  private panOffset = 0;
  private panUpChange: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {
    this.pixelToDegree = 90 / (this.height / 3);
    this.handlePanUp();
  }

  bottomAnimationDone(event) {
    // console.log('bottomAnimationDone', event, this.sendToBack);
    if (event.toState === "foldedIn" && event.fromState !== "void") {
      // Will trigger top fold-out animation
      this.bottomFoldInDone.emit(true);

      // Move card to the back, and the next to the front
      this.sendToBack = true;
    }
  }

  bottomAnimationStart(event) {
    if (event.toState === "foldedIn" && event.fromState !== "void") {
      this.bottomCardScreenAnimation = "opaque";
    } else if (event.toState === "foldedOut" && event.fromState !== "void") {
      this.bottomCardScreenAnimation = "transparent";
    }
    // console.log("bottomAnimationStart", event);
  }

  topAnimationDone(event) {
    // console.log("topAnimationDone", event);
    if (event.toState === "foldedOut" && event.fromState !== "void") {
      // console.log("topFoldOutDone");
      this.topFoldOutDone.emit(true);
    } else if (event.toState === "foldedIn" && event.fromState !== "void") {
      this.topFoldInDone.emit(true);
    }
  }

  topAnimationStart(event) {
    if (event.toState === "foldedIn" && event.fromState !== "void") {
      // console.log("topAnimationStart")
      this.topFoldInStart.emit(true);
    }
  }

  animateBottomFoldIn(): void {
    console.log("dasfd", !this.disableTopAnimation);
    if (!this.disableTopAnimation) {
      this.animationBottom = "foldedIn";
    }
  }

  animateBottomFoldOut(): void {
    if (!this.disableTopAnimation) {
      this.animationBottom = "foldedOut";
    }
  }

  animateTopFoldIn(): void {
    if (!this.disableBottomAnimation) {
      this.animationTop = "foldedIn";
    }
  }

  animateTopFoldOut(): void {
    if (!this.disableBottomAnimation) {
      this.animationTop = "foldedOut";
    }
  }
  /* Touch events */
  // onSwipe(event){
  //   console.log("swipe", event);
  // }

  // onSwipeDown(event){
  //   this.animateTopFoldIn();
  // }

  // onSwipeUp(event){
  //   this.animateBottomFoldIn();
  // }

  onPanDown(event) {
    //console.log("onPanDown", event);
  }

  onPanUp(event) {
    this.panUpChange.emit(event);
  }

  handlePanUp() {
    if (this.disableTopAnimation) {
      return;
    }
    this.panUpChange
      .asObservable()
      .pipe(debounceTime(10))
      .subscribe(event => {
        if (this.panStart && this.bottomDeg < 90) {
          this.bottomDeg = event.distance * this.pixelToDegree;
          //console.log("onPanUp", (event.distance * this.pixelToDegree));
        } else if (this.panStart && this.bottomDeg > 80) {
          this.panStart = false;
          this.bottomDeg = 90;
          setTimeout(() => {
            this.manuallyTriggerbottomDone();
          });
        }
      });
  }

  onPanEnd(event) {
    if (this.panStart) {
      if (this.bottomDeg < 89) {
        this.bottomDeg = 0;
      }
      this.panStart = false;
      if (event.overallVelocityY * -1 > 0.1) {
        this.bottomDeg = 90;
        setTimeout(() => {
          this.manuallyTriggerbottomDone();
        });
      }
    }

    console.log("onPanEnd", event.overallVelocityY);
  }

  manuallyTriggerbottomDone() {
    // Will trigger top fold-out animation
    this.bottomFoldInDone.emit(true);

    // Move card to the back, and the next to the front
    this.sendToBack = true;
  }

  onPanStart(event) {
    // if(this.bottomDeg >= 50){
    //   this.bottomDeg = -50;
    // }
    //this.panOffset = (event.distance * this.pixelToDegree);
    this.panStart = true;
    console.log("onPanStart", event);
  }

  // TODO: remove on prod
  onClickUp() {
    this.animateBottomFoldIn();
  }

  /* Touch events  */
  onClickDown() {
    this.animateTopFoldIn();
    // if (!this.disableBottomAnimation) {
    //   this.animationTop = 'foldedIn';
    // }
  }
}
