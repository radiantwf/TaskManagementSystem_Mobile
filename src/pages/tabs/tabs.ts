import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, App, Tabs, AlertController, NavController } from 'ionic-angular';

import { TaskPage } from '../task/task';
import { ProductPage } from '../product/product';
import { ProjectPage } from '../project/project';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = TaskPage;
  tab2Root: any = ProductPage;
  tab3Root: any = ProjectPage;
  tab4Root: any = TaskPage;

  constructor(public platform: Platform,
    public appCtrl: App,
    public menu: MenuController,
    public alertCtrl: AlertController,
    public navCtrl: NavController) {
  }
  exit() {
    this.menu.close();
    let confirm = this.alertCtrl.create({
      title: '退出确认',
      message: '确定要退出本应用?',
      buttons: [
        {
          text: '取消',
          handler: () => {
          }
        },
        {
          text: '退出',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    confirm.present();
  }
  signout() {
  }
  openPage(index) {
    // navigate to the new page if it is not the current page
    this.menu.close();
    this.tabRef.select(index);
    // this.tabs.getActiveChildNav().setRoot(page);
  }
}
