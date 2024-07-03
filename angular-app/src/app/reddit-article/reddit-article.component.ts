import { Component, HostBinding, OnInit, Input} from '@angular/core';
import {Article} from "./article.model";

@Component({
  selector: 'app-reddit-article',
  templateUrl: './reddit-article.component.html',
  styleUrl: './reddit-article.component.css'
})
export class RedditArticleComponent implements OnInit{
  // create a property for the CSS class we want to apply to the “host”(app-article tag) of this component
  @HostBinding('attr.class') cssClass = 'row';
  // votes: number;
  // title: string;
  // link: string;
  //article: Article;
  @Input() article!: Article;

  constructor() {
    // this.votes = 10;
    // this.title = 'Ng book';
    // this.link = 'http://angular.io'
    //this.article = new Article('Ng book', 'http://angular.io', 10);
  }

  voteUp(){
    //++this.votes;
    this.article.voteUp();
    return false;
  }
  voteDown(){
    //--this.votes;
    this.article.voteDown();
    return false;

  }

  ngOnInit() {}

}

