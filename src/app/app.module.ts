import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/app/app.component';
import { DataService } from './services/data.service';
import { SettingsService } from './services/settings.service';
import { VocabilaryComponent } from './components/vocabilary/vocabilary.component';
import { WordDetailsComponent } from './components/word-details/word-details.component';


@NgModule({
  declarations: [
    AppComponent,
    VocabilaryComponent,
    WordDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DataService, SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
