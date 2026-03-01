import { NextResponse } from 'next/server';
import puppeteer, { type Browser } from 'puppeteer';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  let browser: Browser | undefined;
  try {
    // Read the HTML file
    const htmlPath = join(process.cwd(), 'public', 'cv.html');
    const htmlContent = await readFile(htmlPath, 'utf-8');

    // Launch Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    
    // Set the HTML content
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm',
      },
    });

    // Return PDF response
    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Deign-Lazaro-CV.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error('Error closing browser after PDF generation:', closeError);
      }
    }
  }
}
