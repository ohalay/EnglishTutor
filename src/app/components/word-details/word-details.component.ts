import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { SearchImageService } from '../../services/search-image.service';

@Component({
  selector: 'app-word-details',
  templateUrl: './word-details.component.html',
  styleUrls: ['./word-details.component.css'],
  providers: [SearchImageService]
})
export class WordDetailsComponent implements OnChanges {

  @Input() word: Word;

  imageUrls: string[];

  constructor(private searchImageService: SearchImageService) {
  }


  ngOnChanges(changes: {[ propName: string]: SimpleChange}){
    if (changes['word'] && changes['word'].currentValue) {
      this.searchImageService.getImage(this.word.name)
        .subscribe(item => {
            this.imageUrls = item.hits.map(s => s.previewURL);
          });
    }
  }

}
