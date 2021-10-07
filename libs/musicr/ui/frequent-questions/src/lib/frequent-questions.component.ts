import { ChangeDetectionStrategy, Component } from '@angular/core';

interface FrequentQuestion {
  question: string;
  answer: string[];
}
@Component({
  selector: 'mrl-frequent-questions',
  templateUrl: './frequent-questions.component.html',
  styleUrls: ['./frequent-questions.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FrequentQuestionsComponent {
  pageTilte = 'frequentquestions';
  FrequentQuestions: FrequentQuestion[] = [
    {
      question: '¿Qué pasa después de que hago un pedido?',
      answer: [
        'Una vez realizado el pedido te enviaremos la confirmación por correo. Igualmente, nos contactaremos contigo por WhatsApp para afinar detalles de tu evento (horarios de montaje y entrega, accesos, especificaciones de los servicios contratados, etc).',
      ],
    },
    {
      question: '¿Qué tarifas se pueden cobrar adicionalmente?',
      answer: [
        'La gran mayoría de las veces no se agrega una tarifa adicional a la que ves anunciada en los servicios. Sin embargo, existen dos tarifas que pueden sumarse al total: tarifa de traslado (flete) y tarifa por maniobra.',
        'La tarifa de traslado (flete) se añade a eventos cuyo total sea inferior a $1,000 pesos, o bien cuando los eventos se llevan a cabo en direcciones que no pertenezcan al área metropolitana de Monterrey (Santiago, Allende, Montemorelos, Cadereyta, Zuazua, García, etc). La tarifa de traslado varía de acuerdo a la dirección del evento.',
        'La tarifa por maniobra es un monto que se cobra si el lugar donde se hará la instalación no es de fácil acceso: cuando el montaje implica subir o bajar muchas escaleras, cargar con el equipo por una distancia considerable, a travesar un lugar peligroso, etc. Se calcula de acuerdo a la complejidad del montaje y de los servicios contratados.',
      ],
    },
    {
      question: '¿Cómo sé si un servicio está disponible?',
      answer: [
        'La gran mayoría de las veces nuestros servicios están disponibles. Una vez realizado el pedido te llegará un correo confirmando o denegando la disponibilidad de los servicios contratados.',
        'En caso de contratar un servicio que no está disponible te asesoraremos para contratar uno similar, o bien se hará la devolución del pago.',
      ],
    },
    {
      question: '¿Se pueden hacer cambios en el pedido?',
      answer: [
        '¡Claro! Cuando nos contactemos contigo por WhatsApp podrás indicarnos las especificaciones de los servicios que estás contratando. Igualmente podrás quitar, agregar más servicios o cambiar la fecha del evento; siempre y cuando los servicios contratados estén disponibles para la nueva fecha indicada.',
        'Cabe mencionar que no se pueden hacer cambios en el pedido el mismo día del evento. Igualmente, la cancelación de servicios puede implicar una penalización de acuerdo a la anticipación con la que se realicen.',
      ],
    },
    {
      question: '¿Music Revolution da servicio fuera del área metropolitana de Monterrey?',
      answer: [
        'Así es, no solo damos servicio en San Pedro, Monterrey, San Nicolás y otros municipios de la zona metropolitana de Monterrey, sino que atendemos todos los municipios del estado.',
        'No obstante, por el momento solo damos servicio en Nuevo León, México.',
      ],
    },
    {
      question: '¿Qué es la tarifa por maniobra?',
      answer: [
        'La tarifa por maniobra es un monto que se cobra adicionalmente si el lugar donde se hará la instalación no es de fácil acceso: cuando el montaje implica subir o bajar muchas escaleras, cargar con el equipo por una distancia considerable, a travesar un lugar peligroso, etc. Se calcula de acuerdo a la complejidad del montaje y de los servicios contratados.',
      ],
    },
    {
      question: '¿Qué formas de pago tienen?',
      answer: [
        'Puedes realizar el pago por medio de transferencia bancaria, depósito en banco o tienda de autoservicio (OXXO, Seven Eleven, Farmacias Guadalajara). O bien, con tu tarjeta de crédito (PayPal).',
      ],
    },
    {
      question: '¿Con qué tiempo mínimo debo contratar un servicio?',
      answer: [
        'Realmente no hay un tiempo mínimo, tu puedes contratar un servicio el mismo día del evento, siempre y cuando esté disponible. No obstante, de acuerdo a nuestra experiencia: recomendamos completar el pedido con al menos una semana de anticipación, esto para garantizar la disponibilidad del servicio.',
      ],
    },
    {
      question: '¿Cómo puedo recibir una factura por los servicios contratados?',
      answer: [
        'Una vez que nos pongamos en contacto contigo, indícanos tu deseo de recibir una factura. Te pediremos la información necesaria para emitirla y posteriormente la enviaremos a tu correo.',
      ],
    },
    {
      question: '¿Qué pasa si deseo cancelar un servicio o un evento completo?',
      answer: [
        'Si deseas cancelar un servicio o un evento con más de cinco días de anticipación se cobrará una penalización; debido a que al contratar un servicio este deja de estar disponible para otros clientes, por lo que corre el riesgo de ser desaprovechado. El monto restante se te devolverá cuanto antes, por la vía que tu nos indiques.',
        'Si el servicio o evento es cancelado con menos de cinco días de anticipación no se devolverá el pago realizado.',
      ],
    },
  ];
}
