import { OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { Article, NewsResponse } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  @ViewChild (IonInfiniteScroll, {static:true}) infititeScroll: IonInfiniteScroll;

  public articles: Article[] = [];

  constructor(private newsServices: NewsService) {}

  ngOnInit(): void {
    this.newsServices.getTopHeadlines()
      .subscribe(articles => {
        console.log(articles);
        this.articles.push(...articles);
      });
  }

  loadData(){
    console.log();
    this.newsServices.getTopHeadlinesByCategory('business', true)
      .subscribe(articles => {
        if(articles.length === this.articles.length){
          this.infititeScroll.disabled = true;
          return;
        }
        this.articles = articles;
        this.infititeScroll.complete();
      });
  }

}
