import { Component, Input, Output, EventEmitter,  OnChanges, SimpleChange } from '@angular/core';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.css'],
  providers: [DataService]
})

export class VocabularyComponent implements  OnChanges {

  @Input() vocabulary: Word[];

  @Input() selectedWord: Word;
  @Output() selectedWordChange = new EventEmitter<Word>();


  constructor(private dataService: DataService) {
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
    this.dataService.translateWord(word.name).then(res => {
      word.translation = res;
      word.showTranslation = true;
    });
    // return false;
  }

  selectWordChanged(word: WordModel) {
    (<WordModel>this.selectedWord).isSelected = false;
    word.isSelected = true;
    this.selectedWordChange.emit(word);
  }
}

interface WordModel extends Word {
  showTranslation: boolean;
  isSelected: boolean;
}
