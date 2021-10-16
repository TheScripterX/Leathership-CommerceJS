import { Component, OnInit } from '@angular/core';
// Swiper
import Swiper, { SwiperOptions, Navigation, Scrollbar, Autoplay } from 'swiper';

Swiper.use([Navigation, Scrollbar, Autoplay]);

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  ngOnInit() {
    this.filterBtn();
    this.initFeaturesSwiper();
    this.initReviewsSwiper();
  }

  filterBtn() {
    let filterBtn = document.querySelectorAll('.filter__buttons .buttons');
    let filterItem = document.querySelectorAll(
      '.products .box__container .box'
    );

    filterBtn.forEach((button: any) => {
      button.onclick = () => {
        filterBtn.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');

        let dataFilter = button.getAttribute('data-filter');

        filterItem.forEach((item) => {
          item.classList.remove('active');
          item.classList.add('hide');

          if (
            item.getAttribute('data-item') == dataFilter ||
            dataFilter == 'all'
          ) {
            item.classList.remove('hide');
            item.classList.add('active');
          }
        });
      };
    });
  }

  initFeaturesSwiper() {
    let swiper = new Swiper('.featured__slider', {
      centeredSlides: true,
      loop: true,
      spaceBetween: 20,
      autoplay: {
        delay: 9500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        450: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    });
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
      },
    });
  }
}
