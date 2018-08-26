import { CardFlipAnimationComponent } from './../card-flip-animation/card-flip-animation.component';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { cardAnimationTriggers } from '../animation-triggers/animation-triggers';

@Component({
  selector: 'app-card-flip-pan',
  templateUrl: './card-flip-pan.component.html',
  styleUrls: ['./card-flip-pan.component.scss'],
  animations: cardAnimationTriggers
})
export class CardFlipPanComponent extends CardFlipAnimationComponent implements OnInit {

  public bottomDeg = 0;
  public topDeg = 0;
  public pixelToDegree;

  private panUpStart = false;
  private panDownStart = false;
  private panUpChange: EventEmitter<any> = new EventEmitter();
  private panDownChange: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.pixelToDegree = 90 / (this.height / 3);
    this.handlePanUp();
    this.handlePanDown();
  }

  onPanDown(event) {
    //console.log("onPanDown", event);
    this.panDownChange.emit(event);
  }

  onPanUp(event) {
    this.panUpChange.emit(event);
  }

  handlePanDown() {
    // if (this.disableBottomAnimation) {
    //   return;
    // }
    this.panDownChange
      .asObservable()
      .pipe(debounceTime(10))
      .subscribe(event => {
        console.log("panDownChange", this.panDownStart, this.topDeg)
        if (this.panDownStart && this.topDeg > -90) {
          this.topDeg = event.distance * this.pixelToDegree * -1;
        } else if (this.panUpStart && this.topDeg <= -80) {
          this.panDownStart = false;
          this.animationTop = "foldedIn";
          // this.topDeg = -90;
          // setTimeout(() => {
          //   this.manuallyTriggerTopDone();
          // });
        }
      });
  }

  handlePanUp() {
    if (this.disableTopAnimation) {
      return;
    }
    this.panUpChange
      .asObservable()
      .pipe(debounceTime(10))
      .subscribe(event => {
        if (this.panUpStart && this.bottomDeg < 90) {
          this.bottomDeg = event.distance * this.pixelToDegree;
        } else if (this.panUpStart && this.bottomDeg > 80) {
          this.panUpStart = false;
          // this.bottomDeg = 90;
          // setTimeout(() => {
          //   this.manuallyTriggerbottomDone();
          // });
          this.animationBottom = "foldedIn";
        }
      });
  }

  onPanEnd(event) {
    if (this.panUpStart && !this.disableTopAnimation) {
      if (this.bottomDeg < 89) {
        this.bottomDeg = 0;
      }
      this.panUpStart = false;
      if (event.overallVelocityY * -1 > 0.1) {
        // this.bottomDeg = 90;
        // setTimeout(() => {
        //   this.manuallyTriggerbottomDone();
        // });
        this.animationBottom = "foldedIn";
      }
    }

    if(this.panDownStart){
      if (event.overallVelocityY > 0.1) {
        this.animationTop = "foldedIn";
        // this.topDeg = -90;
        // setTimeout(() => {
        //   this.manuallyTriggerTopDone();
        // });
      }
    }
    console.log("onPanEnd", event.overallVelocityY);
  }

  manuallyTriggerTopDone() {
    setTimeout(()=>{
      this.topFoldInDone.emit(true);
    })

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
    this.panUpStart = event.additionalEvent === 'panup' ? true : false;
    this.panDownStart = event.additionalEvent === 'pandown' ? true : false;
    if (this.panDownStart) {
      this.topFoldInStart.emit(true);
    }
    console.log("onPanStart", event);
  }

}
