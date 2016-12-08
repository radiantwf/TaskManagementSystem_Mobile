import { Component } from '@angular/core';
import { NavController, Platform, NavParams, ViewController } from 'ionic-angular';
import { CommunicationsPage } from '../communications/communications';

/*
  Generated class for the TaskDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html'
})
export class TaskDetailPage {

  constructor(public navCtrl: NavController,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController) { }


  dismiss() {
    this.viewCtrl.dismiss();
  }
  communicate() {
    this.navCtrl.push(CommunicationsPage);
  }
  ionViewDidLoad() {
    console.log('Hello TaskDetailPage Page');
  }

}
