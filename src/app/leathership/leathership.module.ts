import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
    LeathershipRoutingModule,
    SwiperModule,
    ReactiveFormsModule,
    CartModule,
  ],
})
export class LeathershipModule {}
