import { Component, OnInit } from '@angular/core';
// Swiper
import Swiper, { SwiperOptions, Navigation, Scrollbar, Autoplay } from 'swiper';

Swiper.use([Navigation, Scrollbar, Autoplay]);

@Component({
  selector: 'app-review-slider',
  templateUrl: './review-slider.component.html',
  styleUrls: ['./review-slider.component.scss'],
})
export class ReviewSliderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.initReviewsSwiper();
  }

  initReviewsSwiper() {
    let swiper = new Swiper('.review__slide', {
      loop: true,
      spaceBetween: 20,
      autoplay: {
        delay: 9500,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }
}
