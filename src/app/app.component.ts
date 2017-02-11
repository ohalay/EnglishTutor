import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { TranslateService } from './translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TranslateService]
})
export class AppComponent implements OnInit {
  title: string;
  translatedText: string;
  constructor(private dataService: DataService, private translateService: TranslateService) {
  }

  ngOnInit() {
    this.dataService.getLastWord().then(lastWord => {
      this.title = lastWord;
      this.translateService.translate(lastWord)
      .subscribe(text => this.translatedText = text);
    });
  }
}
