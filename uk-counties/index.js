const axios = require('axios');
const cheerio = require('cheerio');

const page_url  = 'https://en.wikipedia.org/wiki/List_of_counties_of_the_United_Kingdom'

async function getCounties() {
    
    const { data } = await axios.get(page_url);
    const $ = cheerio.load(data);

    const table = $('tr:contains("Avon")').first().parent().parent();
    
    const counties = [];
    table.find('tbody tr').slice(2).each((i, element) => {
        $row = $(element);
        const county = {};
        county.name = $($row.find('tr a')[0]).text().trim();
        counties.push(county);
    })

    console.log(counties);

};

getCounties();