import { Component, Input, OnInit } from '@angular/core';
import { ProductItem } from 'src/app/shared/models/ProductItem';
import { StoreService } from 'src/app/services/store.service';
import { ModalController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

register();
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  items: ProductItem[] = [];
  isModalOpen = false;
  selectedProduct: any;
  isModalViewAllProductOpen = false;
  public _numberOfItems: number | undefined;
  itemCart: any = [];
  public productData: any;
  public user: any;
  checkExistItem: boolean = true

  constructor(
    private CartService: CartService,
    private StoreService: StoreService,
    private modalController: ModalController,
    private router: Router,
    private productService: StoreService,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    // this.items = this.StoreService.getAllProducts();
    this.getProductRender();
    this.getUserData();
  }

  navigateToProductDetail(item: any) {
    this.router.navigate(['product-detail/', item.ProductName,item.ProductId]);
  }

  navigateToProductAll() {
    this.router.navigate(['product-all/',]);
  }

  subTotal(): number {
    let subTotal = 0;
    for (const product of this.productData) {
      subTotal += product.Old_Price * product.productQuantityAddDefault;
    }
    return subTotal;
  }

  redirectToProductDetail(event: Event, item: any) {
    event.stopPropagation();
    this.navigateToProductDetail(item);
  }

  isConditionTrue: boolean = false;
 
  getUserData() {
    this.userService.getUserData().subscribe(res => {this.user = res?.user;
      console.log("find user: ", this.user)});
  }

  // getProductRender() {
  //   this.productService.getProducts().subscribe(
  //     (res: any) => {
  //       this.productData = res.data.map((item: any) => item.attributes);
  //       console.log("Product lists:", this.productData)
  //     },
  //     (err: any) => {
  //       console.error('Error fetching current store data:', err);
  //     }
  //   );
  // }

  getProductRender() {
    this.productService.getProducts().subscribe(
      (res: any) => {
        this.productData = res.data.map((item: any) => item.attributes);
        console.log("Product lists:", this.productData)
      },
      (err: any) => {
        console.error('Error fetching current store data:', err);
      }
    );
  }

  addProductToCart(event: Event, product: any) {
    event.stopPropagation();
    const productData = {
      ProductName: product.ProductName,
      ProductPrice: product.CurrentPrice,
      QuantityDefault: 1,
      ProductImage: product.ProductImage,
      ProductId: product.ProductId,
      // UserId: `${this.user.UserId}`
    };
    this.CartService.pushProducts(productData).subscribe(
      (response) => {
        console.log('Product added to cart successfully:', response);
        let itemProducts = response.data.id
        console.log("Item ID:",itemProducts)
      },
      (error) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }


  // addProductToCart(event: Event, product: any) {
  //   event.stopPropagation();
    
  //   const productData = {
  //     ProductName: product.ProductName,
  //     ProductPrice: product.CurrentPrice,
  //     QuantityDefault: 1,
  //     ProductImage: product.ProductImage,
  //     ProductId: product.ProductId,
  //     // UserId: this.user.UserId,
  //   };
  
  //   // Chỉ cần gọi pushProducts một lần với cả UserId và productData
  //   this.CartService.pushProducts({
  //     UserId: this.user.UserId,
  //     ProductData: productData
  //   }).subscribe(
  //     (response) => {
  //       console.log('Product added to cart successfully:', response);
  //       let itemProducts = response.data.id;
  //       console.log("Item ID:", itemProducts);
  //     },
  //     (error) => {
  //       console.error('Error adding product to cart:', error);
  //     }
  //   );
  // }


  themSL(event: Event, product: any) {
    event.stopPropagation();
    if (product) {
      if (!product.QuantityDefault) {
        product.QuantityDefault = product.QuantityDefault + 1;
      } else {
        product.QuantityDefault++;
      }
      const productData = {
        QuantityDefault: product.QuantityDefault,
        ProductId: product.ProductId,
      };
      this.CartService.addSL(productData).subscribe(
        (response) => {
          console.log('Add successfully:', response);
          let itemProducts = response.data.ProductId;
          console.log("Add Item ID:", itemProducts);
        },
        (error) => {
          console.error('Error adding product to cart:', error);
        }
      );
    } else {
      console.error('Invalid product object:', product);
    }
  }

  isProductInCart(productId: number): boolean {
    let cartData = JSON.parse(localStorage.getItem('localCart') || '[]');
    return cartData.some((product: any) => product.ProductId === productId);
  }
  

  addProduct(event: Event, item: any) {
    event.stopPropagation();
      this.itemCart = JSON.parse(localStorage.getItem('localCart') || '[]');
        this.itemCart.push(item)
        localStorage.setItem('localCart', JSON.stringify(this.itemCart))
    item.inCart = true
    
  }
  
  cancelProduct(event: Event, item: any) {
    event.stopPropagation();
    let cartData = JSON.parse(localStorage.getItem('localCart') || '[]');
    cartData = cartData.filter((productDel: any) => productDel.ProductId !== item.ProductId); //id = 1, => id = 2 ,id=3 ; => truyền lại cartData => cập nhật bằng setItem 
    localStorage.setItem('localCart', JSON.stringify(cartData));
  }
  

  
  
}
