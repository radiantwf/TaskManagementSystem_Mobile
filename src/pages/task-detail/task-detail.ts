import { Component } from '@angular/core';
import { NavController, Platform, NavParams, ViewController, PopoverController } from 'ionic-angular';
import { CommunicationsPage } from '../communications/communications';
import { TaskDetailPopoverPage } from '../task-detail-popover/task-detail-popover';

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
    public viewCtrl: ViewController,
    private popoverCtrl: PopoverController) { }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(TaskDetailPopoverPage, {
    });

    popover.present({
      ev: ev
    });
  }
  communicate() {
    this.navCtrl.push(CommunicationsPage);
  }
  back() {
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('Hello TaskDetailPage Page');
  }

}
