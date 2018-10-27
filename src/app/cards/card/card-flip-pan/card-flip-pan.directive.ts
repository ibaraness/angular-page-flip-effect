import {
  Directive,
  ElementRef,
  HostListener,
  EventEmitter,
  Renderer2,
  Input,
  Output,
  AfterViewInit
} from "@angular/core";
import { debounceTime } from "rxjs/operators";

@Directive({
  selector: "[appCardFlipPan]"
})
export class CardFlipPanDirective implements AfterViewInit {
  private _height: number;
  @Input()
  set height(height: number) {
    if (height) {
      this.relativePerDegree = height / 2 / 100;
      this._height = height;
    }
  }
  get height() {
    return this._height;
  }
  private _isPanActive = false;
  @Input()
  set isPanActive(isPanActive: boolean) {
    this._isPanActive = isPanActive;
  }
  get isPanActive(): boolean {
    return this._isPanActive;
  }

  @Output()
  panUpChange: EventEmitter<number> = new EventEmitter();

  @Output()
  panDownChange: EventEmitter<number> = new EventEmitter();

  @Output()
  cardTransitionEnd: EventEmitter<boolean> = new EventEmitter();

  private relativePerDegree: number;
  private panningUp: boolean;

  constructor(private el: ElementRef, renderer: Renderer2) {
    renderer.setStyle(el.nativeElement, "display", "block");
  }

  ngAfterViewInit(): void {
    const bottom = this.el.nativeElement.querySelector(".card-bottom");
    bottom.addEventListener("transitionend", event => {
      this.cardTransitionEnd.emit(true);
      // console.log("Transition end", event);
    });
  }

  deactivatePan() {
    this._isPanActive = false;
  }

  @HostListener("panstart", ["$event"])
  onPanStart(event) {
    this.panningUp = event.additionalEvent === "panup";
    this._isPanActive = true;
    console.log("Pan start!", event);
  }

  @HostListener("panup", ["$event"])
  onPanUp(event) {
    this.updateHost(event.distance);
  }

  @HostListener("pandown", ["$event"])
  onPanDown(event) {
    this.updateHost(event.distance);
  }

  @HostListener("panend", ["$event"])
  onPanEnd($event) {
    this._isPanActive = false;
    this.panUpChange.emit(0);
    this.panDownChange.emit(0);
  }

  private updateHost(distance): void {
    if (this.relativePerDegree && distance && this._isPanActive) {
      const degree = 0.9 * (distance / this.relativePerDegree); // calculate the current degree
      if (this.panningUp) {
        this.panUpChange.emit(degree);
      } else {
        this.panDownChange.emit(degree * -1);
      }
    }
  }
}
