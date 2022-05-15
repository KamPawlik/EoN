import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('toggleMenu', [
      state('*', style({ height: 0 })),
      state(
        'open',
        style({
          height: '*',
        })
      ),
      state(
        'closed',
        style({
          height: 0,
        })
      ),
      transition('* => *', [animate('0.4s')]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  showMenu: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
