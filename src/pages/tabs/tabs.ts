import { Component } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';

import { TaskPage } from '../task/task';
import { ProductPage } from '../product/product';
import { ProjectPage } from '../project/project';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = TaskPage;
  tab2Root: any = ProductPage;
  tab3Root: any = ProjectPage;
  tab4Root: any = TaskPage;

  constructor(public platform: Platform,
    public menu: MenuController,
    public navCtrl: NavController) {

  }
  exit() {
    this.platform.exitApp();
  }
  signout() {
  }
  openPage(page) {
    // navigate to the new page if it is not the current page
    this.navCtrl.setRoot(page);
  }
}
