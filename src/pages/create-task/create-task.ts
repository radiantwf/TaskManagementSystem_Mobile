import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Task } from './../../model/task';
import { Employee } from './../../model/employee';
import { TaskService } from './../../providers/task.service';
import { EmployeeService } from './../../providers/employee.service';

import { Global } from '../../providers/global';

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
  employees: Array<Employee>;
  sellers: Array<Employee>;
  OC: Array<Employee>;
  taskManagers: Array<Employee>;

  sellerId: string;
  OCId: string;
  taskManagerId: string;

  constructor(public navCtrl: NavController,
    public taskService: TaskService,
    public employeeService: EmployeeService,
    public global: Global) {

  }

  cancel() {
    this.navCtrl.pop();
  }
  addTask() {
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    this.loadEmployees();
  }
  
  loadEmployees() {
    this.employeeService.getEmployee().subscribe(e => {
      this.employees = e;
      this.ProcessEmployees();
    });

  }

  ProcessEmployees() {
    this.sellers = new Array<Employee>();
    this.OC = new Array<Employee>();
    this.taskManagers = new Array<Employee>();
    this.sellerId = null;
    this.OCId = null;
    this.taskManagerId = null;
    this.employees.forEach(value => {
      if (value.permissions.findIndex(p => (p === 98)) >= 0) {
        this.sellers.push(value);
        if (value.empId === this.global.CurrentUser.empId) {
          this.sellerId = value.empId;
        }
      }
      if (value.permissions.findIndex(p => (p === 99)) >= 0) {
        this.OC.push(value);
        if (value.empId === this.global.CurrentUser.empId) {
          this.OCId = value.empId;
        }
      }
      if (value.permissions.findIndex(p => (p === 1
        || p === 11 || p === 18 || p === 19 || p === 21 || p === 29)) >= 0) {
        this.taskManagers.push(value);
        if (value.empId === this.global.CurrentUser.empId) {
          this.taskManagerId = value.empId;
        }
      }
    });
  }
}
