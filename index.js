const searchForm = document.getElementById('search-form');
const resultsContainer = document.getElementById('results-container');
const errorMessage = document.getElementById('error-message');

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = event.target.name.value;
  const formattedName = name.replace(/ /g, "_");

  fetch(`https://botw-compendium.herokuapp.com/api/v2/entry/${formattedName}`)
    .then(response => response.json())
    .then(data => {
      // Process the API response data
      const product = data.data;

      // Update the UI with the product information
      resultsContainer.innerHTML = '';
      errorMessage.textContent = ''; // Clear any previous error messages

      // Create elements to display the product information
      const productName = document.createElement('h2');
      productName.textContent = product.name;

      const productImage = document.createElement('img');
      productImage.src = product.image;

      // Append the elements to the results container
      resultsContainer.appendChild(productName);
      resultsContainer.appendChild(productImage);
    })
    .catch(error => {
      console.error('Error:', error);
      resultsContainer.innerHTML = ''; // Clear any existing results
      errorMessage.textContent = 'Error occurred. Please try again later.'; // Display error message
    });
});




