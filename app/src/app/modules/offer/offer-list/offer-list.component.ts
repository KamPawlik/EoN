import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { repeatWhen, switchMap, tap } from 'rxjs/operators';

import { OfferService } from '../offer.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss'],
})
export class OfferListComponent implements OnInit {
  offers$: Observable<any>;
  private readonly fetchNewOffers$ = new Subject<void>();

  @ViewChild('cityInput') cityInput;

  currentPage: number;
  isLoading: boolean = false;
  showDealer: boolean = false;

  orderBy = [
    { name: 'domyślnie', value: 'default' },
    { name: 'cena od najniższej', value: 'price_min' },
    { name: 'cena od najwyższej', value: 'price_max' },
    { name: 'najnowsze', value: 'latest' },
    { name: 'najstarsze', value: 'oldest' },
  ];
  pageSize = [1, 2, 4, 8];
  categories = ['Mieszkanie', 'Dom'];

  defaultFilters;
  activeFilters;
  selectedFilters = this.fb.group({
    dealer: null,
    category: null,
    price_min: null,
    price_max: null,
    rooms_min: null,
    rooms_max: null,
    sqm_min: null,
    sqm_max: null,
    city: [],
  });
  customFilters: boolean = false;
  isLoaded;

  sortingFilters = {
    orderby: 'default',
    page_size: 4,
  };

  constructor(
    private offerService: OfferService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.defaultFilters = { ...this.selectedFilters.value };

    this.route.paramMap.subscribe((params) => {
      if(params.keys.length) {
        let counter = 0;
        params.keys.forEach(value => {
          if(this.selectedFilters.contains(value)) {
            if (value == 'city') {
              this.selectedFilters.controls[value].setValue(
                [params.get(value)]
              );
              counter++;
            } else {
              if (value == 'dealer') {
                this.showDealer = true;
                this.defaultFilters.dealer = params.get(value);
              } else {
                counter++;
              }
              this.selectedFilters.controls[value].setValue(
                params.get(value)
              );
            }
          }
        });
        counter ? this.customFilters = true : null;
      }

      this.activeFilters = {
        ...this.selectedFilters.value,
      };
      this.isLoaded = true;
    });

    this.offers$ = this.offerService.getOffers().pipe(
      switchMap(() =>
        this.offerService.getOffers(
          this.currentPage,
          this.sortingFilters,
          this.activeFilters
        )
      ),
      tap(() => (this.isLoading = false)),
      repeatWhen(() => this.fetchNewOffers$)
    );
  }

  handlePagination(el) {
    this.currentPage = el;
    this.fetchNewOffers$.next();
    this.isLoading = true;
  }

  handleFilters() {
    this.customFilters = true;
    this.activeFilters = { ...this.selectedFilters.value };
    this.currentPage = 1;
    this.fetchNewOffers$.next();
    this.isLoading = true;
    this.selectedFilters.markAsPristine();
  }

  handleSorting(selectFirstPage) {
    selectFirstPage ? (this.currentPage = 1) : null;
    this.fetchNewOffers$.next();
    this.isLoading = true;
  }

  resetFilters() {
    this.selectedFilters.setValue({ ...this.defaultFilters });
    this.activeFilters = { ...this.defaultFilters };
    this.selectedFilters.markAsPristine();
    if (this.customFilters) {
      this.customFilters = false;
      this.fetchNewOffers$.next();
      this.isLoading = true;
    }
  }

  onCityBlur() {
    const newCity = this.cityInput.searchTerm;
    if (newCity && !this.checkCity(newCity)) {
      this.selectedFilters.controls['city'].setValue([
        ...this.selectedFilters.controls['city'].value,
        newCity,
      ]);
      this.selectedFilters.markAsDirty();
    }
    this.cityInput.searchTerm = '';
  }

  checkCity(city) {
    if (this.selectedFilters.controls['city'].value) {
      return this.selectedFilters.controls['city'].value.some(function (el) {
        return el === city;
      });
    } else {
      this.selectedFilters.controls['city'].setValue([
        city,
      ]);
      this.selectedFilters.markAsDirty();
      return true;
    }
  }

  removeCity(city) {
    this.selectedFilters.controls['city'].setValue(
      this.selectedFilters.controls['city'].value.filter((el) => el != city)
    );
  }
}
