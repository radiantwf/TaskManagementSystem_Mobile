import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the CreateTask page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-task',
  templateUrl: 'create-task.html'
})
export class CreateTaskPage {

  constructor(public navCtrl: NavController) {}
  cancel(){
     this.navCtrl.pop();
  }
  addTask(){
     this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('Hello CreateTaskPage Page');
  }
}
