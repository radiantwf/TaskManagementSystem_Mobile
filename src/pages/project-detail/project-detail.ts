import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ProjectDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-project-detail',
  templateUrl: 'project-detail.html'
})
export class ProjectDetailPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ProjectDetailPage Page');
  }

}
