import { Component } from '@angular/core';
import { NavController, MenuController, App, NavParams } from 'ionic-angular';
import { TaskDetailPage } from '../task-detail/task-detail';
import { CreateTaskPage } from '../create-task/create-task';
import { Task } from '../../model/task';
import { TaskService } from '../../providers/task.service';

/*
  Generated class for the Task page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-task',
  templateUrl: 'task.html'
})
export class TaskPage {
  tasks: Array<Task> = null;
  page: number = 1;
  searchCriteria: string = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    public menu: MenuController,
    public taskService: TaskService) {
    menu.enable(true);
  }

  showDetail(id) {
    this.appCtrl.getRootNav().push(TaskDetailPage, { taskId: id });
  }
  searchTask(event) {
    this.page = 1;
    this.taskService.getTasks(this.searchCriteria, null, this.page)
      .subscribe(tasks => {
        this.tasks = null;
        this.addTasks(tasks);
      });
  }
  addTasks(tasks) {
    if (this.tasks == null) {
      this.tasks = new Array<Task>();
    }
    if (tasks != null) {
      tasks.forEach(value => {
        if (this.tasks.findIndex(task => task.id === value.id) < 0) {
          this.tasks.push(value);
        }
      });
    }
  }
  createTask() {
    this.appCtrl.getRootNav().push(CreateTaskPage);
  }
  ionViewWillEnter() {
    console.log(this.navParams.get('charging'));
    this.page = 1;
    this.searchCriteria = '';
    this.taskService.getTasks(this.searchCriteria, null, this.page)
      .subscribe(tasks => {
        this.tasks = null;
        this.addTasks(tasks);
      });
  }
  doInfinite(infiniteScroll) {
    this.taskService.getTasks(this.searchCriteria, null, this.page + 1)
      .subscribe(tasks => {
        if (tasks != null && tasks.length > 0) {
          this.addTasks(tasks);
          this.page++;
        }
        infiniteScroll.complete();
      });
  }
  doRefresh(refresher) {
    this.page = 1;
    this.taskService.getTasks(this.searchCriteria, null, this.page)
      .subscribe(tasks => {
        this.tasks = null;
        this.addTasks(tasks);
        refresher.complete();
      });
  }
}
