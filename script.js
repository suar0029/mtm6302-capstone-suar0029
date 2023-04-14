

const form = document.querySelector('form');
const content = document.querySelector('#content');
const favoriteBtn = document.querySelector('#favorite-btn');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const dateInput = document.querySelector('#date-input').value;
  const url = `https://api.nasa.gov/planetary/apod?date=${dateInput}&api_key=CsFFgeybCVlALbzrIyeSUjh5KfIpvF7zXrAxsMij`;

  // Remove the previous image container
  const imageContainer = document.querySelector('#image-container');
  if (imageContainer) {
    content.removeChild(imageContainer);
  }

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Create a new image element and set its source to the API URL
      const image = document.createElement('img');
      image.src = data.url;

      // Create a new image container, append the image to it, and append the container to the content element
      const newImageContainer = document.createElement('div');
      newImageContainer.setAttribute('id', 'image-container');
      newImageContainer.appendChild(image);
      content.appendChild(newImageContainer);

      // Save the image URL to local storage when the favorite button is clicked
      favoriteBtn.addEventListener('click', () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (!favorites.includes(data.url)) {
          favorites.push(data.url);
          localStorage.setItem('favorites', JSON.stringify(favorites));
          alert('Image added to favorites!');
        } else {
          alert('This image is already in favorites!');
        }
      });
    })
    .catch(error => console.log(error));
});

// Display the saved images on the webpage
function displayFavorites() {
  const favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];
  const favoritesListElement = document.querySelector('#favorites-list');
  favoritesListElement.innerHTML = '';
  favoritesList.forEach((url) => {
    const image = document.createElement('img');
    image.src = url;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      const index = favoritesList.indexOf(url);
      if (index > -1) {
        favoritesList.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favoritesList));
        displayFavorites();
      }
    });
    const listItem = document.createElement('li');
    listItem.appendChild(image);
    listItem.appendChild(removeBtn);
    favoritesListElement.appendChild(listItem);
  });
}

displayFavorites();






// // Retrieve the favorites list from local storage
// const favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];

// // Display the saved images on the webpage
// const favoritesListElement = document.querySelector('#favorites-list');
// favoritesListElement.innerHTML = '';
// favoritesList.forEach((url) => {
//   const image = document.createElement('img');
//   image.src = url;
//   const listItem = document.createElement('li');
//   listItem.appendChild(image);
//   favoritesListElement.appendChild(listItem);
// });
// }


