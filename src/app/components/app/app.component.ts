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
  vocabilary: Word[];
  selectedWord: Word;

  constructor(
    private dataService: DataService,
    private settings: SettingsService) {
  }

  ngOnInit() {
    this.dataService.getLastWords(this.settings.wordAmount).subscribe(words => {
      this.vocabilary = words;
      this.selectedWord = words[0];
    });
  }
}
