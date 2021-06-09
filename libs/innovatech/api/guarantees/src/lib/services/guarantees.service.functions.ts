import 'dayjs/locale/es';

import { filterCommonQuery, IMAGE_ASSETS_PATH } from '@innovatech/api/core/util';
import { GuaranteeEntity } from '@innovatech/api/domain';
import { formatAddress, Guarantee, sortDirection, transformFolio, User } from '@innovatech/common/domain';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { SelectQueryBuilder } from 'typeorm';

import { GetGuaranteesFilterDto } from '../dto/get-guarantees-filter.dto';

dayjs.extend(LocalizedFormat);

export function getGuaranteePdfTemplate(guarantee: Guarantee): string {
  return `
  <html>
    <head>
        <meta charset=UTF-8>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
        <style>
            html {
              font-family: 'Open Sans' !important;
              font-size: 12px;
              line-height: 1.1;
              background-color: transparent;
            }
            .bold {
              font-weight: 900;
            }
            .row {
              display: flex;
              flex-wrap: wrap;
            }
            .col {
              flex-basis: 0;
              flex-grow: 1;
              max-width: 100%;
              display: flex;
              align-items: center
            }
            .guarantee-info {
              max-width: 80%;
            }
            .folio {
              font-size: 18px;
            }
            .center {
              text-align: center;
            }
            .title {
              font-size: 14px;
            }
            .logo {
              max-width: 20%;
              height: auto;
            }
            span.footer {
              max-width: 100%;
              height: 50%;
            }
            footer {
            max-width: 100%;
              height: auto;
            }
        </style>
    <head>
    <body>
    <div><img class="logo" src="${IMAGE_ASSETS_PATH}/logo.png"></div>
        <p class="center bold">¡MUCHAS FELICIDADES!</p>
        <p>Le damos la más cordial bienvenida Innovatech. Este programa ha sido diseñado pensando en brindarles protección contra desembolsos excesivos e
        imprevistos en caso de que su vehículo presente alguna avería mecánica de manera fortuita en sistemas eléctricos mecánicos o electrónicos</p>
        <p>Lo invitamos a consultar los términos, condiciones y exclusiones de la cobertura contratada de acuerdo a la carátula y los anexos de la presente.</p>
        <div class="row">
            <div class="col">
              <p>Su número de Certificado de Garantía es: <span class="bold folio">${transformFolio(
                guarantee.id
              )}</span></p>
            </div>
            <div class="col">
              <img class="guarantee-info" src="${IMAGE_ASSETS_PATH}/guarantee-info.png">
            </div>
        </div>
        <p>Ante cualquier duda, ponerse en contacto con el área de servicio al cliente.</p>
        <p>*Los datos introducidos tendrán que coincidir fehacientemente con los del vehículo objeto de garantía. En caso de error será motivo de rescisión del contrato.</p>
        <p><span class="bold">PUNTO DE VENTA:</span> ${guarantee.client.salesPlace}</p>
        <p><span class="bold">R.F.C.</span> ${guarantee.client.rfc}</p>
        <p><span class="bold">DIRECCIÓN:</span> ${formatAddress(guarantee.client.address)} </p>
        <p><span class="bold">TELEFONO:</span> ${guarantee.client.phone}</p>
        <p><span class="bold">EMAIL:</span> ${guarantee.client.email}</p>
        <p class="bold">DATOS DEL VEHÍCULO:</p>
        <p><span class="bold">MARCA:</span> ${guarantee.vehicle.brand}
        <span class="bold"> - NUMERO DE SERIE:</span> ${guarantee.vehicle.vin} <span class="bold"> - HP:</span> ${
    guarantee.vehicle.horsePower
  } </p>
        <p><span class="bold">MODELO:</span> ${guarantee.vehicle.model}</p>
        <p><span class="bold">MOTOR:</span> ${guarantee.vehicle.motorNumber}</p>
        <center><p>PERIODO DE VIGENCIA</p></center>
        <p><span class="bold">FECHA INICIO GARANTIA:</span> ${dayjs(guarantee.startDate).locale('es').format('LL')}</p>
        <p><span class="bold">FIN GARANTIA POR TIEMPO:</span> ${dayjs(guarantee.endDate).locale('es').format('LL')}</p>
        <p><span class="bold">KILOMETRAJE INICIAL: </span> ${
          guarantee.kilometrageStart
        } <span class="bold"> - FIN GARANTIA POR KILOMETRAJE: </span> ${guarantee.kilometrageEnd} </p>
        <p>Siempre que se hayan realizado en el VEHÍCULO en tiempo y forma los servicios y mantenimientos señalados en el certificado de garantía; el PERIODO DE VIGENCIA podrá comenzar a computarse hasta el dayjso en que expire la garantía del fabricante o alguna otra garantía de similar naturaleza, ya sea por sobrepasar el kilometraje o cumplirse el tiempo establecido en la misma.</p>
        <p>En caso de rescisión anticipada de esta garantía, Innovatech no estará obligada a la devolución del precio.</p>
        <p>COBERTURAS</p>
        <p>MOTOR Cabezas de motor, block de motor, pistones, anillos, pernos, cigüeñal, metales de biela y bancada, árboles de levas y metales de árboles, válvulas, sus guías y capuchones, bomba de aceite, cadenas de tiempo y sus tensores, guías de cadena de tiempo, banda de tiempo, engranes de cadena de tiempo, tapas de distribución, bombas de vacío, botadores y punterías, : Árbol de levas, Balancines, Bielas, Bloque, Bomba de aceite, Pernos, Camisas de pistón, Cigüeñal, Cilindros, Cojinetes/Metales, Culata, Junta de culata, Muelles válvulas, Pistones, Anillos, Válvulas admisión/escape, Buzos</p>
        <p>TRANSMISIÓN Turbina (bomba de aceite), discos de embrague, platos de embrague, metales de embrague, cajas de válvulas y solenoides, diferencial (piñón y coronas) y caja de transferencia. </p>
        <ul>
            <li>STD: Arboles, Engranajes/piñones, Horquilla selectora, Primario/tren fijo, Rodamientos/cojinetes, Sincronizadores, Chicote cuentakilómetros. </li>
            <li>AUT: Bomba de Aceite, Convertidor de par, Sensor de posición palanca Automática., Servo, Bloque de válvulas (Excluidos solenoides de cambio).  </li>
            <li>CVT: Bomba de Aceite, Convertidor de par, Sensor de posición palanca Automática., Bloque de válvulas (Excluidos solenoides de cambio). </li>
        </ul>
        <p>DIRECCIÓN Cremallera, caja de dirección, piñones y partes internas lubricadas, bombas de dirección, dirección asistida, cremallera electrónica, bomba de aceite, Caja de dirección mecánica e hidráulica, Columna de dirección mecánica y electrónica.</p>
        <p>SISTEMA DE ENFRIAMIENTO DE MOTOR Radiador de motor y calefacción, moto ventiladores y FAN CLUTCH, bomba de agua y termostato, moto ventilador, Bulbo de radiador (Excluido sensor de temperatura), Termostato, Radiador, Sonda de nivel de refrigerante, Radiador enfriador de aceite.</p>
        <p>FRENOS Bomba de frenos, booster, mordazas frontales y traseros, cilindros de rueda trasera, módulo de ABS, Módulo de ABS, Acumulador de presión, Bomba de vacío eléctrica, Cilindro de freno, Dosificador frenada, Servofreno, Mordazas/Cálipers</p>
        <p>SISTEMA ELÉCTRICO Alternador, regulador de voltaje y motor de arranque (marcha), Béndix, Bobina de encendido, PCM, Alternador, Marcha, Motor calefacción, Motor elevador de cristales, Motor limpia faros, Motor limpia parabrisas, Motor limpia parabrisas luneta, Moto ventilador evaporador, Actuadores de seguros</p>
        <p>AIRE ACONDICIONADO Compresor con sus válvulas y bobina, evaporador por fugas, filtro deshidratador por tapones, mangueras por fugas, motor soplador, condensador por fugas, Evaporador, Válvula de expansión, Módulo de mando electrónico.</p>
        <p>SUSPENSIÓN: Barra estabilizadora, Barras de torsión, Rótulas.</p>
        <p>SISTEMA DE ALIMENTACIÓN: Sensor de presión gasolina, Flotador de combustible, Bomba combustible, Bomba inyectora, Intercooler, Regulador presión gasolina, Inyectores, Turbocompresor, Válvula estabilizadora de ralentí, Caja de mariposa mecánica.</p>
        <p>DIFERENCIAL: Corona, Piñón de ataque, Planetario, Satélites, Flechas laterales de diferencial trasero, Engranaje reducción.</p>
        <p>Se excluyen los siguientes elementos a la garantía:</p>
        <ul>
            <li>Asientos completos y mecanismos (mecánicos)</li>
            <li>Elementos internos del habitáculo y/o maletero (tapizados, guarnecidos, reposabrazos, salpicadero, consolas, soportes, tapas, aireadores, ceniceros, encendedor, lámparas) </li>
            <li>Neumáticos, válvula de rueda (con o sin sensor)</li>
            <li>Totalidad de los elementos de carrocería </li>
            <li>Totalidad de cristales y lunas, incluida térmica </li>
            <li>Faros, intermitentes, calaveras, lámparas </li>
            <li>Molduras, embellecedores, espejos retrovisores completos, paragolpes</li>
        </ul>
        <p>Objetivo.</p>
        <p>Este certificado garantiza la reparación de las AVERÍA/AS, y tendrá un periodo de garantía cubierto por el tiempo o kilometraje indicado.  Por tanto, sólo estarán cubiertas las AVERÍA/AS que tenga el VEHÍCULO durante la vigencia del contrato. No cabe la prórroga del contrato.</p>
        <p>Límites de la Garantía</p>
        <p>Si transcurridas 48 horas desde la creación del presente documento, el CONTRATANTE no hubiera pagado el precio, INNOVATECH se reserva el derecho a dejar sin efecto el presente certificado, o a exigir alguna obligación.</p>
        <p>La garantía objeto del presente contrato se extiende y limita a las AVERÍA/AS que tengan lugar dentro de la República Mexicana.</p>
        <p>Con anterioridad a la venta de este certificado, se deberá revisar el VEHÍCULO, y en caso de que el mismo tenga cualquier tipo de avería, se tendrá la obligación de repararla antes de la venta. Cualquier avería anterior a la venta del certificado no está cubierta por ser preexistencia.</p>
        <p>Para que el presente certificado sea efectivo, el BENEFICIARIO se obliga a:</p>
        <ul>
            <li>Efectuar las inspecciones requeridas en cambio de Aceite Motor, Filtro de Aceite y Verificación de Fugas, Ruidos y Holguras. Estas operaciones se tendrán que hacer en periodos de 6 meses o 10.000 kilómetros, lo que antes ocurra.</li>
            <li>Efectuar las inspecciones requeridas POR EL FABRICANTE SIGUIENDO SU PLAN DE MANTENIMIENTO PRECONIZADO, tanto en periodos de tiempo como en kilometraje.</li>
            <li>Comunicar a Innovatech todas las AVERÍA/AS que tenga el VEHÍCULO durante el periodo de vigencia del contrato.</li>
            <li>En caso de AVERÍA/AS, seguir estrictamente el de reclamación. </li>
            <li>Realizar en el VEHÍCULO los mantenimientos periódicos exigidos tanto por el fabricante del VEHÍCULO como por Innovatech y conservar las facturas correspondientes a las actuaciones de mantenimiento descritas en este certificado</li>
            <li>Hacer un uso del VEHÍCULO razonable a las características del mismo.</li>
            <li>En caso de AVERÍA/AS, no agravar la misma por un uso inadecuado o negligente del VEHÍCULO.</li>
            <li>Para que el presente certificado sea efectivo, el CONTRATANTE se obliga a:</li>
            <li>Pagar a INNOVATECH el precio del contrato de garantía, y el I.V.A. correspondiente a dicho precio. </li>
            <li>Deberá poner en conocimiento del BENEFICIARIO y de Innovatech, todas las reparaciones realizadas en el VEHÍCULO, así como si el mismo ha tenido algún accidente o siniestro.</li>
            <li>Deberá entregar el VEHÍCULO al BENEFICIARIO en perfectas condiciones de uso y mantenimientos, acordes con el kilometraje y antigüedad correspondiente.</li>
        </ul>
        <p>*Es necesario cumplir con las obligaciones de contratante y beneficiario para no perder la cobertura de garantía. Innovatech se hace cargo de la reparación de las AVERÍA/AS cubiertas, que dentro del periodo de vigencia pueda tener el VEHÍCULO, siempre y cuando dichas AVERÍAS no traigan causa en un uso inadecuado del VEHÍCULO, o en el deterioro y/o desgaste normal del mismo.</p>
        <p class="center bold title">Procedimiento de reclamación</p>
        <p>En cuanto tenga conocimiento de la AVERÍA/AS, el BENEFICIARIO comunicará la misma a Innovatech por cualquiera de los siguientes medios: </p>
        <ul>
            <li>Por Teléfono, en el +52 (81) 1090 8605 </li>
            <li>Por correo electrónico, a la dirección averias@innovatechcorp.com </li>
        </ul>
        <p>El BENEFICIARIO deberá facilitar el Nº de certificado de garantía, la declaración de la AVERÍA/AS y Lugar en el que se ha producido la AVERÍA/AS , de esa forma Innovatech le indicara un taller en el que dejar el VEHÍCULO.</p>
        <p>Una vez el VEHÍCULO esté en un taller, el responsable del mismo volverá a contactar a Innovatech para describir la AVERÍA/AS, por los mismos medios descritos en la letra anterior, debiendo aportar igualmente la siguiente documentación: </p>
        <p>Orden de entrada del VEHÍCULO, que contenga, al menos, la fecha de entrada del mismo, los kilómetros del VEHÍCULO y descripción de la avería.</p>
        <p>Presupuesto aproximado de la reparación, QUE DEBERÁ REALIZARSE SIN INTERVENIR NI DESMONTAR EL VEHÍCULO. </p>
        <p>Copia del Libro de Mantenimiento del VEHÍCULO </p>
        <p>Copia de las facturas de las inspecciones que deberán tener el Número de taller, según registro especial, Identificación del mismo: Denominación Social, R.F.C., domicilio fiscal, domicilio a efectos de notificaciones, y número de kilómetros. </p>
        <p>Reparaciones incluidas en la factura, desglosando las piezas sustituidas y la mano de obra empleada.</p>
        <p>Fecha y firma o sello del taller. Fecha de entrega del VEHÍCULO. </p>
        <p>Hasta que la reparación de la AVERÍA/AS no esté autorizada por Inovatech, no se podrá realizar en el mismo ningún tipo de desmontaje, montaje, reparación y/o intervención; a no ser que Innovatech lo requiera para poder determinar el origen de la avería. Cualquier autorización a trabajar sobre el vehículo para efectuar (pruebas, desmontajes, diagnosis, etc.) </p>
        <p>El VEHÍCULO tendrá que permanecer inmovilizado hasta que innovatech, resuelva el expediente</p>
        <p>Una vez se haya recibido la documentación indicada en los apartados anteriores, se estudiará el asunto y decidirá sobre la necesidad de realizar un desmontaje para determinar la causa de la AVERÍA/AS.</p>
        <p>La resolución escrita del será remitida al taller desde el que se remitió la documentación sobre la AVERÍA/AS. En caso de que no se siga el procedimiento señalado o la reparación de la Avería o no se encuentre cubierta por el presente Contrato el costo del desmontaje, montaje y/o intervención serán cubiertos por el Cliente, el propietario del Vehículo o el Beneficiario. </p>
        <p>En caso de que la reparación de la AVERÍA/AS sea aceptada, e se detallarán las actuaciones que habrá que efectuar sobre el VEHÍCULO para la reparación de la AVERÍA/AS, así como la valoración de dichas reparaciones o trabajos por el taller correspondiente asignado por Innovatech. En ningún caso se Innovatech se hará cargo de trabajos o reparaciones no autorizadas en la resolución escrita del expediente.</p>
        <p>Una vez reparado el VEHÍCULO por el taller, éste enviará a Innovatech el original de la factura de reparación firmada por el BENEFICIARIO, que incluirá únicamente las reparaciones autorizadas.</p>
        <p>Junto con la factura, el taller deberá remitir Innovatech una copia firmada por el BENEFICIARIO del informe de resolución del expediente</p>
        <p>En el caso de que el presupuesto de reparación de la AVERÍA/AS realizado por el taller sea superior al valor de la reparación autorizada el beneficiario podría decidir no reparar la unidad o pagar la diferencia del costo.</p>
        <center><p>LÍMITES</p></center>
        <ul>
            <li>La valoración de la reparación de la AVERÍA/AS del VEHÍCULO nunca podrá superar el valor de venta del VEHÍCULO que marque el libro azul. </li>
            <li>En caso de que el VEHÍCULO no esté identificados en el libro azul, el cálculo será realizado por un valuador libremente elegido por Innovatech asumiendo ésta los costos de dicha valoración. </li>
            <li>Se podra rechazar la reparación, y/o en su caso el pago de la AVERÍA/AS en los siguientes. </li>
            <li>Cuando se haya realizado cualquier tipo de trabajo sobre el VEHÍCULO antes de la resolución del expediente.</li>
            <li>Cuando el VEHÍCULO no haya permanecido inmovilizado en el taller desde la comunicación de la AVERÍA/AS hasta la resolución del expediente.</li>
            <li>Cuando el BENEFICIARIO no haya cumplido sus obligaciones en relación con los mantenimientos e inspecciones exigidas en el presente contrato. </li>
            <li>Cuando las facturas correspondientes a los mantenimientos periódicos o cualquier documentación exigida no estén debidamente cumplimentadas, o directamente no se aporten en un plazo de 72h tras ser requeridas.</li>
            <li>Cuando se detecte que los kilómetros de inicio del contrato no guardan relación con los kilómetros de la avería o mantenimiento del vehículo. Esta exclusión será motivo cancelación de garantía.</li>
            <li>Cuando la AVERÍA/AS haya sido comunicada transcurrido el plazo de duración del contrato, aun cuando la AVERÍA/AS haya acontecido con anterioridad a su expiración </li>
        </ul>
        <p class="bold">Esta Garantía NO estará obligada a reparar ni a realizar el pago de las siguientes:</p>
        <ul>
            <li>AVERÍA/AS y/o defectos previsibles y/o preexistentes a la contratación de la garantía.
            <li>AVERÍA/AS cuya causa era evidente en el dayjso en que estaba en vigor la garantía del fabricante, independientemente del dayjso en que ésta se hubiere ocasionado.</li>
            <li>AVERÍA/AS que sean consecuencia de una mala reparación anterior.</li>
            <li>La sustitución, reparación, ajustes o reglajes sobre piezas que hayan llegado al final de su vida útil como consecuencia de su función y usabilidad natural.</li>
            <li>Los daños ocasionados por erosión, corrosión, deformación, oxidación, descomposición, herrumbre e incrustaciones, así como elementos que hayan perdido su morfología inicial (bujes, gomas, soportes, juntas, mangueras, retenes) </li>
            <li>La sustitución de lubricantes y otros aditivos, bujías, bujías de encendido, filtros, cartuchos, aceites, juntas, carburantes, cargas de a/a, fugas de aceite, fugas de refrigerante o fugas de combustible, neumáticos, amortiguadores, discos de freno.</li>
            <li>pastillas de freno, correas de distribución, escapes, catalizadores, batería, plumas limpiaparabrisas, en definitiva, cualquier elemento consumible.</li>
            <li>Las actualizaciones, programaciones o cargas de software de cualquier módulo electrónico del vehículo.</li>
            <li>Los costos de diagnóstico cuando las averías no queden cubiertas causadas por elementos no garantizados</li>
            <li>Las operaciones de mantenimiento periódicas, de carácter preventivo. </li>
            <li>Los controles y/o reglajes, con o sin cambio de piezas. </li>
            <li>Averías motivadas por defectos de serie, diseño defectuoso, vicios ocultos, fallo epidémico, campañas del fabricante. </li>
            <li>Cualquier daño sobre piezas garantizadas que se haya producido por la alteración o modificación de la especificación del fabricante. </li>
            <li>Las AVERÍA/AS ocasionadas por seguir circulando con los indicadores de avería, incidencia o alarma indiquen un mal funcionamiento. </li>
            <li>Las AVERÍA/AS ocasionadas por mal uso o negligencia de utilización del vehículo por parte del propietario del titular del contrato.</li>
            <li>Las AVERÍA/AS ocasionadas por el uso del vehículo en competiciones. </li>
            <li>Las AVERÍA/AS ocasionadas por sobrecarga. </li>
            <li>Las AVERÍA/AS ocasionadas por el uso de agentes abrasivos. </li>
            <li>Las AVERÍA/AS ocasionadas por un accidente, robo, tentativa de robo, incendio, explosión, vandalismo o catástrofes naturales.</li>
            <li>Las piezas que sean cambiadas en el dayjso de la reparación sin que hayan fallado. </li>
            <li>Cualquier intervención efectuada “in situ” por cualquier servicio de asistencia en carretera. </li>
            <li>Los servicios de grúa, remolque y gastos de transporte sobre el VEHÍCULO y ocupantes.</li>
            <li>Averías producidas por combustibles o lubricantes no conformes con las indicaciones del fabricante o con alto grado de agua o contaminación de otros elementos químicos. Sustitución, mantenimiento o reparación de accesorios o piezas no montados de origen, aun siendo elementos garantizados. </li>
            <li>Ningún servicio de grúa. </li>
            <li>Gastos de estacionamiento y/o almacenamiento del VEHÍCULO hasta su reparación. </li>
            <li>Daños o pérdidas ocasionadas como consecuencia de la AVERÍA/AS o el retraso en su reparación. </li>
            <li>Lucro cesante por no poder utilizar el VEHÍCULO. </li>
            <li>Los daños a terceros que traigan causa en la AVERÍA/AS.</li>
        </ul>
        <p>Definiciones de términos:</p>
        <ul>
          <li>CONTRATANTE: Tendrá la consideración de CONTRATANTE del contrato el vendedor del VEHÍCULO, que será el obligado al pago del precio del presente contrato de garantía mecánica. BENEFICIARIO: Tendrá la consideración de BENEFICIARIO el comprador del VEHÍCULO, quien será el destinatario de la garantía mecánica objeto del presente contrato. </li>
          <li>VEHÍCULO: A los efectos del presente contrato, tendrá la consideración de VEHÍCULO únicamente el descrito en la HOJA RESUMEN DEL CONTRATO DE GARANTÍA MECÁNICA que, en todo caso, no podrá tener más de 400HP de potencia o tener denominación industrial ya sea ligera o pesada. </li>
          <li>AVERÍA/AS: Se entiende por avería mecánica, eléctrica, o electrónica, la inutilidad operativa (conforme a las especificaciones del fabricante) de la pieza garantizada, debido a una rotura imprevista / fortuita. No se incluye en esta definición la reducción gradual en el rendimiento operativo de la pieza garantizada que sea proporcional y equivalente a su antigüedad y kilometraje (se entiende a partir de la primera matriculación del vehículo, y no a partir del inicio del contrato de garantía), ni las averías derivadas de accidentes o cualesquiera influencias externas. A los efectos del presente contrato sólo se consideran AVERÍA/AS, las piezas que se describen a continuación y de manera literal. </li>
        </ul>
    </body>
    </html>
  `;
}

