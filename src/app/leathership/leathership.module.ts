import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
//
import { DialogModule } from '@ngneat/dialog';
//
import { LeathershipRoutingModule } from './leathership-routing.module';
import { SwiperModule } from 'swiper/angular';
//
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SinglePageProductComponent } from './pages/single-page-product/single-page-product.component';
import { HomeSliderComponent } from './pages/homepage/components/home-slider/home-slider.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './pages/cart/cart.component';

@NgModule({
  declarations: [
    HomepageComponent,
    HomeSliderComponent,
    SinglePageProductComponent,
    ProductsPageComponent,
    CheckoutComponent,
    InvoiceComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    //
    DialogModule.forRoot(),
    SwiperModule,
    //
    LeathershipRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class LeathershipModule {}
