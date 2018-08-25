import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';
export const cardAnimationTriggers = [
  trigger('bottomCardStateOld', [
    state('foldedOut', style({
      transform: 'rotateX(0deg)',
    })),
    state('foldedIn', style({
      transform: 'rotateX(90deg)',
    })),
    transition('foldedOut => foldedIn', animate('500ms ease-in')),
    transition('foldedIn => foldedOut', animate('500ms ease-out'))
  ]),
  trigger('bottomCardState', [
    state('foldedOut', style({
      transform: '*',
    })),
    state('foldedIn', style({
      transform: '*',
    })),
    transition('foldedIn => foldedOut', [
      style({transform: '*'}),
      animate('500ms ease-out', style({transform: 'rotateX(0deg)'}))
    ]),
    transition('foldedOut => foldedIn', [
      style({transform: '*'}),
      animate('500ms ease-out', style({transform: 'rotateX(90deg)'}))
    ])
  ]),
  trigger('bottomCardScreenState', [
    state('transparent', style({
      opacity: '0',
    })),
    state('opaque', style({
      opacity: '1',
    })),
    transition('transparent => opaque', animate('500ms ease-in')),
    transition('opaque => transparent', animate('500ms ease-out'))
  ]),

  trigger('topCardState', [
    state('foldedIn', style({
      transform: 'rotateX(-90deg)',
    })),
    state('foldedOut', style({
      transform: 'rotateX(0deg)',
    })),
    transition('foldedIn => foldedOut', animate('500ms ease-out')),
    transition('foldedOut => foldedIn', animate('500ms ease-in'))
  ])
];
