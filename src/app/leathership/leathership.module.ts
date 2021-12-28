import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
//
import { DialogModule } from '@ngneat/dialog';
//
import { LeathershipRoutingModule } from './leathership-routing.module';
import { SwiperModule } from 'swiper/angular';
import { CartModule } from './pages/cart/cart.module';
//
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ReviewSliderComponent } from './pages/homepage/components/review-slider/review-slider.component';
import { SingleProductComponent } from './pages/single-page-product/components/single-product/single-product.component';
import { SinglePageProductComponent } from './pages/single-page-product/single-page-product.component';
import { FeaturedSliderComponent } from './pages/homepage/components/featured-slider/featured-slider.component';
import { HomeSliderComponent } from './pages/homepage/components/home-slider/home-slider.component';
import { ExclusiveProductComponent } from './pages/homepage/components/exclusive-product/exclusive-product.component';
import { CategorySliderComponent } from './pages/homepage/components/category-slider/category-slider.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomepageComponent,
    HomeSliderComponent,
    FeaturedSliderComponent,
    ExclusiveProductComponent,
    ReviewSliderComponent,
    SingleProductComponent,
    SinglePageProductComponent,
    CategorySliderComponent,
    ProductsPageComponent,
    CheckoutComponent,
    InvoiceComponent,
  ],
  imports: [
    CommonModule,
    //
    DialogModule.forRoot(),
    //
    LeathershipRoutingModule,
    SwiperModule,
    ReactiveFormsModule,
    CartModule,
    SharedModule,
  ],
})
export class LeathershipModule {}
