// Fetch random meal
function fetchRandomMeal() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(response => response.json())
      .then(data => {
        const meal = data.meals[0];
        displayRandomMeal(meal);
      })
      .catch(error => console.error('Error fetching random meal:', error));
  }
  
  // Display random meal
  function displayRandomMeal(meal) {
    const randomMealContent = document.getElementById('random-meal-content');
    const mealImage = document.getElementById('random-meal-image');
    const mealName = document.getElementById('random-meal-name');
  
    mealImage.src = meal.strMealThumb; // Set the src attribute to the meal image URL
    mealImage.alt = meal.strMeal;
    mealName.textContent = meal.strMeal;
  
    // Add event listener to display ingredients when meal is clicked
    randomMealContent.addEventListener('click', () => displayIngredients(meal));
  }
  
  // Display ingredients of the meal in a modal
  function displayIngredients(meal) {
    const modalContent = `
      <div class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>${meal.strMeal}</h2>
          <h3>Ingredients:</h3>
          <ul>
            ${getIngredientsList(meal).join('')}
          </ul>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalContent);
  
    // Close modal when close button or outside modal is clicked
    const modal = document.querySelector('.modal');
    const closeButton = document.querySelector('.close');
    modal.addEventListener('click', (event) => {
      if (event.target === modal || event.target === closeButton) {
        modal.remove();
      }
    });
  }
  
  // Get ingredients list for a meal
  function getIngredientsList(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && measure) {
        ingredients.push(`<li>${ingredient} - ${measure}</li>`);
      }
    }
    return ingredients;
  }
  
  // Event listener for search form submission
  document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchInput = document.getElementById('search-input').value;
    if (searchInput.trim() !== '') {
      fetchMealsByCategory(searchInput);
    }
  });
  
  // Fetch meals by category
  function fetchMealsByCategory(category) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(response => response.json())
      .then(data => {
        const meals = data.meals;
        displaySearchedMeals(meals);
      })
      .catch(error => console.error(`Error fetching meals for category ${category}:`, error));
  }
  
  // Display searched meals
  function displaySearchedMeals(meals) {
    const searchedMealsContent = document.getElementById('searched-meals-content');
    searchedMealsContent.innerHTML = ''; // Clear previous content
  
    meals.forEach(meal => {
      const mealCard = document.createElement('div');
      mealCard.classList.add('meal-card');
      mealCard.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p>${meal.strMeal}</p>
      `;
      searchedMealsContent.appendChild(mealCard);
  
      // Add event listener to display ingredients when meal card is clicked
      mealCard.addEventListener('click', () => displayIngredients(meal));
    });
  
    // Show the searched meals section
    document.getElementById('searched-meals').style.display = 'block';
  }
  
  // Fetch random meal when the page loads
  document.addEventListener('DOMContentLoaded', fetchRandomMeal);
