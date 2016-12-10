import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the TaskDetailPopover page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-task-detail-popover',
  templateUrl: 'task-detail-popover.html'
})
export class TaskDetailPopoverPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello TaskDetailPopoverPage Page');
  }

}
