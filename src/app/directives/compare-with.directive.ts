import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[compareWith]'
})
export class CompareWithDirective {

  constructor() { }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
   }

}
