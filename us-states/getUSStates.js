const axios = require('axios');
const cheerio = require('cheerio');

const page_url  = 'https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States'

async function getStates() {
    
    const { data } = await axios.get(page_url);
    const $ = cheerio.load(data);

    const table = $('caption:contains("States of the United States")').parent();
    
    const states = [];
    table.find('tbody tr').slice(2).each((i, element) => {
        $row = $(element);
        const state = {};
        state.name = $($row.find('th a')[0]).text().trim();

        const labels = [
            'code', 
            'capital',
            'largest',
            'ratification', 
            'population', 
            'area_miles', 
            'area_km', 
            'area_tot_miles',
            'area_tot_km',
            'land_area_mile',
            'land_area_km',
            'water_area_miles',
            'water_area_km',
            'number_representatives']
        
        let offset = 0;

        $row.find('td').each((i, element) => {
            
            const $col = $(element);
            let val = $col.text().trim();
            let numVal = Number(val.replace(/,/g, ''));
            if (!isNaN(numVal)){
                val = numVal;
            }

            if (i === 1 && $col.attr('colspan') == 2){
                const label = labels[i];
                state[label] = val;
                offset = 1;
            }
            const label = labels[i + offset];
            state[label] = val;
            

        });
       
        states.push(state);
    });

    return states;
};

module.exports = getStates;