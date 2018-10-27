import { Input } from "@angular/core";

export abstract class CardFlip {
  @Input()
  id: string;
  @Input()
  width: number;
  @Input()
  height: number;
  @Input()
  bottomDeg = 0;
  @Input()
  topDeg = 0;
  @Input()
  cssClass;
  @Input()
  template;
}
