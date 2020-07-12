import { Component, Input, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaysComponent implements OnChanges {
  /*
  Data Objects:
  @Inputs
   -day: string
         Value of the day [SUN, MON, TUE ,....]
   -birthDays: Object Array
             The characeters having birthday on the day provided.
             Object:
             name - character name
             birthday- birthday of character in the format [mm/dd/yyyy]
   @local variables
     -cardDays: Object Array
             The charcater array to display.
     -showCard: boolean
               If the cards has been rendered once.
  */
  @Input() day: string;
  @Input() birthDays: any[] = [];
  cardDays: any[] = [];
  showCard: boolean = false;

  /*
  function: ngOnChanges
  Input: changes[SimpleChanges]
  Output: none
  Description:
    On each change, check if birthDays array is updated, and it is not inital render.
    Sort the birthdays based on youngest to oldest.
    Set show card to true,
    Call process changes to calculate css properties for the cards.
  */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.birthDays && !changes.birthDays.firstChange) {
      this.cardDays = this.sortBirthdays(changes.birthDays.currentValue);
      this.showCard = true;
      this.processChange();
    }
  }

  /*
  function: sortBirthdays
  Input: days[Object array]
  Ouput: Sorted Days[Object array]
  Description:
    Uses Javascript sort method to sort the characrters based on Birthdays.
  */
  sortBirthdays(days: any[]): any[] {
    days.sort((prev, next) => {
      return new Date(next.birthday).getTime() - new Date(prev.birthday).getTime();
    });

    return days;
  }

  /*
    function: processChange
    Input: none
    Output: none
    Description:
      For each card height and width, calculate number or rows and columns.
      Traverse each card and randomly select a background color and text color based on the background color.
      Set property for each card to be changed in HTML dynamically.

  */
  processChange() {
    const { height, width } = this.calculateRowsColumns();
    if (this.cardDays.length) {
      this.cardDays.forEach(birthDay => {
        const { r, g, b, font } = this.getColorValue();
        birthDay.font = font;
        birthDay.color = `rgb(${r},${g},${b})`;
        birthDay.height = height;
        birthDay.width = width;
      });

    }

  }
  /*
  function: getColorValue
  Input: none
  Output: r,g,b and font color value
  Description:
    Use Math.random to calculate r,g and b value [r=red, g=green, b=blue]
    calculate the lightness value for the generated color if it is more than threshold [160]
    font color is  black, else it is white
   */
  getColorValue() {
    const r = Math.random() * 255;
    const g = Math.random() * 255;
    const b = Math.random() * 255;
    let font = '#ffffff';
    if ((r * 0.299 + g * 0.587 + b * 0.114) > 160) { font = '#000000'; }
    return { r, g, b, font };
  }

  /*
  function: calculateRowsColumns
  Input: none
  Output: Object {height, weight}
  Description: If there is one card, set height width to full [300,190]
  else the maximum number of columns is set to 50, find the number of columns for the given number of cards.
  calculate the height and width based on the card-box dimensions.
 */
  calculateRowsColumns() {
    if (this.cardDays.length === 1) {
      return { height: 300, width: 190 };
    }
    const n = this.cardDays.length;
    for (let i = 2; i <= 50; i++) {
      if (n < (2 * i + (2 * (i - 1) - 1))) {
        const rows = Math.ceil(n / i);
        const col = i;
        return { height: 300 / rows, width: 190 / col };
      }
    }
    return { height: 300, width: 190 };
  }

}
