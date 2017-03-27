import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-word-details',
  templateUrl: './word-details.component.html',
  styleUrls: ['./word-details.component.css'],
  providers: []
})
export class WordDetailsComponent{

  @Input() word: Word;

  constructor() {
  }
}
