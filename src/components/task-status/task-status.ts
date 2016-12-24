import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Task } from '../../model/task';

/*
  Generated class for the TaskStatus directive.

  See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Directive({
  selector: '[task-status]' // Attribute selector
})
export class TaskStatusDirective {
  constructor(private el: ElementRef, private renderer: Renderer) { }
  @Input('task-status') set task(taskRecord: Task) {
    let statusStyle = 'error';
    let today = new Date(Date.parse(new Date(Date.now()).toLocaleDateString()));

    if (taskRecord.status === '新建' || taskRecord.status === '分配中'
      || taskRecord.status === '计划中' || taskRecord.status === '未开始') {
      statusStyle = 'notstart';
    }
    if (taskRecord.status === '进行中') {
      if (new Date(taskRecord.planningEndDate) < today) {
        statusStyle = 'ongoing';
      } else {
        statusStyle = 'overtime';
      }
    }

    if (taskRecord.status === '已完成' || taskRecord.status === '已关闭') {
      if (taskRecord.realBeginDate == null || taskRecord.realEndDate == null || taskRecord.planningEndDate == null) {
        statusStyle = 'finish';
      } else if (taskRecord.realEndDate <= taskRecord.planningEndDate) {
        statusStyle = 'finish';
      } else {
        statusStyle = 'overtime';
      }
    }

    this.renderer.setElementClass(this.el.nativeElement, statusStyle, true);
  }
}
