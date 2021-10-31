import { Component, OnInit } from '@angular/core';
import { Cart } from './leathership/models/commerce';
//
import { CartService } from './leathership/pages/cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'Leathership Casablanca - Be a Leader! Not a Follower';

  cart_Session_ID: any;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart_Session_ID = sessionStorage.getItem('cart_Session');
    this.initCart();
  }

  initCart() {
    if (this.cart_Session_ID) {
      this.cartService
        .retrieveCart(this.cart_Session_ID)
        .subscribe((cart: Cart) => {
          // this.cartService.cart_Items?.next(...cart.line_items);
          // console.log('Cart Items : ', this.cartService.cart_Items);
          console.log('Init Success : ', cart.line_items);
          this.cartService._totalItems$.next(cart.total_unique_items);
          console.log(
            'Init Total Items: ',
            this.cartService._totalItems$.getValue()
          );
        });
    } else {
      this.cartService.initCart().subscribe((cart) => {
        sessionStorage.setItem('cart_Session', cart.id);
      });
    }
  }
}
