import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ProductDetailPage Page');
  }

}