export function applyGuaranteeFilter(
  query: SelectQueryBuilder<GuaranteeEntity>,
  filterDto: Partial<GetGuaranteesFilterDto>,
  user: Partial<User>
): SelectQueryBuilder<GuaranteeEntity> {
  const { text, status } = filterDto;

  query
    .leftJoinAndSelect('guarantee.client', 'client')
    .leftJoinAndSelect('client.physicalInfo', 'physicalPerson')
    .leftJoinAndSelect('client.moralInfo', 'moralPerson')
    .leftJoinAndSelect('client.address', 'address')
    .leftJoinAndSelect('guarantee.paymentOrder', 'paymentOrder')
    .leftJoinAndSelect('guarantee.product', 'product')
    .leftJoinAndSelect('guarantee.vehicle', 'vehicle')
    .leftJoinAndSelect('guarantee.company', 'company')
    .leftJoinAndSelect('guarantee.user', 'user')
    .groupBy('guarantee.id')
    .addGroupBy('client.id')
    .addGroupBy('address.id')
    .addGroupBy('vehicle.id')
    .addGroupBy('physicalPerson.id')
    .addGroupBy('moralPerson.id')
    .addGroupBy('paymentOrder.id')
    .addGroupBy('product.id')
    .addGroupBy('company.id')
    .addGroupBy('user.id')
    .orderBy('guarantee.createdAt', sortDirection.descend);

  if (text) {
    if (text.length < 5) {
      query.andWhere(
        `guarantee.id = :number OR
         LOWER(vehicle.motorNumber) like :text OR
         LOWER(physicalPerson.name) like :text`,
        { text: `%${text.toLowerCase()}%`, number: text }
      );
    } else {
      query.andWhere(
        `LOWER(vehicle.vin) like :text OR
         LOWER(guarantee.invoiceNumber) like :text OR
         LOWER(physicalPerson.name) like :text OR
         LOWER(physicalPerson.lastName) like :text OR
         LOWER(physicalPerson.secondLastName) like :text OR
         LOWER(moralPerson.businessName) like :text OR
         LOWER(CONCAT(physicalPerson.name, ' ', physicalPerson.lastName, ' ', physicalPerson.secondLastName)) like :text`,
        { text: `%${text.toLowerCase()}%` }
      );
    }
  }

  if (status) {
    query.andWhere('(guarantee.status = :status)', { status });
  }

  filterCommonQuery('guarantee', query, filterDto, user);

  return query;
}
