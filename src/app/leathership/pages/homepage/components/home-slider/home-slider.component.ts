import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
// import Swiper, { SwiperOptions, Navigation, Scrollbar, Autoplay } from 'swiper';

// Swiper.use([Navigation, Scrollbar, Autoplay]);

import { SwiperComponent } from 'swiper/angular';

// import Swiper core and required modules
import SwiperCore, { Navigation, SwiperOptions } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation]);

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeSliderComponent implements OnInit {
  swiper3!: boolean;

  config: SwiperOptions = {
    navigation: true,
    loop: true,
    lazy: true,
  };

  ngOnInit() {}
}
