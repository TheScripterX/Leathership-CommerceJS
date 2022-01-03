import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//
import { Subscription } from 'rxjs';

// SwiperJS::Start

import { SwiperOptions } from 'swiper';
// import SwiperCore, { Navigation, Thumbs } from 'swiper';
// SwiperCore.use([Navigation, Thumbs]);

// SwiperJS::End

import { CategoryChildren, Product } from '../../models/commerce';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomepageComponent implements OnInit {
  products: Product[] = [];
  categories!: CategoryChildren[];

  // RxJS Part
  subscriptions: Subscription = new Subscription();

  // SwiperJS Part
  config: SwiperOptions = {
    spaceBetween: 15,
    pagination: {
      clickable: true,
    },
    navigation: true,
    lazy: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      900: {
        slidesPerView: 3,
      },
    },
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.subscriptions.add(
      this.route.data.subscribe(
        (data) => {
          this.products = data['collections'].data;
        },

        (err) => {
          console.warn('Error on Collections Resolve : ', err);
        },

        () => {
          console.info('Success Collections');
        }
      )
    );
  }

  getCategories() {
    this.subscriptions.add(
      this.route.data.subscribe(
        (data) => {
          this.categories = data.categories.children;
        },

        (err) => {
          console.warn('Error on Categories Resolve : ', err);
        },

        () => {
          console.info('Success Categories Resolve');
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
