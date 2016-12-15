import { Component } from '@angular/core';
import { NavController, MenuController, App } from 'ionic-angular';
import { TaskDetailPage } from '../task-detail/task-detail';
import { CreateTaskPage } from '../create-task/create-task';
import { Task } from '../../model/task';
import { TaskService } from '../../providers/task.service';

/*
  Generated class for the AtMe page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-at-me',
  templateUrl: 'at-me.html'
})
export class AtMePage {

  tasks: Task[] = [];
  constructor(public navCtrl: NavController,
    public appCtrl: App,
    public menu: MenuController,
    public taskService: TaskService) {
    menu.enable(true);
  }

  showDetail(id) {
    this.appCtrl.getRootNav().push(TaskDetailPage, { taskId: id });
  }
  getItems(event) {

  }
  addTask() {
    this.appCtrl.getRootNav().push(CreateTaskPage);
  }
  ionViewDidEnter() {
    this.taskService.getTasks(null, 'processing', 1)
      .subscribe(tasks => this.tasks = tasks);
  }
}
