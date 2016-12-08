import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Communications page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-communications',
  templateUrl: 'communications.html'
})
export class CommunicationsPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello CommunicationsPage Page');
  }

}
