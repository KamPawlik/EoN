import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import '@angular/common/locales/global/pl';
import { LOCALE_ID } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { OfferModule } from './modules/offer/offer.module';
import { SharedModule } from './modules/shared/shared.module';

import { OfferService } from './modules/offer/offer.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/core/header/header.component';
import { FooterComponent } from './modules/core/footer/footer.component';
import { HomeViewComponent } from './modules/core/home-view/home-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    OfferModule,
    NgSelectModule,
    SharedModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pl-PL" },
    OfferService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
