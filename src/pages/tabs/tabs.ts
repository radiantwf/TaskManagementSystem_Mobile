import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, App, Tab, Tabs, NavController } from 'ionic-angular';
import { Global } from '../../providers/global';
import { Storage } from '@ionic/storage';
import { UserDefinedEventsService } from '../../providers/user-defined-events.service';
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
    private storage: Storage,
    public events: UserDefinedEventsService,
    public navCtrl: NavController) {
  }
  exit() {
    this.platform.exitApp();
  }
  signout() {
    this.global.LocalToken = null;
    this.global.CurrentUser = null;
    this.storage.remove('username');
    this.storage.remove('pwd');
    this.appCtrl.getRootNav().setRoot(SigninPage);
  }
  openPage(index) {
    // navigate to the new page if it is not the current page
    this.menu.close();
    if (index >= 0) {
      this.tabRef.select(index);
    }
  }
  onToggleChanged(event) {
    if (this.toggleValue) {
      this.toggleLabel = '只看我';
    } else {
      this.toggleLabel = '所有';
    }
    this.menu.close();
    this.events.relatedToMeTogglePublish(this.toggleValue);
  }
  onTabChanged(event) {
    this.currentTab = event as Tab;
    if (this.currentTab.tabTitle === "产品"
      || this.currentTab.tabTitle === "@我") {
      this.toggleNgIf = false;
    } else {
      this.toggleNgIf = true;
    }
  }
}
