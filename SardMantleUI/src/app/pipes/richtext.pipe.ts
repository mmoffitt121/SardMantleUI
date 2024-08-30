import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'richtext'
})
export class RichtextPipe implements PipeTransform {
  private regex = /<[\/a-zA-Z0-9\" =\-\(\):,;#]+>/

  transform(value: string, ...args: unknown[]): string {
    const result = value.split(this.regex)
    console.log(result)
    if (result && result.length) {
      console.log(result)
      return result.find(r => r) ?? ""
    }
    return "";
  }

}
