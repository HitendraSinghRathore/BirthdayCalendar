import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {
  /*
  function: transform
  Input: Name [string]
  Output: User  Initials [string]
  Description:
     If no string provided, return empty string.
     Else split the name in fragments based on ' ', and return first character of each fragment.

  */
  transform(value: string): any {
    if (!value || value.length === 0)
      return '';
    const nameFragments = value.split(' ');
    let result = '';
    nameFragments.forEach(name => {
      result = result.concat(`${name[0].toUpperCase()}`);
    });

    return result;
  }

}
