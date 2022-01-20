import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from './leathership/models/commerce';
//
import { CartService } from './leathership/services/cart.service';
import { CheckoutService } from './leathership/services/checkout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  loading = false;

  switchFN: boolean = true;

  title: string = 'Leathership Casablanca - Be a Leader! Not a Follower';

  cart_Session_ID!: string | null;

  // RxJS Part
  subscriptions: Subscription = new Subscription();

  constructor(
    public router: Router,
    private cartService: CartService,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.cart_Session_ID = sessionStorage.getItem('cart_Session');
    this.checkoutService.switchFN.subscribe((value) => {
      this.switchFN = value;
    });
    this.initResolve();
    this.initCart();
  }

  initResolve() {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationStart) {
        this.loading = true;
      } else if (
        ev instanceof NavigationEnd ||
        ev instanceof NavigationCancel ||
        ev instanceof NavigationError
      ) {
        this.loading = false;
      }
    });
  }

  initCart() {
    if (this.cart_Session_ID) {
      this.subscriptions.add(
        this.cartService
          .retrieveCart(this.cart_Session_ID)
          .subscribe((cart: Cart) => {
            this.cartService._totalItems$.next(cart.total_unique_items);
          })
      );
    } else {
      this.subscriptions.add(
        this.cartService.initCart().subscribe((cart) => {
          sessionStorage.setItem('cart_Session', cart.id);
        })
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
