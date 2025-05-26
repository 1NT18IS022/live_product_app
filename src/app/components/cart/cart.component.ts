import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 filteredproducts:Product[]=[];
 totalPrice:number=0;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
   this.filteredproducts=this.cartService.getCartItems();
   this.filteredproducts.map((product)=>{
    product.quantity=1;
    this.totalPrice=product.price+this.totalPrice;
   })
  
  }

  removeItem(id:string)
  {
   
    this.filteredproducts=  this.filteredproducts.filter((product)=>
    product.id!=id);

    this.totalPrice = this.filteredproducts.reduce((total, product) => {
  return total +  (product.price ) * (product.quantity ?? 0 );
}, 0);
   
    
   
  
  }

  increaseQuantity(productid:string)
  {
     const product=this.filteredproducts.find(product=>product.id===productid)! ;
    
    if(product)
    {
      let qty=product.quantity!;
      product.quantity=qty+1;
       this.totalPrice+=product.price;
    }
    
  }

   decreaseQuantity(productid:string)
  {
    const product=this.filteredproducts.find(product=>product.id===productid)! ;
    
    if(product)
    {
      let qty=product.quantity!;
      if(qty>=1)
      product.quantity=qty-1;
     this.totalPrice-=product.price;
    }
   
    
  }

}
