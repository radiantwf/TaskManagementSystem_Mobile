import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Project } from '../../model/project';

/*
  Generated class for the ProjectStatus directive.

  See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Directive({
  selector: '[project-status]' // Attribute selector
})
export class ProjectStatusDirective {
  constructor(private el: ElementRef, private renderer: Renderer) { }
  @Input('project-status') set project(projectRecord: Project) {
    let statusStyle = 'error';
    let today = new Date(Date.parse(new Date(Date.now()).toLocaleDateString()));

    if (projectRecord.status === '新建' || projectRecord.status === '分配中'
      || projectRecord.status === '计划中' || projectRecord.status === '未开始') {
      statusStyle = 'notstart';
    }
    if (projectRecord.status === '进行中') {
      if (new Date(projectRecord.planningReleaseDate) < today) {
        statusStyle = 'ongoing';
      } else {
        statusStyle = 'overtime';
      }
    }

    if (projectRecord.status === '已完成' || projectRecord.status === '已关闭') {
      if (projectRecord.realReleaseDate == null || projectRecord.planningReleaseDate == null) {
        statusStyle = 'finish';
      } else if (projectRecord.realReleaseDate <= projectRecord.planningReleaseDate) {
        statusStyle = 'finish';
      } else {
        statusStyle = 'overtime';
      }
    }

    this.renderer.setElementClass(this.el.nativeElement, statusStyle, true);
  }
}
