import { Component } from '@angular/core';
import { NavController, Platform, App, NavParams, ModalController, ViewController, ActionSheetController, AlertController } from 'ionic-angular';
import { CommunicationsPage } from '../communications/communications';
import { TaskEditPage } from '../task-edit/task-edit';
import { TaskAssignModal } from '../task-assign-modal/task-assign-modal';
import { Task } from '../../model/task';
import { TaskService } from '../../providers/task.service';
import { Global } from '../../providers/global';
import { UserDefinedEventsService } from '../../providers/user-defined-events.service';

/*
  Generated class for the TaskDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html'
})
export class TaskDetailPage {
  taskId: string;
  task: Task;

  today: Date = new Date(Date.parse(new Date(Date.now()).toLocaleDateString()));

  isSeller: boolean = false;
  isOC: boolean = false;
  isTaskAdmin: boolean = false;
  isTaskManager: boolean = false;
  isAdmin: boolean = false;

  startAlert: boolean = false;
  menuAlert: boolean = false;
  planAble: boolean = false;
  assignAble: boolean = false;
  refuseAble: boolean = false;
  reactivedAble: boolean = false;
  startAble: boolean = false;
  progessAble: boolean = false;
  finishAble: boolean = false;
  closeAble: boolean = false;
  editAble: boolean = false;
  deleteAble: boolean = false;
  menuAble: boolean = false;

  constructor(public navCtrl: NavController,
    public appCtrl: App,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private navParams: NavParams,
    private taskService: TaskService,
    private global: Global,
    public events: UserDefinedEventsService) {
  }

  communicate() {
    this.navCtrl.push(CommunicationsPage, { id: this.taskId });
  }
  back() {
    this.navCtrl.pop();
  }
  ionViewWillEnter() {
    this.taskId = this.navParams.get('taskId');
    let user = this.global.CurrentUser;
    this.isAdmin = user.permissions.findIndex(value => (value === 1)) >= 0;
    this.isOC = user.permissions.findIndex(value => (value === 99)) >= 0;
    this.isSeller = user.permissions.findIndex(value => (value === 98)) >= 0;
    this.isTaskAdmin = user.permissions.findIndex(value => (value === 11 || value === 21)) >= 0;
    this.isTaskManager = user.permissions.findIndex(value => (value === 17 || value === 18 || value === 19 || value === 29)) >= 0;

    this.reloadTask(null);
  }
  doRefresh(refresher) {
    this.reloadTask(refresher);
  }
  reloadTask(elementComplete: any) {
    this.taskService.getTask(this.taskId)
      .subscribe(task => {
        this.task = task;
        let user = this.global.CurrentUser;

        this.startAlert = false;
        this.menuAlert = false;
        this.assignAble = false;
        this.planAble = false;
        this.refuseAble = false;
        this.reactivedAble = false;
        this.startAble = false;
        this.progessAble = false;
        this.finishAble = false;
        this.closeAble = false;
        this.editAble = false;
        this.deleteAble = false;
        this.menuAble = false;
        this.today = new Date(Date.parse(new Date(Date.now()).toLocaleDateString()));

        if (task.status === '新建' && this.isOC && task.refuseStatus == null) {
          this.assignAble = true;
          this.refuseAble = true;
        }
        if (task.status === '分配中' && task.refuseStatus == null) {
          if (user.empId === task.primaryOCId) {
            this.assignAble = true;
            this.refuseAble = true;
          }
        }
        if (task.status === '计划中' && task.refuseStatus == null) {
          if (user.empId === task.primaryExecutorId) {
            this.planAble = true;
            this.refuseAble = true;
          }
        }
        if (task.refuseStatus != null) {
          if (user.empId === task.primarySellerId) {
            this.reactivedAble = true;
          }
        }
        if (task.status === '未开始' && task.refuseStatus == null) {
          if (user.empId === task.primaryExecutorId) {
            this.startAble = true;
          }
          if (this.isTaskAdmin) {
            this.startAble = true;
          }
        }
        if (task.status === '进行中' && task.refuseStatus == null) {
          if (user.empId === task.primaryExecutorId) {
            this.progessAble = true;
            this.finishAble = true;
          }
          if (this.isTaskAdmin) {
            this.finishAble = true;
          }
        }
        if (task.status !== '已关闭') {
          if (this.isOC || this.isAdmin || this.isTaskAdmin) {
            this.closeAble = true;
          }
          if (this.isSeller && user.empId === task.primarySellerId) {
            this.closeAble = true;
          }
        }
        if (task.status !== '已关闭' && task.refuseStatus == null) {
          if (this.isAdmin || this.isOC || this.isTaskAdmin) {
            this.editAble = true;
          }
          if (this.isSeller && user.empId === task.primarySellerId) {
            this.editAble = true;
          }
        }
        if (this.isAdmin) {
          this.deleteAble = true;
        } else {
          if (task.status === '新建' || task.status === '分配中' || task.status === '计划中') {
            if (user.empId === task.creatorId) {
              this.deleteAble = true;
              this.closeAble = true;
            }
            if (this.isSeller && user.empId === task.primarySellerId) {
              this.deleteAble = true;
            }
          }
        }
        this.startAlert = this.startAble;
        this.menuAlert = this.startAlert;

        this.menuAble = this.assignAble || this.planAble || this.refuseAble || this.reactivedAble || this.startAble
          || this.progessAble || this.finishAble || this.closeAble || this.editAble || this.deleteAble;

        if (elementComplete != null) {
          elementComplete.complete();
        }
      });
  }
  presentActionSheet() {
    let buttons = new Array<any>();
    if (this.assignAble) {
      buttons.push({
        text: '分配',
        icon: !this.platform.is('ios') ? 'none' : null,
        handler: () => {
          let confirmModal = this.modalCtrl.create(TaskAssignModal, { task: this.task });
          confirmModal.onDidDismiss((data) => {
            let editingTask = data as Task;
            if (editingTask == null)
              return;
            this.taskService.update(editingTask)
              .subscribe(() => {
                this.reloadTask(null);
                this.events.taskCreatedPublish();
              });
          });
          confirmModal.present();
        }
      });
    }
    if (this.planAble) {
      buttons.push({
        text: '计划',
        icon: !this.platform.is('ios') ? 'none' : null,
        handler: () => {
          let confirmAlert = this.alertCtrl.create({
            title: '计划任务任务',
            message: '请选择当前任务的计划周期：',
            inputs: [
              {
                name: 'dateBegin',
                type: 'date',
                placeholder: '计划开始日期'
              },
              {
                name: 'dateEnd',
                type: 'date',
                placeholder: '计划完成日期'
              },
            ],
            buttons: [
              {
                text: '取消'
              },
              {
                text: '确定',
                handler: (data) => {
                  let newTask = new Task(this.taskId, null);
                  newTask.planningBeginDate = new Date(Date.parse(data.dateBegin));
                  newTask.planningBeginDate = new Date(Date.parse(data.dateEnd));
                  this.taskService.strat(newTask)
                    .subscribe(() => {
                      this.reloadTask(null);
                      this.events.taskCreatedPublish();
                    });
                }
              }
            ],
            enableBackdropDismiss: false
          });
          confirmAlert.present();
        }
      });
    }

    this.reactivedAble = false;

    if (this.refuseAble) {
      buttons.push({
        text: '拒绝',
        icon: !this.platform.is('ios') ? 'none' : null,
        handler: () => {
          let confirmAlert = this.alertCtrl.create({
            title: '拒绝任务',
            message: '请输入拒绝该任务的原因：',
            inputs: [
              {
                name: 'reason',
                type: 'texteara',
                placeholder: '拒绝原因'
              },
            ],
            buttons: [
              {
                text: '取消'
              },
              {
                text: '确定',
                handler: (data) => {
                  let newTask = new Task(this.taskId, null);
                  newTask.refuseReason = data.reason;
                  this.taskService.refuse(newTask)
                    .subscribe(() => {
                      this.reloadTask(null);
                      this.events.taskCreatedPublish();
                    });
                }
              }
            ],
            enableBackdropDismiss: false
          });
          confirmAlert.present();
        }
      });
    }
    if (this.reactivedAble) {
      buttons.push({
        text: '重新激活',
        icon: !this.platform.is('ios') ? 'none' : null,
        handler: () => {
          let confirmAlert = this.alertCtrl.create({
            title: '再次激活任务',
            message: '是否重新激活这个任务？',
            buttons: [
              {
                text: '取消'
              },
              {
                text: '确定',
                handler: (data) => {
                  let newTask = new Task(this.taskId, null);
                  newTask.realBeginDate = new Date(Date.parse(data.dateBegin));
                  this.taskService.strat(newTask)
                    .subscribe(() => {
                      this.reloadTask(null);
                      this.events.taskCreatedPublish();
                    });
                }
              }
            ],
            enableBackdropDismiss: false
          });
          confirmAlert.present();
        }
      });
    }
    if (this.startAble) {
      buttons.push({
        text: '开始',
        icon: !this.platform.is('ios') ? 'none' : null,
        handler: () => {
          let confirmAlert = this.alertCtrl.create({
            title: '开始任务',
            message: '请选择当前任务的实际开始时间：',
            inputs: [
              {
                name: 'dateBegin',
                type: 'date',
                placeholder: '实际开始日期'
              },
            ],
            buttons: [
              {
                text: '取消'
              },
              {
                text: '确定',
                handler: (data) => {
                  let newTask = new Task(this.taskId, null);
                  newTask.realBeginDate = new Date(Date.parse(data.dateBegin));
                  this.taskService.strat(newTask)
                    .subscribe(() => {
                      this.reloadTask(null);
                      this.events.taskCreatedPublish();
                    });
                }
              }
            ],
            enableBackdropDismiss: false
          });
          confirmAlert.present();
        }
      });
    }
    if (this.progessAble) {
      buttons.push({
        text: '填写进度',
        icon: !this.platform.is('ios') ? 'none' : null,
        handler: () => {
          let confirmAlert = this.alertCtrl.create({
            title: '任务进度',
            message: '请填写当前任务的任务进度：',
            inputs: [
              {
                name: 'percent',
                type: 'number',
                placeholder: '百分比'
              },
            ],
            buttons: [
              {
                text: '取消'
              },
              {
                text: '确定',
                handler: (data) => {
                  let newTask = new Task(this.taskId, null);
                  newTask.percent = data.percent;
                  this.taskService.progress(newTask)
                    .subscribe(() => {
                      this.reloadTask(null);
                      this.events.taskCreatedPublish();
                    });
                }
              }
            ],
            enableBackdropDismiss: false
          });
          confirmAlert.present();
        }
      });
    }
    if (this.finishAble) {
      buttons.push({
        text: '完成',
        icon: !this.platform.is('ios') ? 'none' : null,
        handler: () => {
          let confirmAlert = this.alertCtrl.create({
            title: '完成任务',
            message: '请填写当前任务的实际完成时间：',
            inputs: [
              {
                name: 'dateEnd',
                type: 'date',
                placeholder: '实际完成日期'
              },
            ],
            buttons: [
              {
                text: '取消'
              },
              {
                text: '确定',
                handler: (data) => {
                  let newTask = new Task(this.taskId, null);
                  newTask.realEndDate = new Date(Date.parse(data.dateEnd));
                  this.taskService.finish(newTask)
                    .subscribe(() => {
                      this.reloadTask(null);
                      this.events.taskCreatedPublish();
                    });
                }
              }
            ],
            enableBackdropDismiss: false
          });
          confirmAlert.present();
        }
      });
    }
    if (this.closeAble) {
      buttons.push({
        text: '关闭',
        icon: !this.platform.is('ios') ? 'none' : null,
        handler: () => {
          let confirmAlert = this.alertCtrl.create({
            title: '关闭任务',
            message: '请问是否关闭当前任务？',
            buttons: [
              {
                text: '取消'
              },
              {
                text: '关闭',
                handler: () => {
                  let newTask = new Task(this.taskId, null);
                  this.taskService.close(newTask)
                    .subscribe(() => {
                      this.navCtrl.pop();
                      this.events.taskCreatedPublish();
                    });
                }
              }
            ],
            enableBackdropDismiss: false
          });
          confirmAlert.present();
        }
      });
    }
    if (this.editAble) {
      buttons.push({
        text: '编辑',
        icon: !this.platform.is('ios') ? 'none' : null,
        handler: () => {
          this.appCtrl.getRootNav().push(TaskEditPage, { taskId: this.taskId });
        }
      });
    }
    if (this.deleteAble) {
      buttons.push({
        text: '删除',
        role: 'destructive',
        icon: !this.platform.is('ios') ? 'trash' : null,
        handler: () => {
          let confirmAlert = this.alertCtrl.create({
            title: '删除任务',
            message: '请问是否删除当前任务？',
            buttons: [
              {
                text: '不删除',
                handler: () => {
                }
              },
              {
                text: '删除',
                handler: () => {
                  this.taskService.delete(this.taskId)
                    .subscribe(() => {
                      this.navCtrl.pop();
                      this.events.taskCreatedPublish();
                    });
                }
              }
            ],
            enableBackdropDismiss: false
          });
          confirmAlert.present();
        }
      });
    }
    buttons.push({
      text: '取消',
      role: 'cancel',
      icon: !this.platform.is('ios') ? 'close' : null
    });
    let actionSheet = this.actionSheetCtrl.create({
      title: '任务操作',
      buttons: buttons
    });
    actionSheet.present();
  }
}
