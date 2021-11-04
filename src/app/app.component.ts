import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from './leathership/models/commerce';
//
import { CartService } from './leathership/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'Leathership Casablanca - Be a Leader! Not a Follower';

  cart_Session_ID!: string | null;

  // RxJS Part
  subscriptions: Subscription = new Subscription();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart_Session_ID = sessionStorage.getItem('cart_Session');
    this.initCart();
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
