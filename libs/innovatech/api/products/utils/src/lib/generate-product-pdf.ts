import { getReadableStream, OUT_FILE, toBase64 } from '@arphase/api/core';
import { InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { unlink, writeFile } from 'fs';
import puppeteer from 'puppeteer';
import { promisify } from 'util';

export async function generateProductPdf(content: string, headerLogo: string, response: Response): Promise<void> {
  const headerImg = await toBase64(`apps/innovatech/api/src/assets/img/logo.png`);
  const footerImg = await toBase64('apps/innovatech/api/src/assets/img/pdf-footer.jpg');
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: [
      '--unlimited-storage',
      '--full-memory-crash-report',
      '--disable-gpu',
      '--ignore-certificate-errors',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
  });
  try {
    await promisify(writeFile)(`${process.cwd()}/${OUT_FILE}`, content);

    const page = await browser.newPage();
    await page.goto(`file://${process.cwd()}/${OUT_FILE}`, { waitUntil: 'networkidle0' });

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
    await promisify(unlink)(OUT_FILE);
    const stream = getReadableStream(buffer);
    stream.pipe(response);
  } catch (e) {
    throw new InternalServerErrorException();
  } finally {
    await browser.close();
  }
}
