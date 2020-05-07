console.log('Client side Javascript is loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''


    fetch('http/weather?address=' + location).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                messageTwo.textContent = data.error
                messageOne.textContent = ''
                console.log(data.error);
            } else {
                messageOne.textContent = data.forecast
                messageTwo.textContent = ''
                console.log(data.forecast);
            }
        })
    })
})
