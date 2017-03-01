import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-vocabilary',
  templateUrl: './vocabilary.component.html',
  styleUrls: ['./vocabilary.component.css'],
  providers: [TranslateService]
})
export class VocabilaryComponent {

  @Input() vocabilary: Word[];

  @Input() selectedWord: Word;
  @Output() selectedWordChange = new EventEmitter<Word>();


  constructor( private translateService: TranslateService) {
  }

  translate(word: Word) {
     this.translateService.translate(word.name)
        .subscribe(text => {
          word.translation = text;
        });
    return false;
  }

  selectWordChanged(word: Word) {
    this.selectedWordChange.emit(word);
  }
}
