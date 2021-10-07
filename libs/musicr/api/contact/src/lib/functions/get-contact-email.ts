import { ContactCompanyDto } from '../dto/contact-company-dto';

export function getContactEmail(contactCompanyDto: ContactCompanyDto): string {
  const { name, email, phone, message } = contactCompanyDto;
  return `
  <link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
  crossorigin="anonymous"
/>

<div class="row">
  <div class="col">
   Una persona con los siguientes datos está solicitando informes!
  </div>
</div>

<div class="row">
  <div class="col">
   <span>Nombre: <strong>${name}</strong></span>
  </div>
</div>

<div class="row">
  <div class="col">
   <span>Correo: <strong>${email}</strong></span>
  </div>
</div>

<div class="row">
  <div class="col">
   <span>Teléfono: <strong>${phone}</strong></span>
  </div>
</div>

<div class="row">
  <div class="col">
   <span>Mensaje: <strong>${message}</strong></span>
  </div>
</div>
`;
}
