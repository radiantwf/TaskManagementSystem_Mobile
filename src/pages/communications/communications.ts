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
  id: string;
  list: Communication[];
  empId: string;
  content: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public communicationsService: CommunicationsService,
    public global: Global) {
    this.id = navParams.get('id');
    this.empId = global.CurrentUser.empId;
  }

  back() {
    this.navCtrl.pop();
  }

  ionViewWillEnter() {
    this.communicationsService.getCommunicationsById(this.id)
      .subscribe(communications => {
        this.list = communications;
      });
  }
  doInfinite(infiniteScroll) {
    this.communicationsService.getCommunicationsById(this.id)
      .subscribe(communications => {
        this.list = communications;
        infiniteScroll.complete();
      });
  }
  addCommunication() {
    if (!this.content) { return; }
    let communication = new Communication(this.id, this.global.CurrentUser.empId, null, new Date(Date.now()), this.content);

    this.communicationsService.create(communication).subscribe(() => {
      this.communicationsService.getCommunicationsById(this.id)
        .subscribe(communications => this.list = communications);
      this.content = '';
    });
  }
}
