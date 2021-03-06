import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SettingsService]
})
export class AppComponent implements OnInit {
  vocabulary: Word[];
  selectedWord: Word;

  constructor(
    private dataService: DataService,
    private settings: SettingsService) {
  }

  ngOnInit() {
    this.dataService.getLastUserWords(this.settings.wordAmount).then(words => {
      this.dataService.getVocabularyWordInfo(words.map(s => s.name))
        .then(res => {
          this.vocabulary = res.map(wordInfo => {
            const wordStatistic = words.find(data => data.name === wordInfo.name);
            return Object.assign(wordStatistic, wordInfo);
          });
          this.selectedWord = this.vocabulary[0];
        });
    });
  }
}
