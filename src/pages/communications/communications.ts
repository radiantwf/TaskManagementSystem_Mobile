import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Global } from '../../providers/global';

import { Communication } from '../../model/communication';
import { CommunicationsService } from '../../providers/communications.service';
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
  list: Communication[];
  empId: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public communicationsService: CommunicationsService,
    public global: Global) {
    this.taskId = navParams.get('taskId');
    this.empId = global.CurrentUser.empId;
  }

  back() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    this.communicationsService.getCommunicationsById(this.taskId)
      .subscribe(communications => {
        this.list = communications;
      });
  }

}
