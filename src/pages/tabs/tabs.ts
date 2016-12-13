import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, App, Tabs, NavController } from 'ionic-angular';
import { Global } from '../../providers/global';

import { SigninPage } from '../signin/signin';
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
    public global: Global,
    public navCtrl: NavController) {
  }
  exit() {
    this.platform.exitApp();
  }
  signout() {
    this.global.LocalToken = null;
    this.global.CurrentUser = null;
    this.appCtrl.getRootNav().setRoot(SigninPage);
  }
  openPage(index) {
    // navigate to the new page if it is not the current page
    this.menu.close();
    this.tabRef.select(index);
  }
}
