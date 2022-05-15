import { Component, Input, OnInit } from '@angular/core';
import { Dealer } from '../offer.interface';

@Component({
  selector: 'app-dealer-card',
  templateUrl: './dealer-card.component.html',
  styleUrls: ['./dealer-card.component.scss']
})
export class DealerCardComponent implements OnInit {

  @Input() dealer: Dealer;
  @Input() hiddenButton: boolean;
  @Input() isLoading: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
