import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, App, Tab, Tabs, NavController } from 'ionic-angular';
import { Global } from '../../providers/global';

import { SigninPage } from '../signin/signin';
import { TaskPage } from '../task/task';
import { ProductPage } from '../product/product';
import { ProjectPage } from '../project/project';
import { AtMePage } from '../at-me/at-me';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  currentTab: Tab;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = TaskPage;
  tab2Root: any = ProductPage;
  tab3Root: any = ProjectPage;
  tab4Root: any = AtMePage;
  toggleLabel: string = '只看我';
  toggleValue: boolean = true;
  toggleNgIf: boolean = true;

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
    if (index > 0) {
      this.tabRef.select(index);
    } else {
      this.tabRef.select(this.tabRef.getIndex(this.currentTab));
    }
  }
  onToggleChanged(event) {
    if (this.toggleValue) {
      this.toggleLabel = '只看我';
    } else {
      this.toggleLabel = '所有';
    }
    this.openPage(-1);
  }
  onTabChanged(event) {
    this.currentTab = event as Tab;
    console.log(this.currentTab.tabTitle);
    if (this.currentTab.tabTitle === "产品"
      || this.currentTab.tabTitle === "@我") {
      this.toggleNgIf = false;
    } else {
      this.toggleNgIf = true;
    }
  }
}
