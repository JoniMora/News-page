import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Article, NewsResponse, ArticlesByCategoryAndPage } from '../interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


const apiKey = environment.apiKey;
const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {};

  constructor(private http: HttpClient) { }

  public executeQuery<T>(endpoint: string){
    console.log('Peticion HTTP realizada');
    return this.http.get<T>(`${apiURL}${endpoint}`, {
      params: {
        apiKey,
        country: 'us',
      }
    });
  }

  getTopHeadlines(): Observable<Article[]>{
    return this.executeQuery<NewsResponse>(`/top-headlines?category=business`)
    .pipe(
      map(({articles}) => articles)
    );
  }

  getTopHeadlinesByCategory(category: string, loadMore: boolean = false): Observable<Article[]>{
    if(loadMore){
      return this.getArticlesByCategory(category);
    }
    if(this.articlesByCategoryAndPage[category]){
      return of(this.articlesByCategoryAndPage[category].articles);
    }
    return this.getArticlesByCategory(category);
  }

  private getArticlesByCategory(category: string): Observable<Article[]>{
    if(Object.keys(this.articlesByCategoryAndPage).includes(category)){
      //this.ArticlesByCategoryAndPage[category].page += 0;
    }
    else{
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      };
    }
    const page = this.articlesByCategoryAndPage[category].page + 1;

    return this.executeQuery<NewsResponse>(`/top-headlines?category=${category}&page=${page}`)
    .pipe(
      map(({articles}) => {
        if(articles.length === 0) {
          return this.articlesByCategoryAndPage[category].articles;
        }

        this.articlesByCategoryAndPage[category] = {
          page,
          articles: [...this.articlesByCategoryAndPage[category].articles, ...articles]
        };
        return this.articlesByCategoryAndPage[category].articles;
      })
    );
  }
}
