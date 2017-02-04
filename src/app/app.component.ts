import { Component, OnInit } from '@angular/core';
import { DataService } from  './data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title : string;

  constructor(private dataService:DataService){
  }

  ngOnInit(){
     this.dataService.getTitle()
      .then(titele => this.title = titele);
  }
}
