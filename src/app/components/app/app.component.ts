import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { SearchImageService } from '../../services/search-image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SearchImageService]
})
export class AppComponent implements OnInit {
  vocabilary: Word[];

  constructor(private dataService: DataService, 
    private searchImageService: SearchImageService) {
  }

  ngOnInit() {
    this.dataService.getLastWords(5).subscribe(words => {
      this.vocabilary = words;
      // this.searchImageService.getImage(word[0].name).
      //   subscribe(item => {
      //     this.imageUrls = item.hits.map(s => s.previewURL);
      //   });
    });
  }
}
