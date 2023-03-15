// fetch meals
const fetchMeals = (search) => {
  showLoading(true);
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
};

// display meals
const displayMeals = (meals) => {
  //   console.log(meals);
  const mealsContainer = document.getElementById("meals-container");
  mealsContainer.innerHTML = "";
  for (const meal of meals) {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");
    mealDiv.setAttribute("data-bs-toggle", "modal");
    mealDiv.setAttribute("data-bs-target", "#detailsModal");
    mealDiv.setAttribute("type", "button");

    mealDiv.innerHTML = `
    <div class="card bg-primary-subtle border-0 shadow-lg rounded-4 h-100" onclick="fetchMealsDetails(${meal.idMeal})">
        <div>
            <img src="${meal.strMealThumb}" alt="" class="w-100 object-fit-cover rounded-4" />
        </div>
        <div>
            <h4 class="fw-semibold text-center mt-2 text-dark">${meal.strMeal}</h4>
        </div>
    </div>
  `;
    mealsContainer.appendChild(mealDiv);
    showLoading(false);
  }
};

// search click handler
const searchHandler = () => {
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value;

  fetchMeals(searchText);
};

// fetch meal details
const fetchMealsDetails = (mealId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetails(data.meals[0]));
};

// Display meal deails on modal
const displayMealDetails = (meal) => {
  //   console.log(meal);
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = ``;

  const detailsDiv = document.createElement("div");
  detailsDiv.classList.add("modal-content");
  detailsDiv.classList.add("bg-dark");

  detailsDiv.innerHTML = `
  <div class="modal-header">
      <h1 class="modal-title fs-5" id="detailsModalLabel">${meal.strMeal}</h1>
      <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <!-- img and ingrediants -->
      <div class="row g-3">
        <div class="col-4 d-flex align-items-center">
          <img class="w-100" src="${meal.strMealThumb}" alt="" />
        </div>
        <div class="col-8">
          <h4>Ingredents:</h4>
          <div class="row row-cols-2 row-cols-md-3">
            <!-- ingredent 1 -->
            <div class="col">
              <img src="https://www.themealdb.com/images/ingredients/${meal?.strIngredient1}-Small.png" alt="" width="100px" height="100px" />
              <p>${meal.strMeasure1} ${meal?.strIngredient1}</p>
            </div>
            <!-- ingredent 2 -->
            <div class="col">
              <img src="https://www.themealdb.com/images/ingredients/${meal?.strIngredient2}-Small.png" alt="" width="100px" height="100px" />
              <p>${meal.strMeasure2} ${meal?.strIngredient2}</p>
            </div>
            <!-- ingredent 3 -->
            <div class="col">
              <img src="https://www.themealdb.com/images/ingredients/${meal?.strIngredient3}-Small.png" alt="" width="100px" height="100px" />
              <p>${meal.strMeasure3} ${meal?.strIngredient3}</p>
            </div>
            <!-- ingredent 4 -->
            <div class="col">
              <img src="https://www.themealdb.com/images/ingredients/${meal?.strIngredient4}-Small.png" alt="" width="100px" height="100px" />
              <p>${meal.strMeasure4}  ${meal?.strIngredient4}</p>
            </div>
            <!-- ingredent 5 -->
            <div class="col">
              <img src="https://www.themealdb.com/images/ingredients/${meal?.strIngredient5}-Small.png" alt="" width="100px" height="100px" />
              <p>${meal.strMeasure5} ${meal?.strIngredient5}</p>
            </div>
            <!-- ingredent 6 -->
            <div class="col">
              <img src="https://www.themealdb.com/images/ingredients/${meal?.strIngredient6}-Small.png" alt="" width="100px" height="100px" />
              <p>${meal.strMeasure6} ${meal?.strIngredient6}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Instructions -->
      <div class="mt-4">
        <h5 class="text-center">Instructions:</h5>
        <p> ${meal.strInstructions} </p>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
  `;

  detailsContainer.appendChild(detailsDiv);
};

// loading
const showLoading = (isShow) => {
  const loading = document.getElementById("loading");
  if (isShow) {
    loading.classList.remove("d-none");
  } else {
    loading.classList.add("d-none");
  }
};
// default load all meals
fetchMeals("");
