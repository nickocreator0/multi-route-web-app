import { Component } from '@angular/core';
import {RedditArticleComponent} from "../reddit-article/reddit-article.component";
import { Article} from "../reddit-article/article.model";
import {NgForOf} from "@angular/common";
import {Location} from "@angular/common";

@Component({
  selector: 'app-reddit',
  templateUrl: './reddit.component.html',
  styleUrl: './reddit.component.css'
})
export class RedditComponent {
  articles: Article[]

  alertTimeout: any;

  constructor(private location: Location) {
    this.articles = [
      new Article('My Articles', 'https://cognimachina.com/posts/', 6),
      new Article('My Kaggle', 'https://kaggle.com/nickoreese/', 3),
    ];
  }
  //title = 'angular-reddit';

  // Event 4
  isValidUrl(input: HTMLInputElement): boolean {
    const urlPattern: RegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
    return urlPattern.test(input.value);
  }


  addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean {

    // Validate URL
    if (!this.isValidUrl(link)) {
      this.alertTimeout = setTimeout(() => {
        alert('Invalid URL');
      }, 100);
      // Prevent from adding the article
      return false;
    }

    this.articles.push(new Article(title.value, link.value, 0));

    title.value = '';
    link.value = '';
    return false;
  }
  sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }

  // Event 1
  goBack(): void {
    this.location.back();
  }

}

