import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//
import { ProductService } from '../../leathership/services/product.service';
import { CartService } from '../../leathership/pages/cart/cart.service';
import { RootCart, LineItem, Cart } from '../../leathership/models/commerce';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('searchForm') searchForm!: ElementRef;
  @ViewChild('menuBtn') menuBtn!: ElementRef;

  cart_Session: any;
  cart_Items!: LineItem[];
  _totalItems: any;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getCartSession();
    this.windowToggler();
    this.getTotalItems();
  }

  togglerSearch() {
    this.searchForm.nativeElement.classList.toggle('active');
  }

  togglerMenu() {
    this.menuBtn.nativeElement.classList.toggle('active');
  }

  windowToggler() {
    window.onscroll = () => {
      this.searchForm.nativeElement.classList.remove('active');
      this.menuBtn.nativeElement.classList.remove('active');
    };
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
    );
  }

  getTotalItems() {
    this.cartService._totalItems$.subscribe((data: any) => {
      console.log('Navbar$ Total Items : ', data);
      this._totalItems = data;
    });
  }
}
