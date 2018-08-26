import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFlipAnimationComponent } from './card-flip-animation.component';

describe('CardFlipAnimationComponent', () => {
  let component: CardFlipAnimationComponent;
  let fixture: ComponentFixture<CardFlipAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFlipAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFlipAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
