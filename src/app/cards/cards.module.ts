import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardsComponent } from "./cards.component";
import { CardComponent } from "./card/card.component";
import { HAMMER_GESTURE_CONFIG } from "@angular/platform-browser";
import { MyHammerConfig } from "./hammerjs/hammer-config";

@NgModule({
  imports: [CommonModule],
  exports: [CardsComponent],
  declarations: [CardsComponent, CardComponent],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ]
})
export class CardsModule {}
