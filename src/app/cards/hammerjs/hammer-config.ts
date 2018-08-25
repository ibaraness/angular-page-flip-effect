import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG
} from "@angular/platform-browser";
import * as Hammer from "hammerjs";
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    pan: { direction: Hammer.DIRECTION_VERTICAL },
    //swipe: { direction: Hammer.DIRECTION_VERTICAL }
  };
}
