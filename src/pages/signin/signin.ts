import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

/*
  Generated class for the Signin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() {
  }
  siginin() {
    this.navCtrl.push(TabsPage);
  }
}
