import { CardsComponent } from './../../cards.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CardFlipAnimationComponent } from '../../card/card-flip-animation/card-flip-animation.component';

@Component({
  selector: 'app-cards-pan',
  templateUrl: './cards-pan.component.html',
  styleUrls: ['./cards-pan.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardsPanComponent extends CardsComponent {
  onPanUp(degree, index) {
    const card = this.cardComponentsArray[index] as CardFlipAnimationComponent;

    if (degree >= 90) {
      // Limit to 90 deg, afterwards wait for the transitionend event and then continue
      if (degree > 90) {
        this.animationState = { animation: "active", degree };
        if(this.animationState.degree > 90){
          console.log("above 90 degrees");
          this.flipUp();
          this.activePan = false;
        }
      }
      return;
    }
    this.activePan = true;
    card.bottomDeg = degree;
  }

  onPanDown(degree, index) {
    const card = this.cardComponentsArray[index] as CardFlipAnimationComponent;

    if (degree <= -90) {
      // Limit to 90 deg, afterwards wait for the transitionend event and then continue
      if (degree < -90) {
        this.flipDown();
        // Stop pan
        this.activePan = false;

        // this.animationState = { animation: "active", degree };
        // if(this.animationState.degree > 90){
        //   console.log("above 90 degrees");
        //   this.flipUp();
        // }
      }
      return;
    }
    this.activePan = true;
    card.topDeg = degree;
  }

  onCardTransitionEnd(index) {
    console.log("Transition end!");
    const card = this.cardComponentsArray[index] as CardFlipAnimationComponent;
    if (this.animationState && this.animationState.animation === "active") {
      // if(this.animationState.degree > 90){
      //   console.log("above 90 degrees");
      //   this.flipUp();
      // }
      // const degree = this.animationState.degree;
      // card.sendToBack = degree > 90 ? true : false;
      // if (index > 1) {
      //   const previouseCard = this.cardComponentsArray[
      //     index - 1
      //   ] as CardFlipAnimationComponent;
      //   previouseCard.topDeg = degree - 180;
      // }
      // card.bottomDeg = degree;
      // this.animationState = undefined;
    }
  }
}
