const searchForm = document.getElementById('search-form');
const resultsContainer = document.getElementById('results-container');
const errorMessage = document.getElementById('error-message');

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = event.target.name.value;
  const formattedName = name.replace(/ /g, "_");

  fetch(`https://botw-compendium.herokuapp.com/api/v2/entry/${formattedName}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error occurred.');
      }
      return response.json();
    })
    .then(data => {
      if (data.error) {
        throw new Error(data.error);
      }
      const product = data.data;

      resultsContainer.innerHTML = '';
      errorMessage.textContent = '';

      const productName = document.createElement('h2');
      productName.textContent = product.name;

      const productImage = document.createElement('img');
      productImage.src = product.image;


      const productDescription = document.createElement('h3');
      productDescription.textContent = product.description;

      resultsContainer.appendChild(productName);
      resultsContainer.appendChild(productImage);
      resultsContainer.appendChild(productDescription);
    })
    .catch(error => {
      console.error('Error:', error);
      resultsContainer.innerHTML = '';
      errorMessage.textContent = error.message;
    });
});
