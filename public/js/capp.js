console.log('Client side JavaScript!')



const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener(('submit'), (e) =>{

    e.preventDefault()
    const location = searchElement.value
    fetch('http://localhost:3000/weather?address=' + location).then((response) =>{

response.json().then((data)=>{
    if(data.error){
        messageOne.textContent = data.error
        messageTwo.textContent = ''
        console.log(data.error)
    } else{
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
        console.log(data.location)
        console.log(data.forecast)
    }
})
})
    console.log('Testing!')
})