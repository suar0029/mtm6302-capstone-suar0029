const form = document.querySelector('form');
const imageContainer = document.createElement('div');
const content = document.querySelector('#content');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const dateInput = document.querySelector('#date-input').value;
  const url = `https://api.nasa.gov/planetary/apod?date=${dateInput}&api_key=CsFFgeybCVlALbzrIyeSUjh5KfIpvF7zXrAxsMij`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const image = document.createElement('img');
      image.src = data.url;
      imageContainer.appendChild(image);
      content.appendChild(imageContainer);
    })
    .catch(error => console.log(error));
});
