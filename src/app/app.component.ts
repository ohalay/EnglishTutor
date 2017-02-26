import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { TranslateService } from './services/translate.service';
import { SearchImageService } from './services/search-image.service';

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
    this.dataService.getLastWords(1).subscribe(word => {
      this.title = word[0].name;

      this.translateService.translate(word[0].name)
        .subscribe(text => this.translatedText = text);

      this.searchImageService.getImage(word[0].name).
        subscribe(item => {
          this.imageUrls = item.hits.map(s => s.previewURL);
        });
    });
  }
}
