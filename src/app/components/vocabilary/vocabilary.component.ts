import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '../../services/translate.service';
import { DataService } from '../../services/data.service';
import { OxfordDictionaryService } from '../../services/oxford-dictionary.service';


@Component({
  selector: 'app-vocabilary',
  templateUrl: './vocabilary.component.html',
  styleUrls: ['./vocabilary.component.css'],
  providers: [TranslateService, DataService, OxfordDictionaryService]
})

export class VocabilaryComponent {

  @Input() vocabilary: Word[];

  @Input() selectedWord: Word;
  @Output() selectedWordChange = new EventEmitter<Word>();


  constructor( private translateService: TranslateService,
    private dataService: DataService,
    private oxfDictionaryService: OxfordDictionaryService) {
  }

  translate(word: WordModel) {
    const promise = new Promise<Word>((resolve, reject) =>{
      if (!word.translation) {
      this.translateService.translate(word.name)
          .subscribe(text => {
            word.translation = text;
            resolve(word);
          });
      } else {
        resolve(word);
      }
    });
    promise.then(item => {
      this.updateWord(item);
      word.showTranslation = true;
    });

    return false;
  }

  private updateWord(word: Word) {
    word.translateAmount = word.translateAmount ? ++word.translateAmount : 1;
    word.lastTranslated = Date.now();
    this.dataService.updateWord(word)
      .subscribe(resp => console.log(resp));
  }

  selectWordChanged(word: any) {
    this.selectedWordChange.emit(word);
  }
}

interface WordModel extends Word {
  showTranslation: boolean;
}
