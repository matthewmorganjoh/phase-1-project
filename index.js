const searchForm = document.getElementById('search-form');
const resultsContainer = document.getElementById('results-container');

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = event.target.name.value;
  const formattedName = name.replace(/ /g, "_"); // Replace spaces with underscores

  fetch(`https://botw-compendium.herokuapp.com/api/v2/entry/${formattedName}`)
    .then(response => response.json())
    .then(data => {
      const product = data.data;

      resultsContainer.innerHTML = '';

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
    });
});




