import { Component, OnDestroy, OnInit } from '@angular/core';
//
import { CartService } from '../../leathership/services/cart.service';
//
import { LineItem } from '../../leathership/models/commerce';
//
import { Subscription } from 'rxjs';
// Test Resolve
import {
  // NavigationCancel,
  // NavigationEnd,
  // NavigationError,
  // NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  cart_Session: any;
  cart_Items!: LineItem[];
  _totalItems: any;

  // RxJS Part
  subscriptions: Subscription = new Subscription();

  constructor(public router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartSession();
    this.getTotalItems();
  }

  getCartSession() {
    const cart_Session = sessionStorage.getItem('cart_Session');

    if (cart_Session) {
      this.getCartItems(cart_Session);
    } else {
      console.log('No Session');
    }
  }

  getCartItems(cart_Session: string) {
    this.subscriptions.add(
      this.cartService.getCartContents(cart_Session).subscribe(
        (items) => {
          this.cart_Items = items;
          // this.totalItem = items.length;
        },
        (err) => {
          console.error('Navbar Count Error ', err);
        },

        () => {
          console.log('Navbar Count Complete', this.cart_Items);
        }
      )
    );
  }

  getTotalItems() {
    this.subscriptions.add(
      this.cartService._totalItems$.subscribe((data: any) => {
        console.log('Navbar$ Total Items : ', data);
        this._totalItems = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
