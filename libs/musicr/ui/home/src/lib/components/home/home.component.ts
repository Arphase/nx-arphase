import { Component } from '@angular/core';

@Component({
  selector: 'mrl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent {
  reviews = [
    {
      name: 'Sandra Leyva',
      content: `Todo el equipo fue muy profesional de inicio a fin. A mis invitados les encantó el evento y en lo personal sobrepasaron mis expectativas.
      Si vas a hacer un evento próximamente te los recomiendo 100%`,
    },
    {
      name: ' Augusto Sanoja',
      content: `Me encantó el servicio, muy buena música y excelente ambiente. Además me dieron un muy buen precio por todo el servicio (dj, pista, bartender y salas lounge).`,
    },
    {
      name: 'Gerardo Ortega',
      content: `Los he contratado varias veces y siempre buenísimo el ambiente! Tienen todo lo que necesitas para cualquier tipo de evento. Súper recomendados.`,
    },
    {
      name: 'Balbina Garza',
      content: `Los contraté para mi boda (sin tener referencia de ellos) y superó cañón mis expectativas.
      La pista llena toda la noche, de verdad nos la pasamos increíble.
      Aparte desde la primera vez que nos reunimos fueron muy amables y atentos.`,
    },
    {
      name: 'Mafer Cuevas',
      content: `Me gustó muchísimo la selección de la música.
      La atención durante la planeación de mi evento fue buenísima y me quitaron mil pendientes de encima, ellos se encargaron de todo.
      ¡El mobiliario está en súper buen estado! Lo recomiendo bastante.`,
    },
    {
      name: 'Alec Muñoz',
      content: `Me gustó mucho el Dj y la pista, el servicio fué muy profesional y puntual. El servicio y la atención 10/10.`,
    },
    {
      name: 'Pamela Mirón',
      content: `Desde el principio la atención estuvo increíble, me ayudaron a escoger el paquete para mi evento.
      Lo mejor fue poder contratar la música, todo el set de mesas+sillas+toldos y meseros con un sólo proveedor.
      Prácticamente ellos se encargaron de todo. Super confiables, claro que volveremos a contratarlos.`,
    },
  ];
}
