import { Injectable } from '@angular/core';
import data from '../../data';
@Injectable({
  providedIn: 'root'
})
export class BirthdayService {
  /*
  Data Objects
    -cardData : Object
                Numbers - Each number for day of week; 0-Sunday,1-Monday...6-Saturday.
                Error   - Boolean attribute, to represent if the data is valid.[check if year is before the birthday of any character]

    -yearInput: number [User input value of year, default to current year]

    -birthdayData: Object Array
                  [Default JSON data retrived from 'data.js']
                  name: string [name of character]
                  birthday: string to represent data [format 'mm/dd/yyyy']

  */
  cardData: any = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    error: false
  };
  yearInput: number;
  birthdayData: any[] = [];

  /*
  function: getJSONData
  Input: none
  Output: birthdatData Array
  Description: Retrives the data array from 'data.js' file and returns it.
  */
  getJSONData() {
    this.birthdayData = [...data];
    return this.birthdayData;
  }

  /*
  function: setData
  Input: birthdays[string]
        year[number]
  Output: cardData[object]
  Description: Recieve birthdays JSON string and yearInput from user Input.
              Create cardData from the JSON based on the day of week.
              Each attribute is a week of day and has an array of users with birthday on same day.
              Set cardData error if the year is  before the birthday of any user.
  */
  setData(birthdays: string, year: number) {
    this.birthdayData = JSON.parse(birthdays);
    this.yearInput = year;
    this.transformDataIntoCard();
    if (!this.findMaxYear()) { this.cardData.error = true; }
    else { this.cardData.error = false; }
    return this.cardData;
  }

  /*
  function: transformDataIntoCard
  Input: none
  Output: none
  Description: Traverse through the birthday array. Set the user birthday for the given year.
                Push character into the array for the day number specified.
  */
  transformDataIntoCard() {
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
    this.birthdayData.forEach(character => {
      const date = new Date(character.birthday);
      date.setFullYear(this.yearInput);
      this.cardData[date.getDay()].push(character);
    });

  }
  /*
  function: findMaxYear
  Input: none
  Output: boolean
  Description: Traverse through array and find the user with latest birthday.
                Check if the yearInput is before that user's birthday.
                Returns the value of the comparison.
  */
  findMaxYear(): boolean {
    let date: Date;
    date = new Date(this.birthdayData[0].birthday);
    this.birthdayData.forEach(element => {
      if (new Date(element.birthday) > date) {
        date = new Date(element.birthday);
      }
    });
    return date.getFullYear() <= this.yearInput;
  }


}
