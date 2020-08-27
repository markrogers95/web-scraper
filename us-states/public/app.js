const statesElement = document.querySelector('#states');
const infoElement = document.querySelector('#info');

function setStates(states){
    states.forEach((state) => {
        
        const optionElement = document.createElement('option');
        
        optionElement.setAttribute('value', state.name);
        optionElement.textContent = state.name;
        statesElement.append(optionElement);

        optionElement.addEventListener('click', () => {

            infoElement.textContent = state;
        });
    });
}

async function getUSStates() {

    const response = await fetch('api/states');
    const states = await response.json();

    setStates(states);
};

getUSStates();