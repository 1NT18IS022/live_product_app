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
    this.cartService.getCartItems().subscribe((data)=>{
      this.filteredproducts=data;
      this.totalPrice=this.filteredproducts.reduce((sum,item)=>{
        return sum+= (item.quantity||1) * item.price;
   },0);
    })

   
   
  }

  removeItem(id:string)
  {
  this.cartService.removeItem(id);
  }

  increaseQuantity(productid:string)
  {
     const product=this.filteredproducts.find(productt=>productt.id===productid)! ;
    
    if(product && product.quantity!= null && product.quantity>=0)
    {
   
     
       product.quantity+=1;
       this.totalPrice+=product.price;
    }
    
  }

   decreaseQuantity(productid:string)
  {
    const product=this.filteredproducts.find(productt=>productt.id===productid)! ;
    
    if(product && product.quantity!= null && product.quantity>0)
    {
       product.quantity-=1;
       this.totalPrice-=product.price;
    }
   
    
  }

}
