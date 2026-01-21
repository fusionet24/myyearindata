#!/usr/bin/env node

/**
 * Carousel to PDF Generator
 *
 * Takes a carousel HTML file, screenshots each slide at high resolution,
 * and combines them into a PDF.
 *
 * Usage:
 *   node scripts/carousel-to-pdf.js posts/my-post/carousel.html
 *   node scripts/carousel-to-pdf.js posts/my-post/carousel.html --output my-carousel.pdf
 *   node scripts/carousel-to-pdf.js posts/my-post/carousel.html --scale 2
 *
 * Options:
 *   --output, -o    Output PDF filename (default: carousel.pdf in same folder)
 *   --scale, -s     Device scale factor for higher resolution (default: 2)
 *   --keep-images   Keep individual PNG screenshots after PDF creation
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function main() {
    const args = process.argv.slice(2);

    if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
        console.log(`
Carousel to PDF Generator

Usage:
  node scripts/carousel-to-pdf.js <carousel.html> [options]

Options:
  --output, -o <file>   Output PDF filename (default: carousel.pdf in same folder)
  --scale, -s <number>  Device scale factor for higher resolution (default: 2)
  --keep-images         Keep individual PNG screenshots after PDF creation
  --help, -h            Show this help message

Examples:
  node scripts/carousel-to-pdf.js posts/my-post/carousel.html
  node scripts/carousel-to-pdf.js posts/my-post/carousel.html -o my-slides.pdf
  node scripts/carousel-to-pdf.js posts/my-post/carousel.html --scale 3 --keep-images
        `);
        process.exit(0);
    }

    // Parse arguments
    const htmlPath = args[0];
    let outputPath = null;
    let scale = 2;
    let keepImages = false;

    for (let i = 1; i < args.length; i++) {
        if ((args[i] === '--output' || args[i] === '-o') && args[i + 1]) {
            outputPath = args[++i];
        } else if ((args[i] === '--scale' || args[i] === '-s') && args[i + 1]) {
            scale = parseFloat(args[++i]);
        } else if (args[i] === '--keep-images') {
            keepImages = true;
        }
    }

    // Resolve paths
    const absoluteHtmlPath = path.resolve(htmlPath);
    const htmlDir = path.dirname(absoluteHtmlPath);

    if (!outputPath) {
        outputPath = path.join(htmlDir, 'carousel.pdf');
    } else if (!path.isAbsolute(outputPath)) {
        outputPath = path.resolve(outputPath);
    }

    if (!fs.existsSync(absoluteHtmlPath)) {
        console.error(`Error: File not found: ${absoluteHtmlPath}`);
        process.exit(1);
    }

    console.log(`\nCarousel to PDF Generator`);
    console.log(`========================`);
    console.log(`Input:  ${absoluteHtmlPath}`);
    console.log(`Output: ${outputPath}`);
    console.log(`Scale:  ${scale}x`);
    console.log('');

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--single-process'
        ]
    });

    try {
        const page = await browser.newPage();

        // Set viewport to slide dimensions with scale factor
        const slideWidth = 1080;
        const slideHeight = 1350;

        await page.setViewport({
            width: slideWidth,
            height: slideHeight,
            deviceScaleFactor: scale
        });

        // Load the HTML file
        await page.goto(`file://${absoluteHtmlPath}`, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        // Wait for fonts to load
        await page.evaluateHandle('document.fonts.ready');

        // Find all slides
        const slides = await page.$$('.slide');
        const slideCount = slides.length;

        if (slideCount === 0) {
            console.error('Error: No slides found (elements with class "slide")');
            process.exit(1);
        }

        console.log(`Found ${slideCount} slides`);

        // Screenshot each slide
        const imagePaths = [];

        for (let i = 0; i < slideCount; i++) {
            const slideNum = i + 1;
            const imagePath = path.join(htmlDir, `slide-${String(slideNum).padStart(2, '0')}.png`);

            console.log(`Capturing slide ${slideNum}/${slideCount}...`);

            // Get the slide element
            const slide = slides[i];

            // Screenshot just this slide
            await slide.screenshot({
                path: imagePath,
                type: 'png'
            });

            imagePaths.push(imagePath);
        }

        console.log(`\nCreating PDF...`);

        // Create PDF from images
        const pdfDoc = await PDFDocument.create();

        for (const imagePath of imagePaths) {
            const imageBytes = fs.readFileSync(imagePath);
            const image = await pdfDoc.embedPng(imageBytes);

            // Use actual image dimensions for PDF page (at 72 DPI)
            // The images are scaled up, so we scale down for PDF
            const pageWidth = slideWidth;
            const pageHeight = slideHeight;

            const page = pdfDoc.addPage([pageWidth, pageHeight]);
            page.drawImage(image, {
                x: 0,
                y: 0,
                width: pageWidth,
                height: pageHeight
            });
        }

        const pdfBytes = await pdfDoc.save();
        fs.writeFileSync(outputPath, pdfBytes);

        console.log(`PDF created: ${outputPath}`);

        // Clean up images unless --keep-images is set
        if (!keepImages) {
            console.log(`Cleaning up temporary images...`);
            for (const imagePath of imagePaths) {
                fs.unlinkSync(imagePath);
            }
        } else {
            console.log(`\nScreenshots saved:`);
            imagePaths.forEach(p => console.log(`  ${p}`));
        }

        console.log(`\nDone!`);

    } finally {
        await browser.close();
    }
}

main().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});
