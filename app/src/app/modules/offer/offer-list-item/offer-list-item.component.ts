import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer-list-item',
  templateUrl: './offer-list-item.component.html',
  styleUrls: ['./offer-list-item.component.scss']
})
export class OfferListItemComponent implements OnInit {

  @Input() offer;
  @Input() isLoading: boolean;
  @Input() verticalMode: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

}
