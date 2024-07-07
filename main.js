/*
First Web Scrapper Project
date: 07/07/2024

This was a simple script that I wrote to get the first image from google search results.
It uses puppeteer to open a browser and navigate to google image search results page.
It then extracts the first image with height greater than 100px and logs the image url.
Get the image greater than 100px since there are other imgaes such as icons, logos etc which are less than 100px.
*/


const puppeteer = require('puppeteer');
let searchValue = 'landscape';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = `https://www.google.com/search?tbm=isch&q=${searchValue}`;

  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.waitForSelector('img');

  const firstImageSource = await page.evaluate(() => {
    const images = document.querySelectorAll("img");  
    const firstImageWithHeightGreaterThan100 = Array.from(images).find(img => img.height > 100);
    return firstImageWithHeightGreaterThan100 ? firstImageWithHeightGreaterThan100.src : null;
  });

  await browser.close();

 
  //use "node main.js > output.txt" to save the output to a file (for easier viewing)
  //in the output.txt file, you will see the first image of "landscape" search results as of date
  console.log(firstImageSource);
})();
