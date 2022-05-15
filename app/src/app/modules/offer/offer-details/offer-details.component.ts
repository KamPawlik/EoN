import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { tap } from 'rxjs/operators';
import { OfferService } from '../offer.service';
import { environment } from '../../../../environments/environment';

import { SwiperOptions } from 'swiper';

import SwiperCore, { Navigation, A11y } from 'swiper/core';
import { Observable } from 'rxjs';
import { OfferDetail } from '../offer.interface';
SwiperCore.use([Navigation, A11y]);

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss'],
})
export class OfferDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService
  ) {}

  apiServer: string = environment.apiUrl;
  offer$: Observable<OfferDetail>;
  swiperActiveId: number = 0;
  swiperElements: number = 0;
  thumbnailsActiveId: number = 0;

  @ViewChild('swiperWrapper') public swiperWrapper: any;
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.offer$ = this.offerService
        .getOfferDetails(params['id'])
          .pipe(
            tap(x => {
              this.swiperElements = x.offer_images.length;
            })
          );
    });
  }

  thumbnailsConfig: SwiperOptions = {
    allowTouchMove: true,
    spaceBetween: 15,
    slidesPerView: 3,
    direction: 'horizontal',
    breakpoints: {
      768: {
        direction: 'vertical',
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
  };

  mainImageConfig: SwiperOptions = {
    autoHeight: true,
    allowTouchMove: false,
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    loop: true
  };

  slideChange() {
    let sliderIndex = Math.floor(this.swiperActiveId / 3);
    if (this.swiperElements + 1 >= sliderIndex * 3 + 2) {
      this.thumbnailsActiveId = sliderIndex * 3;
    } else {
      this.thumbnailsActiveId = (this.swiperActiveId == this.swiperElements)
      ? sliderIndex * 3 - 2
      : sliderIndex * 3 - 1;
    }
  }

  prevSlide() {
    this.swiperActiveId == 0
      ? this.swiperActiveId = this.swiperElements
      : this.swiperActiveId--;
  }

  nextSlide() {
    this.swiperActiveId == this.swiperElements
      ? this.swiperActiveId = 0
      : this.swiperActiveId++;
  }

  goToSlide(el) {
    this.swiperActiveId = el;
  }
}
