import { Component } from '@angular/core';

@Component({
  selector: 'ivt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent {
  products = [
    { img: 'assets/img/_0000_Proyector.jpg', name: 'Proyector', price: '6500' },
    { img: 'assets/img/_0001_Bartender.jpg', name: 'Bartender', price: '2500' },
  ];

  reviews = [
    {
      name: 'Andrea Josefina',
      content: `Por mucho el mejor termostato que he tenido en mi vida, lo puedo
      manejar desde mi móvil y eso me da facilidad y tranquilidad. Puedo prender y apagar,
      controlar temperaturas, programar, etc desde cualquier lugar del mundo.`,
    },
    {
      name: 'Andres Josefin',
      content: `aklsdflaknsdknflkalkdnlaknslkdvnlkad.`,
    },
    {
      name: 'Andrea Josefina',
      content: `Por mucho el mejor termostato que he tenido en mi vida, lo puedo
      manejar desde mi móvil y eso me da facilidad y tranquilidad. Puedo prender y apagar,
      controlar temperaturas, programar, etc desde cualquier lugar del mundo.`,
    },
  ];
}
