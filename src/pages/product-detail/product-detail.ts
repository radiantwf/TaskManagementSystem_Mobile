import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommunicationsPage } from '../communications/communications';
import { Product } from '../../model/product';
import { ProductService } from '../../providers/product.service';
import { Global } from '../../providers/global';

/*
  Generated class for the ProductDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html'
})
export class ProductDetailPage {
  productId: string;
  product: Product;

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    private productService: ProductService,
    private global: Global) {
  }

  communicate() {
    this.navCtrl.push(CommunicationsPage, { id: this.productId });
  }
  back() {
    this.navCtrl.pop();
  }
  ionViewWillEnter() {
    this.productId = this.navParams.get('productId');

    this.reloadProduct(null);
  }
  doRefresh(refresher) {
    this.reloadProduct(refresher);
  }
  reloadProduct(elementComplete: any) {
    this.productService.getProduct(this.productId)
      .subscribe(product => {
        this.product = product;
        if (elementComplete != null) {
          elementComplete.complete();
        }
      });
  }
}
