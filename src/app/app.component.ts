import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { TranslateService } from './translate.service';
import { SearchImageService } from './search-image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TranslateService, SearchImageService]
})
export class AppComponent implements OnInit {
  title: string;
  translatedText: string;
  imageUrls: string[];

  constructor(private dataService: DataService, 
    private translateService: TranslateService,
    private searchImageService: SearchImageService) {
  }

  ngOnInit() {
    this.dataService.getLastWord().then(lastWord => {
      this.title = lastWord;

      this.translateService.translate(lastWord)
        .subscribe(text => this.translatedText = text);

      this.searchImageService.getImage(lastWord).
        subscribe(item => {
          this.imageUrls = item.hits.map(s=>s.previewURL);
        });
    });
  }
}
