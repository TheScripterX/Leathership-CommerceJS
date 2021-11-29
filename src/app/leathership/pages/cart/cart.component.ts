import { Component, OnInit } from '@angular/core';
import { Cart, LineItem } from '../../models/commerce';
//
import { CartService } from '../../services/cart.service';
//
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart!: Cart;

  // RxJS Part
  subscriptions: Subscription = new Subscription();
  total_Items$ = new Subject<number>();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.total_Items$ = this.cartService._totalItems$;
    this.getCartItems();
  }

  getCartItems() {
    const cart_Session = sessionStorage.getItem('cart_Session');
    this.subscriptions.add(
      this.cartService.retrieveCart(cart_Session!).subscribe(
        (cart) => {
          this.cart = cart;
          this.cartService._totalItems$.next(cart.total_unique_items);
        },

        (err) => {
          console.warn('Error in Cart Component : ', err);
        },

        () => {
          console.log('Get Items Finish ...', this.cart.line_items);
        }
      )
    );
  }

  removeCartItem(id: string) {
    this.subscriptions.add(
      this.cartService.removeItemFromCart(this.cart.id, id).subscribe(
        () => {
          this.getCartItems();
        },

        (err) => {
          console.warn('Error in Remove Item : ', err);
        },

        () => {
          console.log('Remove Items Finish ...');
        }
      )
    );
  }

  emptyCart() {
    this.subscriptions.add(
      this.cartService.emptyCart(this.cart.id).subscribe(
        () => {
          console.log('Cart Empty Sucess ! ', this.cart.id);
          this.getCartItems();
        },

        (err) => {
          console.warn('Error in emptyCart Function : ', err);
        },

        () => {
          console.log('Cart Empty Finish !');
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
