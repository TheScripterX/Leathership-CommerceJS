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

@NgModule({
  declarations: [
    HomepageComponent,
    HomeSliderComponent,
    FeaturedSliderComponent,
    ReviewSliderComponent,
    ExclusiveProductComponent,
  ],
  imports: [CommonModule, LeathershipRoutingModule, SwiperModule],
  exports: [HomepageComponent, HomeSliderComponent],
})
export class LeathershipModule {}
