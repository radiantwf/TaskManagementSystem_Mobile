import { Component } from '@angular/core';
import { NavController, MenuController, App } from 'ionic-angular';
import { TaskDetailPage } from '../task-detail/task-detail';
import { Task } from '../../model/task';
import { TaskService } from '../../providers/task.service';
import { UserDefinedEventsService } from '../../providers/user-defined-events.service';

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
  // tasks: Task[] = [];
  // touchTaskId: string = null;

  // constructor(public navCtrl: NavController,
  //   public appCtrl: App,
  //   public menu: MenuController,
  //   public taskService: TaskService) {
  //   menu.enable(true);
  // }

  // showDetail(id) {
  //   this.appCtrl.getRootNav().push(TaskDetailPage, { taskId: id });
  // }
  // getItems(event) {

  // }
  // addTask() {
  //   this.appCtrl.getRootNav().push(CreateTaskPage);
  // }
  // ionViewWillEnter() {
  //   this.taskService.getTasks(null, 'processing', 1)
  //     .subscribe(tasks => this.tasks = tasks);
  // }

  tasks: Array<Task> = null;
  page: number = 1;
  touchTaskId: string = null;

  constructor(public navCtrl: NavController,
    public appCtrl: App,
    public menu: MenuController,
    public taskService: TaskService,
    public events: UserDefinedEventsService) {
    menu.enable(true);
  }

  showDetail(id) {
    if (id == null) {
      return;
    }
    this.appCtrl.getRootNav().push(TaskDetailPage, { taskId: id });
    this.touchTaskId = null;
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
  doInfinite(infiniteScroll) {
    this.touchTaskId = null;
    this.taskService.getTasks(null, 'processing', this.page + 1)
      .subscribe(tasks => {
        if (tasks != null && tasks.length > 0) {
          this.addTasks(tasks);
          this.page++;
        }
        infiniteScroll.complete();
      });
  }
  doRefresh(refresher) {
    this.touchTaskId = null;
    this.reloadTasks(refresher);
  }

  reloadTasks(elementComplete: any) {
    this.touchTaskId = null;
    this.page = 1;
    this.taskService.getTasks(null, 'processing', this.page)
      .subscribe(tasks => {
        this.tasks = null;
        this.addTasks(tasks);
        if (elementComplete != null) {
          elementComplete.complete();
        }
      });
  }
  ionViewDidEnter() {
    this.touchTaskId = null;
  }
  ionViewWillEnter() {
    this.reloadTasks(null);
  }
}
