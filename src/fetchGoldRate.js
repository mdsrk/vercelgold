import axios from 'axios';
import cheerio from 'cheerio';

// Function to fetch gold rate and update HTML
async function fetchGoldRate() {
  try {
    console.log("Starting the gold rate fetching process...");
    
    console.log("Fetching the gold rate page...");
    const response = await axios.get('https://www.malabargoldanddiamonds.com/goldprice');
    console.log("Page fetched successfully. Status code:", response.status);

    console.log("Parsing the HTML...");
    const $ = cheerio.load(response.data);
    console.log("HTML parsed successfully.");

    console.log("Selecting the #show-rate-block element...");
    const showRateBlock = $('#show-rate-block');
    console.log("Found #show-rate-block element:", showRateBlock.length > 0);

    if (showRateBlock.length) {
      console.log("Selecting the .price.22kt-price element...");
      const rateElement = showRateBlock.find('.price.22kt-price');
      console.log("Found .price.22kt-price element:", rateElement.length > 0);

      console.log("Selecting the .date.update-date element...");
      const dateElement = showRateBlock.find('.date.update-date');
      console.log("Found .date.update-date element:", dateElement.length > 0);

      console.log("Extracting the gold rate text...");
      const rate = rateElement.text().trim();
      console.log("Gold rate extracted:", rate);

      console.log("Extracting the update date text...");
      const date = dateElement.text().trim();
      console.log("Update date extracted:", date);

      if (rate && date) {
        console.log("Both gold rate and date were successfully extracted.");

        console.log("Creating new row for the HTML table...");
        const newRow = `<tr><td>${date}</td><td>${rate}</td></tr>`;
        console.log("New row created:", newRow);

        // Update the HTML table with the new row
        document.addEventListener('DOMContentLoaded', () => {
          const tbody = document.querySelector('#gold-rate-table tbody');
          tbody.insertAdjacentHTML('beforeend', newRow);
          console.log("New row added to the table.");
        });
      } else {
        throw new Error('Could not extract the gold rate or date from the page.');
      }
    } else {
      throw new Error('The #show-rate-block element was not found.');
    }
  } catch (error) {
    console.error("Error occurred while fetching the gold rate:", error.message);
  }
}

fetchGoldRate();
