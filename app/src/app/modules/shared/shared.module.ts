import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { SwiperModule } from 'swiper/angular';
import { NoCommaPipe } from './pipes/no-comma/no-comma.pipe';
import { RoomsPipe } from './pipes/rooms/rooms.pipe';

import { OfferListItemComponent } from '../offer/offer-list-item/offer-list-item.component';
import { HeroComponent } from './components/hero/hero.component';

@NgModule({
  declarations: [
    NoCommaPipe,
    RoomsPipe,
    OfferListItemComponent,
    HeroComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports: [
    NoCommaPipe,
    RoomsPipe,
    SwiperModule,
    OfferListItemComponent,
    HeroComponent,
  ]
})
export class SharedModule { }
