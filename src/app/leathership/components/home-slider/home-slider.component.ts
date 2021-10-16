import { Component, OnInit, ViewChild } from '@angular/core';
import Swiper, { SwiperOptions, Navigation, Scrollbar, Autoplay } from 'swiper';

Swiper.use([Navigation, Scrollbar, Autoplay]);

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss'],
})
export class HomeSliderComponent implements OnInit {
  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  ngOnInit() {
    // this.initSwiper();
    this.initSwiper();
  }

  initSwiper() {
    let swiper = new Swiper('.home__slider', {
      centeredSlides: true,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // autoplay: {
      //   delay: 4500,
      //   disableOnInteraction: false,
      // },
    });
  }
}
