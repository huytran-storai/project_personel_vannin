import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController,AlertController, ModalController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';
import { ProductItem } from 'src/app/shared/models/ProductItem';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.page.html',
  styleUrls: ['./product-all.page.scss'],
})
export class ProductAllPage implements OnInit {
  items: ProductItem[] = [];
  public productData: any;
  public UserIdCurrent: any;
  public productRender: any;
  public productOrdered: any;
  public forEachSaveProductId: any
  public forEachStrapiId: any
  public getStrapiIdDelete: any
  public itemID!: number;
  saveItemCart: any = [];
  public renderStrapiId: any;
  public saveRenderStrapiId: any;
  public user: any;

  constructor(
    private CartService: CartService,
    private StoreService: StoreService,
    private router: Router,
    private navCtrl: NavController,
    private productService: StoreService,
    private userService: UserService,
    public alertController: AlertController,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    // this.items = this.StoreService.getAllProducts();
    this.getProductRender();
    this.getUserData();
    const initializationCart = localStorage.getItem('saveCartItems');
    this.renderStrapiId = initializationCart? JSON.parse(initializationCart): [];
  }
  getUserData() {
    this.userService.getUserData().subscribe(
      (res) => {
        this.user = res?.user;
        console.log('find user: ', this.user);
        this.UserIdCurrent = this.user.UserId;
        console.log('find UserIdCurrent: ', this.UserIdCurrent);
      },
      (error) => {
        console.log('Get user data error', error);
      }
    );
  }

  getProductRender() {
    this.productService.getProducts().subscribe(
      (res: any) => {
        this.productData = res.data.map((item: any) => item);
        console.log('Product lists:', this.productData);
      },
      (err: any) => {
        console.error('Error fetching current store data:', err);
      }
    );
  }

  navigateToProductDetail(item: any) {
    this.router.navigate(['product-detail/', item.ProductName,item.ProductId]);
  }

  Back() {
    this.navCtrl.back()
  }

  redirectToProductDetail(event: Event, items: any) {
    event.stopPropagation();
    this.navigateToProductDetail(items);
  }

  itemCart: any = []
  addProduct(event: Event, item: any) {
    if (this.user !== undefined && this.user !== null) {
    event.stopPropagation();
    const productData = {
      ProductName: item.attributes.ProductName,
      ProductPrice: item.attributes.ProductPrice,
      QuantityDefault: 1,
      ProductImage: item.attributes.ProductImage,
      ProductId: item.attributes.ProductId,
      OrderedUserId: this.UserIdCurrent,
    };
    this.CartService.pushProducts(productData).subscribe(
      (response) => {
        const strapiId = response.data.id;
        const saveProductId = response.data.attributes.ProductId;
        const savedCartItemsString = localStorage.getItem('saveCartItems');
        const existingCartItems = savedCartItemsString? JSON.parse(savedCartItemsString): [];
        existingCartItems.push({ ...item, strapiId, saveProductId });
        localStorage.setItem('saveCartItems',JSON.stringify(existingCartItems));
        this.renderStrapiId = existingCartItems;
        window.location.reload();
      },
      (error) => {
        console.error('Error adding product to cart:', error);
      }
    );
    }
    else {
      event.stopPropagation();
      this.alertController
        .create({
          header: 'Thông báo',
          message: 'Vui lòng đăng nhập để thêm sản phẩm',
          buttons: [
            {
              text: 'Đăng nhập',
              handler: () => {
                this.modalController.dismiss();
                this.router.navigate(['./login']);
                setTimeout(() => {
                  window.location.reload();
                }, 0);
              },
            },
          ],
        })
        .then((alert) => {
          alert.present();
        });
    }
  }
  cancelProduct(event: Event, item: any) {
    event.stopPropagation();
    // console.log('this.renderStrapiId in cancel button', this.renderStrapiId);
    const cartItem = this.renderStrapiId.find((cart: any) => cart.saveProductId === item.attributes.ProductId);
    if (cartItem) {
      const strapiIdToDelete = cartItem.strapiId;
      // console.log('strapiIdToDelete:', strapiIdToDelete);
      if (strapiIdToDelete) {
        this.CartService.deleteProduct(strapiIdToDelete).subscribe(
          (response) => {
            // console.log('Product deleted from cart successfully:', response);
            this.renderStrapiId = this.renderStrapiId.filter((cart: any) => cart.saveProductId !== item.attributes.ProductId);
            localStorage.setItem('saveCartItems', JSON.stringify(this.renderStrapiId));
          },
          (error) => {
            console.error('Error deleting product from cart:', error);
          }
        );
      } else {
        console.error('Strapi ID is not available. Unable to delete product.');
      }
    } else {
      console.error('CartItem not found in renderStrapiId.');
    }
  }

  isProductInCart(item: number): boolean{
    let cartData = JSON.parse(localStorage.getItem('saveCartItems') || '[]')
    return cartData.some((product: any) => product.saveProductId === item)
}

  cartNumber: number = 0;
  cartNumberFunc() {
    var cartValue = localStorage.getItem('localCart');
    if (cartValue !== null) {
      this.cartNumber = cartValue.length;
      this.CartService.cartSubject.next(this.cartNumber);
    } else {
      this.cartNumber = 0;
    }
  }


}
