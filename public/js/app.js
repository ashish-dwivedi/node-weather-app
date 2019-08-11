const form = document.querySelector('form');
const input = document.querySelector('#location');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    messageOne.textContent = 'Getting your weather...';
    messageTwo.textContent = '';
    const url = `http://localhost:3000/weather?address=${ input.value }`;
    fetch(url).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = '';
                messageTwo.textContent = data.forecast;;
            }
        })
    });

})