import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards.component';
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [CardsComponent],
  declarations: [CardsComponent, CardComponent]
})
export class CardsModule { }
