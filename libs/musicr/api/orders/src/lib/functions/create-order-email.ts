import { Order } from '@musicr/domain';

export function createOrderEmail(order: Order): string {
  const { id } = order;
  return `
  <link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
  crossorigin="anonymous"
/>

<div class="row">
  <div class="col">
  Se ha generado una nueva orden con folio ${id}, consultar más detalles en la aplicación de administrador.
  </div>
</div>
`;
}
