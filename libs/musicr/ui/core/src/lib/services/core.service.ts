import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsCollectionResponse } from '@arphase/common';
import { Category } from '@musicr/domain';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCategories(): void {
    this.http
      .get<ApsCollectionResponse<Category>>(`/mrlApi/categories`)
      .pipe(take(1))
      .subscribe(({ results }) => this.categoriesSubject.next(results));
  }
}
