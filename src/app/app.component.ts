import { BirthdayService } from './services/birthday.service';
import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.style.scss']
})
export class AppComponent {
  /*
  Data Objects:
    -daysArray: String Array
               Array of string for days of weeks ['SUN','MON' ...] to populate the card.
    -errorString: string
                  To represent the error in user input.
    -yearValue: number
               To store year value provided by user, Default to current year.
    -birthdayData: Object Array
                  [Default JSON data retrived from 'data.js']
                  name: string [name of character]
                  birthday: string to represent data [format 'mm/dd/yyyy']
    -cardData: Object
                Numbers - Each number for day of week; 0-Sunday,1-Monday...6-Saturday.
                Error   - Boolean attribute, to represent if the data is valid.[check if year is before the birthday of any character]
  */
  daysArray = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  errorString: string;
  yearValue: number = new Date().getFullYear();
  birthdayData: any = [];
  cardData: any = {};

  /*
  function: constructor
  Input: BirthdayService, json Pipe
  Description:
      Default values are assigned to birthdayData and cardData.
   */
  constructor(private birthdayService: BirthdayService, private json: JsonPipe) {
    this.birthdayData = json.transform(birthdayService.getJSONData());
    this.cardData = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      error: false
    };

  }

  /*
  function: handleUpdate
  Input: none
  Output: none
  Description:
      Check if user entere an year value and it is not a floating number. If not, show error
      Check if JSON is valid or no. Return if invalid JSON. if invalid, show error.
      Else, update the data in the service and if recieve the cardData from service.
      If the cardData has any error, display the error. Else remove error.

  */
  handleUpdate() {
    if (!this.yearValue || Math.ceil(this.yearValue) != Math.floor(this.yearValue)) {
      this.errorString = 'Year is invalid. Please Verify.';
      return;
    }
    if (!this.verifyJSON(this.birthdayData)) {
      this.errorString = 'Invalid JSON data. Please verify.';
      return;
    } else {
      this.errorString = null;
      const dataFromService = Object.assign({}, this.birthdayService.setData(this.birthdayData, this.yearValue));
      if (dataFromService.error) {
        this.errorString = 'Year cannot be before the youngest members birthday';
      } else {
        this.cardData = dataFromService;
      }
    }
  }

  /*
function: verifyJSON
Input: string, JSON
Output: Boolean
Description:
   Check if the JSON is a valid string or not. If it throws an error, return false[Invalid]
   Else return true [Valid]

*/

  verifyJSON(jsonString: string): boolean {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (e) {
      return false;
    }
  }

}
