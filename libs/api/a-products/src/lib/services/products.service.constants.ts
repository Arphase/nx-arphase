import { IMAGE_ASSETS_PATH, transformFolio } from '@ivt/a-state';


export function getProductPdfTemplate(template: string): string {
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
            .center {
              text-align: center;
            }
            .title {
              font-size: 14px;
            }
            .logo {
              max-width: 50%;
              height: auto;
              display: block;
              margin-left: auto;
              margin-right: auto;
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
    <div><img class="logo" src="${IMAGE_ASSETS_PATH}logo.png"></div>
        ${template}
    </body>
    </html>
  `;
}
