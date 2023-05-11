const searchForm = document.getElementById('search-form');
const resultsContainer = document.getElementById('results-container');
const errorMessage = document.getElementById('error-message');
const loadingState = document.getElementById('loading-state');

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = event.target.name.value;
  const formattedName = name.replace(/ /g, "_");

  loadingState.style.display = 'block';
  resultsContainer.innerHTML = '';
  errorMessage.textContent = '';

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

      loadingState.style.display = 'none'; //hide the loading state

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

      loadingState.style.display = 'none';
    });
});


