import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Product } from '../../model/product';

/*
  Generated class for the ProductStatus directive.

  See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Directive({
  selector: '[product-status]' // Attribute selector
})
export class ProductStatusDirective {
  constructor(private el: ElementRef, private renderer: Renderer) { }
  @Input('product-status') set product(productRecord: Product) {
    let statusStyle = 'error';

    if (productRecord.status === '新建' || productRecord.status === '分配中'
      || productRecord.status === '计划中' || productRecord.status === '未开始') {
      statusStyle = 'notstart';
    }
    if (productRecord.status === '进行中') {
        statusStyle = 'ongoing';
    }

    if (productRecord.status === '已完成' || productRecord.status === '已关闭') {
        statusStyle = 'finish';

    }

    this.renderer.setElementClass(this.el.nativeElement, statusStyle, true);
  }
}
