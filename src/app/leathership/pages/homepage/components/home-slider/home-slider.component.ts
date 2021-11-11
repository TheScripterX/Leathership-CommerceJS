import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// import Swiper core and required modules
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeSliderComponent implements OnInit {
  config: SwiperOptions = {
    lazy: true,
  };

  ngOnInit() {}
}
