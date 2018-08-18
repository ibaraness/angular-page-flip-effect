import { Component, OnInit, Input, EventEmitter, Output, ElementRef, TemplateRef} from '@angular/core';
import { cardAnimationTriggers } from './animation-triggers/animation-triggers';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: cardAnimationTriggers
})
export class CardComponent implements OnInit {
  /**
   * Should the card top half should be fliped inwards by defaut
   */
  @Input() topFlipped: boolean;

  @Input() disableBottomAnimation: boolean;
  @Input() disableTopAnimation: boolean;

  @Input() id: string; //TODO: remove in prod
  /**
   * Animation top start state (active or inactive).
   */
  @Input() animationTop: string;

  @Input() template: TemplateRef<any>;

  /**
   * Animation top start state (active or inactive).
   */
  private _animationBottom = 'foldedOut';
  get animationBottom() {
    return this._animationBottom;
  }
  @Input()
  set animationBottom(value) {
    console.log("set animationBottom", value, this.id);
    if (value) {
      this._animationBottom = value;
    }
    if (value === 'foldedOut') {
      this.sendToBack = false;
    }
  }

  /**
   * Hide and disable card flag
   */
  @Input() disable: boolean;

  /**
   * Card content width and height must be pre-calculated for
   * the effect to work propery. Only number should be set without 'px' prefix
   */
  @Input() cardWidth: string|number;
  @Input() cardHeight: string|number;

  @Output() bottomFoldInDone: EventEmitter<any> = new EventEmitter();
  @Output() topFoldOutDone: EventEmitter<any> = new EventEmitter();

  @Output() topFoldInDone: EventEmitter<any> = new EventEmitter();
  @Output() topFoldInStart: EventEmitter<any> = new EventEmitter();

  bottomCardScreenAnimation = 'transparent';
  sendToBack = false;

  constructor() { }

  ngOnInit() {

  }

  bottomAnimationDone(event) {
    console.log('bottomAnimationDone', event, this.sendToBack);
    if (event.toState === 'foldedIn' && event.fromState !== 'void') {

      // Will trigger top fold-out animation
      this.bottomFoldInDone.emit(true);

      // Move card to the back, and the next to the front
      this.sendToBack = true;
    }
  }

  bottomAnimationStart(event) {
    if (event.toState === 'foldedIn' && event.fromState !== 'void') {
      this.bottomCardScreenAnimation = 'opaque';
    } else if (event.toState === 'foldedOut' && event.fromState !== 'void') {
      this.bottomCardScreenAnimation = 'transparent';
    }
    console.log("bottomAnimationStart", event);
  }

  topAnimationDone(event) {
    console.log("topAnimationDone", event);
    if (event.toState === 'foldedOut' && event.fromState !== 'void') {
      console.log("topFoldOutDone");
      this.topFoldOutDone.emit(true);
    } else if (event.toState === 'foldedIn' && event.fromState !== 'void') {
      this.topFoldInDone.emit(true);
    }
  }

  topAnimationStart(event) {
    if (event.toState === 'foldedIn' && event.fromState !== 'void'){
      console.log("topAnimationStart")
      this.topFoldInStart.emit(true);
    }
  }

  animateBottomFoldIn(): void {
    if (!this.disableTopAnimation) {
      this.animationBottom = 'foldedIn';
    }
  }

  animateBottomFoldOut(): void {
    if (!this.disableTopAnimation) {
      this.animationBottom = 'foldedOut';
    }
  }

  animateTopFoldIn(): void {
    if (!this.disableTopAnimation) {
      this.animationTop = 'foldedIn';
    }
  }

  animateTopFoldOut(): void {
    if (!this.disableBottomAnimation) {
      this.animationTop = 'foldedOut';
    }
  }

  // TODO: remove on prod
  onClickUp(cardBottom) {
    this.animateBottomFoldIn();
  }

  onClickDown() {
    if (!this.disableBottomAnimation) {
      this.animationTop = 'foldedIn';
    }
  }

}
