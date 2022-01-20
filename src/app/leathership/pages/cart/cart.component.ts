import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//
import { Cart } from '../../models/commerce';
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

  // Spinner Part
  loading: boolean = false;

  // RxJS Part
  subscriptions: Subscription = new Subscription();
  total_Items$ = new Subject<number>();

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.total_Items$ = this.cartService._totalItems$;
    this.getCartItems();
  }

  getCartItems() {
    this.subscriptions.add(
      this.route.data.subscribe((data) => {
        this.cart = data.cart;
      })
    );
  }

  removeCartItem(id: string) {
    this.loading = true;
    this.subscriptions.add(
      this.cartService.removeItemFromCart(this.cart.id, id).subscribe(() => {
        this.getCartItems$();
      })
    );
  }

  getCartItems$() {
    const cart_Session = sessionStorage.getItem('cart_Session');
    this.subscriptions.add(
      this.cartService.retrieveCart(cart_Session!).subscribe((data) => {
        this.cart = data;
        this.cartService._totalItems$.next(data.total_unique_items);
      })
    );
  }

  emptyCart() {
    this.loading = true;
    this.subscriptions.add(
      this.cartService.emptyCart(this.cart.id).subscribe(() => {
        console.log('Cart Empty Sucess ! ', this.cart.id);
        this.getCartItems$();
      })
    );
  }

  checkout() {
    this.router.navigate(['/checkout', this.cart.id]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
