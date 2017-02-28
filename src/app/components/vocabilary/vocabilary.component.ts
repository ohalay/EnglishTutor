import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-vocabilary',
  templateUrl: './vocabilary.component.html',
  styleUrls: ['./vocabilary.component.css'],
  providers: [TranslateService]
})
export class VocabilaryComponent implements OnInit {

  constructor( private translateService: TranslateService) { 
  }

  @Input()
  vocabilary: Word[]

  ngOnInit() {
  }

  translate(word:string){
     this.translateService.translate(word)
        .subscribe(text => {
          var currentWord = this.vocabilary.find(s=>s.name === word);
          currentWord.translation = text;
        });
  }
}
