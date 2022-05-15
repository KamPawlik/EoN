import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
// import { SwiperModule } from 'swiper/angular';

import { SharedModule } from '../shared/shared.module'

import { OfferService } from './offer.service';

import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { DealerCardComponent } from './dealer-card/dealer-card.component';
import { DealerListComponent } from './dealer-list/dealer-list.component';

const routes: Routes = [
  {
      path: 'nieruchomosci',
      children: [
          { path: '', component: OfferListComponent },
          { path: ':id', component: OfferDetailsComponent }
      ]
  },
  { path: 'agenci-nieruchomosci', component: DealerListComponent }
];

@NgModule({
  declarations: [
    OfferListComponent,
    OfferDetailsComponent,
    DealerCardComponent,
    DealerListComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule,
  ],
  providers: [
    OfferService
  ]
})
export class OfferModule { }
