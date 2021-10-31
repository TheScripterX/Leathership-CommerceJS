import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
//
import { LineItem } from '../../models/commerce';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}
}
