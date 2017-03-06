import { Component, Input, Output, EventEmitter,  OnChanges, SimpleChange } from '@angular/core';
import { TranslateService } from '../../services/translate.service';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-vocabilary',
  templateUrl: './vocabilary.component.html',
  styleUrls: ['./vocabilary.component.css'],
  providers: [TranslateService, DataService]
})

export class VocabilaryComponent implements  OnChanges {

  @Input() vocabilary: Word[];

  @Input() selectedWord: Word;
  @Output() selectedWordChange = new EventEmitter<Word>();


  constructor( private translateService: TranslateService,
    private dataService: DataService) {
  }

  ngOnChanges(changes: {[ propName: string]: SimpleChange}){
    if (changes['selectedWord'] && changes['selectedWord'].currentValue) {
      (<WordModel>this.selectedWord).isSelected = true;
    }
  }

  playAudio(word: Word) {
    const audio = new Audio(word.audioFilePath);
    audio.play();
  }

  translate(word: WordModel) {
    let promise = new Promise<WordModel>((resolve, reject) => resolve(word));
    if (!word.translation) {
      promise = this.translateService.translate(word.name)
        .then(text => {
          word.translation = text;
          return word;
        });
    }
    promise.then(wordModel => {
      this.updateWord(wordModel);
      wordModel.showTranslation = true;
    });
    return false;
  }

  private updateWord(word: WordModel) {
    word.translateAmount = word.translateAmount ? ++word.translateAmount : 1;
    word.lastTranslated = Date.now();
    this.dataService.updateWord(this.toWord(word));
  }

  selectWordChanged(word: WordModel) {
    (<WordModel>this.selectedWord).isSelected = false;
    word.isSelected = true;
    this.selectedWordChange.emit(word);
  }

  private toWord(wordModel: WordModel): Word {
    let word = Object.assign({}, wordModel);

    delete word.isSelected;
    delete word.showTranslation;

    return word;
  }
}

interface WordModel extends Word {
  showTranslation: boolean;
  isSelected: boolean;
}
