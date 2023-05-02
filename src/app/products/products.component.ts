import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../service/products.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products!: Array<Product>;
  errorMessage!: string;
  constructor(private productsService : ProductsService) { }

  ngOnInit(): void {
    this.handleGetProducts();

  }
  handleGetProducts() {
    this.productsService.getProducts().subscribe(data => {
        this.products = data;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  handleDeleteProduct(p: Product) {
    let conf = confirm('Are you sure?');
    if (!conf) return;
    this.productsService.deleteProduct(p.id).subscribe(data => {
      // this.handleGetProducts();
      let index = this.products.indexOf(p);
      this.products.splice(index, 1);
      });

  }

  handleSetPromotion(p : Product) {
    this.productsService.setPromotion(p.id, !p.promotion).subscribe(data => {
      p.promotion = !p.promotion;
    },
      error => {
        this.errorMessage = error;
      }
    );
  }
}
