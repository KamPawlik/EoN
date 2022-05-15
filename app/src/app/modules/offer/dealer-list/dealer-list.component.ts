import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Dealer } from '../offer.interface';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-dealer-list',
  templateUrl: './dealer-list.component.html',
  styleUrls: ['./dealer-list.component.scss']
})
export class DealerListComponent implements OnInit {

  dealers$: Observable<Dealer[]>;

  constructor(private offerService: OfferService) {
    this.dealers$ = this.offerService.getDealers();
  }

  ngOnInit(): void {}

}
