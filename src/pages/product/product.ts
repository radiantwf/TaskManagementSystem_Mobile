import { Component } from '@angular/core';
import { NavController, MenuController, App, NavParams } from 'ionic-angular';
import { ProductDetailPage } from '../product-detail/product-detail';
import { Product } from '../../model/product';
import { ProductService } from '../../providers/product.service';
import { UserDefinedEventsService } from '../../providers/user-defined-events.service';

/*
  Generated class for the Product page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {
  products: Array<Product> = null;
  page: number = 1;
  searchCriteria: string = '';
  touchProductId: string = null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    public menu: MenuController,
    public productService: ProductService,
    public events: UserDefinedEventsService) {
    menu.enable(true);
  }

  showDetail(id) {
    if (id == null) {
      return;
    }
    this.appCtrl.getRootNav().push(ProductDetailPage, { productId: id });
    this.touchProductId = null;
  }
  searchProduct(event) {
    this.page = 1;
    this.productService.getProducts(this.searchCriteria, null, this.page)
      .subscribe(products => {
        this.products = null;
        this.addProducts(products);
      });
  }
  addProducts(products) {
    if (this.products == null) {
      this.products = new Array<Product>();
    }
    if (products != null) {
      products.forEach(value => {
        if (this.products.findIndex(product => product.id === value.id) < 0) {
          this.products.push(value);
        }
      });
    }
  }
  doInfinite(infiniteScroll) {
    this.touchProductId = null;
    this.productService.getProducts(this.searchCriteria, null, this.page + 1)
      .subscribe(products => {
        if (products != null && products.length > 0) {
          this.addProducts(products);
          this.page++;
        }
        infiniteScroll.complete();
      });
  }
  doRefresh(refresher) {
    this.touchProductId = null;
    this.reloadProducts(refresher);
  }

  reloadProducts(elementComplete: any) {
    this.touchProductId = null;
    this.page = 1;
    this.productService.getProducts(this.searchCriteria, null, this.page)
      .subscribe(products => {
        this.products = null;
        this.addProducts(products);
        if (elementComplete != null) {
          elementComplete.complete();
        }
      });
  }
  ionViewDidEnter() {
    this.touchProductId = null;
  }
  ionViewDidLoad() {
    this.reloadProducts(null);
  }
}
