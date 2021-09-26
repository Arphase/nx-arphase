import { Reservation } from '@valmira/domain';

export function getReservationConfirmEmail(reservation: Reservation, reservationUrl: string): string {
  return `
  <link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
  crossorigin="anonymous"
/>

<div class="row">
  <div class="col">
    <img src="cid:logo" />
  </div>
</div>

<div class="row">
  <div class="col">
    <h1>Tu reservación con folio ${reservation.id} está confirmada</h1>
  </div>
</div>

<div class="row">
  <div class="col">
    <img src="cid:place" />
  </div>
</div>

<div class="row">
  <div class="col">
    Para consultar los detalles de tu reservación haz click en el siguiente
    <a href="${reservationUrl}">link</a>
  </div>
</div>
  `;
}
