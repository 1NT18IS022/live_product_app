import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService:ProductService)  { }
  products:Product[]=[];
  filteredproducts:Product[]=[];
  categories:string[]=[];
  categoryVal:string="all";
  searchInput:string="";
  ngOnInit(): void {
    this.productService.getProductList().subscribe(
      (data)=>{
            this.products=data;
            this.filteredproducts=this.products;
            this.categories=[...new Set(data.map(product=>product.category))];
      }
    )

  }



  onCategoryChange(){

   
    if(this.categoryVal=="all" && !this.searchInput)
    {
   this.filteredproducts=this.products;
    }
    else if(this.categoryVal!="all" && this.searchInput)
    {
      this.filteredproducts=this.products.filter((product)=>{
        return product.category==this.categoryVal &&  product.title.toLowerCase().startsWith(this.searchInput.toLowerCase());
      })
    }
    else if(this.categoryVal=="all" && this.searchInput)
    {
       this.filteredproducts=this.products.filter((product)=>{
        return   product.title.toLowerCase().startsWith(this.searchInput.toLowerCase());
      })
    }
     else
     {
      this.filteredproducts=this.products.filter((product)=>{
        return product.category==this.categoryVal;
      })
     }
     
  }

  onSearch()
  {
    if(!this.searchInput && this.categoryVal=="all")
    {
      this.filteredproducts=this.products;
      
    }
    else if(this.categoryVal!="all" && this.searchInput)
    {
      console.log("hi");
      this.filteredproducts=this.products.filter((product)=>{
        return product.category==this.categoryVal &&  product.title.toLowerCase().startsWith(this.searchInput.toLowerCase()) && product.category==this.categoryVal;
      })
    }
    else if(!this.searchInput && this.categoryVal!="all")
    {
       this.filteredproducts=this.products.filter((product)=>{
        return product.category==this.categoryVal 
      })
    }
    else{
        this.filteredproducts=this.products.filter(
        (product)=>{
          return product.title.toLowerCase().startsWith(this.searchInput.toLowerCase());
        }
       )
    }
     
    
  }

}
