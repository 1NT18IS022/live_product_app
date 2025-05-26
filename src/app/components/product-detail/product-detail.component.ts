import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!:Product;
  userid!:number;
  constructor(private route:ActivatedRoute,private productservice:ProductService,private cartService:CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params)=>{
        this.userid=params['id'];
      }
    )

    this.productservice.getProductById(this.userid).subscribe((data)=>{
       this.product=data;
    })


  }

  
  addToCart(userid:string)
  {
    this.cartService.addToCart(this.product);
  }


}
