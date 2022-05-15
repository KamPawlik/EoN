import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { OfferService } from '../../offer/offer.service';

import { Swiper, SwiperOptions } from 'swiper';
import { Router } from '@angular/router';
import { Offer } from '../../offer/offer.interface';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

  @ViewChild('latestSwiper')
  latestSwiper;
  latestSwiperWrapper: Swiper;
  latestSwiperLoaded: boolean;

  @ViewChild('promotionsSwiper')
  promotionsSwiper;
  promotionsSwiperWrapper: Swiper;
  promotionsSwiperLoaded: boolean;

  categories = ['Mieszkanie', 'Dom']

  searchParams = {
    category: null,
    price_min: null,
    price_max: null,
    city: null
  }

  promotionalOffers$: Observable<Offer[]>;
  latestOffers$: Observable<Offer[]>;

  swiperBaseConfig: SwiperOptions = {
    allowTouchMove: true,
    spaceBetween: 30,
    watchOverflow: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    breakpoints: {
      691: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      983: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
    },
  };

  constructor(
    private offerService: OfferService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
    this.promotionalOffers$ = this.offerService.getPromotionalOffers();
    this.latestOffers$ = this.offerService.getLatestOffers();
  }

  ngOnInit(): void {}

  latestSwiperInit() {
    setTimeout(()=> {
      this.latestSwiperLoaded = true;
    }, 300)
    this.cdr.detectChanges();
    this.latestSwiperWrapper = this.latestSwiper.swiperRef;
  }

  promotionsSwiperInit() {
    setTimeout(()=> {
      this.promotionsSwiperLoaded = true;
    }, 300)
    this.cdr.detectChanges();
    this.promotionsSwiperWrapper = this.promotionsSwiper.swiperRef;
  }

  search() {
    const queryParams = {};
    Object.entries(this.searchParams).forEach(param => {
      const [key, value] = param;
      value ? queryParams[key] = value : null;
    });
    this.router.navigate(['/nieruchomosci', queryParams],);
  }
}
