import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'mrl-menu-container',
  templateUrl: './menu-container.component.html',
  styleUrls: ['./menu-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuContainerComponent {
  categories$ = this.getCategories().pipe(map(response =>  response.results));
  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get<any>(`/mrlApi/categories`);
  }
}
