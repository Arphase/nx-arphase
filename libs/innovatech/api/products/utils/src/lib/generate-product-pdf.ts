import { getReadableStream, OUT_FILE, tobase64 } from '@innovatech/api/core/util';
import { Response } from 'express';
import fs from 'fs';
import puppeteer from 'puppeteer';
import { promisify } from 'util';

export async function generateProductPdf(content: string, headerLogo: string, response: Response): Promise<void> {
  const headerImg = await tobase64(`apps/innovatech/api/src/assets/img/logo.png`);
  const footerImg = await tobase64('apps/innovatech/api/src/assets/img/pdf-footer.jpg');

  await promisify(fs.writeFile)(OUT_FILE, content);
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(`file://${process.cwd()}/${OUT_FILE}`, { waitUntil: 'networkidle0' });

  await page.addStyleTag({
    content: `
        body { margin-top: 1cm; }
        @page:first { margin-top: 0; }
    `,
  });
  const buffer = await page.pdf({
    format: 'a4',
    margin: {
      left: '1in',
      top: '1in',
      right: '1in',
      bottom: '2in',
    },
    displayHeaderFooter: true,
    pageRanges: '1-',
    headerTemplate: `
    <style>
      .innovatech-logo {
        max-width: 15%;
        height: auto;
        margin: 0.3in 0 0 0.8in;
      }
      .shield {
        max-width: 10%;
        z-index: 2;
        height: auto;
        margin-top: 12px;
        margin-right: 12px;
        margin-left: auto;
      }
      #header { padding: 0 !important; }
    </style>
    <img class="innovatech-logo" src="data:image/png;base64,${headerImg}"/>
    <img class="shield" src="${headerLogo}"/>`,
    footerTemplate: `
    <style>
      .footer {
        width: 100%;
        height: 1in;
      }
      #footer { padding: 0 !important; }
    </style>
    <img class="footer" src="data:image/jpg;base64,${footerImg}"/>
    `,
  });
  promisify(fs.unlink)(OUT_FILE);
  await browser.close();
  const stream = getReadableStream(buffer);
  stream.pipe(response);
}
