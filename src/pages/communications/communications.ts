import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  taskId: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
    this.taskId = navParams.get('taskId').taskId;
  }

  back() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('Hello CommunicationsPage Page');
  }

}
