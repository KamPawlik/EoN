import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { Dealer, Offer, OfferDetail, OfferList } from './offer.interface';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  public getOffers(page = 1, sorting = null, filters = null): Observable<any> {
    let filter: string = '';

    if (sorting) {
      Object.entries(sorting).forEach(([key, val]) => {
        filter += `&${key}=${val}`;
      });
    }

    if (filters) {
      Object.entries(filters).forEach(([key, val]) => {
        if (Array.isArray(val)) {
          filter += `&${key}=`;
          val.forEach((value, i) => {
            if (i===0) {
                  filter += value;
            } else {
              filter += `,${value}`;
            }
          })
        } else if(val){
          filter += `&${key}=${val}`;
        }
      })
    }
    return this.http.get<OfferList>(`${environment.apiUrl}/api/offers/?page=${page}${filter}`);
  }

  public getOfferDetails(id: number) {
    return this.http.get<OfferDetail>(`${environment.apiUrl}/api/offers/${id}`);
  }

  public getPromotionalOffers() {
    return this.http.get<Offer[]>(`${environment.apiUrl}/api/offers/promotions`)
  }

  public getLatestOffers() {
    return this.http.get<Offer[]>(`${environment.apiUrl}/api/offers/latest/`)
  }

  public getDealers() {
    return this.http.get<Dealer[]>(`${environment.apiUrl}/api/dealers/`)
  }
}
