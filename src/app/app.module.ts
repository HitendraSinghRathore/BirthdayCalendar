import { JsonPipe } from '@angular/common';
import { DaysComponent } from './common/days.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NamePipe } from './common/name.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DaysComponent,
    NamePipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [JsonPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
