import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'vma-frequent-questions',
    templateUrl: './frequent-questions.component.html',
    styleUrls: ['./frequent-questions.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FrequentQuestionsComponent {
  pageTilte = 'frequent questions';
  FrequentQuestions: Record<string, string>[] = [
    {
      question: '¿Puedo invitar personas adicionales a mi alojamiento?',
      answer: 'Para asegurar que todos los huéspedes disfruten su estancia al 100% no se podrá exceder la capacidad máxima de cada alojamiento.',
    },
    {
      question: '¿Pueden ir niños?',
      answer: '¡Claro! Valmira ofrece opciones que se adecúan a cada huésped. En el caso de los niños, la mejor opción son los alojamientos de la categoría “Familiar”.',
    },
    {
      question: '¿Puedo traer a mi mascota?',
      answer: 'Sabemos que tu alojamiento no podría estar completo sin tu mascota, ¡así que estamos preparados para recibirlas!',
    },
    {
      question: '¿Qué tan seguros son los alojamientos?',
      answer: 'Los alojamientos siguen protocolos estrictos para que tú y tus acompañantes puedan disfrutar sin riesgos. Y aún ante cualquier imprevisto, el lobby está preparado con botiquín, y demás elementos de seguridad.',
    },
    {
      question: '¿Hay estacionamiento suficiente?',
      answer: 'Por supuesto, los cajones están asignados de acuerdo a la cantidad de huéspedes establecida para cada alojamiento: 1 cajón para los alojamientos de la categoría “Pareja” y dos cajones para “Familiar”.',
    },
    {
      question: '¿Dónde están ubicados?',
      answer: 'Valmira se encuentra ubicado en Valle Venado Safari, en la zona campestre de Montemorelos. A 55 minutos de la ciudad de Monterrey, N.L.',
    },
  ];
}
