import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Cart, LineItem } from '../../models/commerce';
//
import { CartService } from './cart.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart!: Cart;
  // cart_Items!: LineItem[];
  cart_Items$ = new Subject<LineItem[]>();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    const cart_Session = sessionStorage.getItem('cart_Session');
    this.cartService.retrieveCart(cart_Session!).subscribe(
      (items) => {
        this.cart = items;
        this.cart_Items$.next(items.line_items);
        this.cartService._totalItems$.next(items.total_unique_items);
      },

      (err) => {
        console.warn('Error in Cart Component : ', err);
      },

      () => {
        console.log('Get Items Finish ...', this.cart.line_items);
      }
    );
  }

  removeCartItem(id: string) {
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
    );
  }

  emptyCart() {
    this.cartService.emptyCart(this.cart.id).subscribe(
      () => {
        console.log('Cart Empty Sucess ! ');
        this.getCartItems();
      },

      (err) => {
        console.warn('Error in emptyCart Function : ', err);
      },

      () => {
        console.log('Cart Empty Finish !');
      }
    );
  }
}
