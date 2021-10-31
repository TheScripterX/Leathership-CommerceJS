import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HomeSliderComponent } from './components/home-slider/home-slider.component';
//
import { LeathershipRoutingModule } from './leathership-routing.module';
import { SwiperModule } from 'swiper/angular';
//
import { FeaturedSliderComponent } from './components/featured-slider/featured-slider.component';
import { ReviewSliderComponent } from './components/review-slider/review-slider.component';
import { ExclusiveProductComponent } from './components/exclusive-product/exclusive-product.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { SinglePageProductComponent } from './pages/single-page-product/single-page-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CartModule } from './pages/cart/cart.module';

@NgModule({
  declarations: [
    HomepageComponent,
    HomeSliderComponent,
    FeaturedSliderComponent,
    ReviewSliderComponent,
    ExclusiveProductComponent,
    SingleProductComponent,
    SinglePageProductComponent,
  ],
  imports: [
    CommonModule,
    LeathershipRoutingModule,
    SwiperModule,
    ReactiveFormsModule,
    CartModule,
  ],
  exports: [
    HomepageComponent,
    HomeSliderComponent,
    SinglePageProductComponent,
    SingleProductComponent,
  ],
})
export class LeathershipModule {}
