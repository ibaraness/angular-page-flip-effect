import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from "@angular/core";
import { cardAnimationTriggers } from "../animation-triggers/animation-triggers";
import { CardFlipAnimation } from "../../models/card-flip-anim";
import { CardFlip } from "../../models/card-flip";

@Component({
  selector: "app-card-flip-animation",
  templateUrl: "./card-flip-animation.component.html",
  styleUrls: ["./card-flip-animation.component.scss"],
  animations: cardAnimationTriggers
})
export class CardFlipAnimationComponent extends CardFlip implements OnInit, CardFlipAnimation {

   /**
   * Should the card top half should be fliped inwards by defaut
   */
  // @Input()
  // topFlipped: boolean;

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

  ngOnInit() {}

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
      //console.log("topFoldInDone");
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
      console.log("animateBottomFoldOut", this.animationBottom)
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
