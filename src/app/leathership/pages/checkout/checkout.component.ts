import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
//
import { CheckoutService } from '../../services/checkout.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private checkoutService: CheckoutService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCheckout();
  }

  getCheckout() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.checkoutService.initCheckout(id);
        })
      )
      .subscribe(
        (checkout) => {
          console.log('Checkout : ', checkout);
        },

        (err) => {
          console.log('Error in Checkout Component : ', err);
        },
        () => {
          console.log('Checkout Done!');
        }
      );
  }
}
