import { Component } from '@angular/core';
import { ViewController, NavParams, AlertController } from 'ionic-angular';
import { Global } from '../../providers/global';
import { Employee } from './../../model/employee';
import { EmployeeService } from './../../providers/employee.service';
import { Task } from '../../model/task';
/*
  Generated class for the TaskAssignModal.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-task-assign-modal',
  templateUrl: 'task-assign-modal.html'
})
export class TaskAssignModal {
  employees: Array<Employee>;
  OC: Array<Employee>;
  taskManagers: Array<Employee>;
  ocReadOnly: boolean = false;
  OCId: string;
  taskManagerId: string;
  editingTask: Task;

  constructor(public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public employeeService: EmployeeService,
    public global: Global) {
    this.loadEmployees();
    this.ocReadOnly = false;

    let task = this.navParams.get('task') as Task;
    if (task != null && task.primaryOCId != null) {
      this.ocReadOnly = true;
      this.OCId = task.primaryOCId;
    }
    this.editingTask = new Task(task.id, null);
  }

  confirmModel() {
    this.viewCtrl.dismiss(this.editingTask);
  }

  dismiss() {
    this.viewCtrl.dismiss(null);
  }

  loadEmployees() {
    this.employeeService.getEmployee().subscribe(e => {
      this.employees = e;
      this.processEmployees();
    });
  }

  processEmployees() {
    this.OC = new Array<Employee>();
    this.taskManagers = new Array<Employee>();
    this.OCId = null;
    this.taskManagerId = null;
    this.employees.forEach(value => {
      if (value.permissions.findIndex(p => (p === 99)) >= 0) {
        this.OC.push(value);
        if (value.empId === this.global.CurrentUser.empId) {
          this.OCId = value.empId;
        }
      }
      if (value.permissions.findIndex(p => (p === 1
        || p === 11 || p === 17 || p === 18 || p === 19 || p === 21 || p === 29)) >= 0) {
        this.taskManagers.push(value);
        if (value.empId === this.global.CurrentUser.empId) {
          this.taskManagerId = value.empId;
        }
      }
    });
  }

}
