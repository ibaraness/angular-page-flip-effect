import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardsComponent } from "./cards.component";
import { CardComponent } from "./card/card.component";
import { HAMMER_GESTURE_CONFIG } from "@angular/platform-browser";
import { MyHammerConfig } from "./hammerjs/hammer-config";
import { CardFlipAnimationComponent } from './card/card-flip-animation/card-flip-animation.component';
import { CardFlipPanComponent } from './card/card-flip-pan/card-flip-pan.component';

@NgModule({
  imports: [CommonModule],
  exports: [CardsComponent],
  declarations: [CardsComponent, CardComponent, CardFlipAnimationComponent, CardFlipPanComponent],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ]
})
export class CardsModule {}
