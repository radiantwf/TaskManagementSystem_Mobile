import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Project page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-project',
  templateUrl: 'project.html'
})
export class ProjectPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidEnter() {
    console.log('Hello ProjectPage Page');
  }

}
