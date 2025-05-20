import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'mrl-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.less'],
  standalone: false,
})
export class TermsAndConditionsComponent {
  private readonly title = inject(Title);

  constructor() {
    this.title.setTitle('Music Revolution - Términos y Condiciones');
  }
}
