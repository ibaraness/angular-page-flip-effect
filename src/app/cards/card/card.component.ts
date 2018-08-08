import { Component, OnInit, Input, EventEmitter, Output, ElementRef} from '@angular/core';

function _bottomHandler(event) {
  console.log('Bottom Done!', event.target);
  event.target.removeEventListener('transitionend', bottomHandler);
  if (this.animationBottomDone) {
    this.animationBottomDone.emit(true);
    this.sendToBack = true;
  }
}
let bottomHandler;

function _topHandler(event) {
  console.log('Up Done!', event.target);
  event.target.removeEventListener('transitionend', bottomHandler);
  if (this.animationTopDone) {
    this.animationTopDone.emit(true);
  }
}
let topHandler;

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() topFlipped: boolean;
  @Input() id: string;
  _animateTop;

  @Input('animationTop')
  set animationTop(value) {
    console.log('asdsa', value);
    if (value) {
      const topElement = this.el.nativeElement.querySelector('.card-top');
      topElement.addEventListener('transitionend', topHandler);
    }
    this._animateTop = value;
  }
  get animationTop(): boolean {
    return this._animateTop;
  }

  @Output() animationBottomDone: EventEmitter<any> = new EventEmitter();
  @Output() animationTopDone: EventEmitter<any> = new EventEmitter();
  bottomCardAnimation = false;
  sendToBack = false;
  constructor(private el: ElementRef) { }

  ngOnInit() {
    bottomHandler = _bottomHandler.bind(this);
    topHandler = _topHandler.bind(this);
  }

  onClickUp(cardBottom) {
    this.bottomCardAnimation = true;
    cardBottom.addEventListener('transitionend', bottomHandler);
  }

  onClickDown() {
    this.bottomCardAnimation = false;
  }

}
