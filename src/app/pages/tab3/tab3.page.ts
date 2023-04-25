import { Component } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article, NewsResponse } from 'src/app/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  // public articles: Article[] = [];

  // constructor(private newsServices: NewsService) {}

  // ngOnInit(): void {
  //   this.newsServices.getTopHeadlines()
  //     .subscribe(articles => {
  //       console.log(articles);
  //       this.articles.push(...articles);
  //     });
  // }

}
