import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueShorten'
})
export class ValueShortenPipe implements PipeTransform {
  public defaultLength = 20;
  transform(value: string | undefined, ...args: number[]): string {

    var length;
    if (args[0]) {
      length = args[0];
    } 
    else {
      length = this.defaultLength;
    }

    if (value === null || (value?.length ?? 0) <= length) {
      return value ?? "";
    }
    else {
      return value?.substring(0, length) + (args[1] ? "..." : "");
    }
  }

}
