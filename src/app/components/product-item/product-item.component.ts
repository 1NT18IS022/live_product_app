import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
products!: Product[];
  
  constructor() { }
  
  @Input() productItem!:Product;
  @Output() addCart:EventEmitter<string>=new EventEmitter<string>();
  ngOnInit(): void {
  }

  addToCart(productId:string){
      this.addCart.emit(productId);
  }

}
