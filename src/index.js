import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

document.addEventListener("DOMContentLoaded", () => {
  const breedSelect = document.querySelector(".breed-select");
  const loader = document.querySelector(".loader");
  const error = document.querySelector(".error");
  const catInfo = document.querySelector(".cat-info");

  // Function to toggle loader
  function toggleLoader(show) {
    if (show) {
      loader.style.display = "block";
    } else {
      loader.style.display = "none";
    }
  }

  // Function to toggle error message
  function toggleError(message) {
    if (message) {
      error.textContent = message;
      error.style.display = "block";
    } else {
      error.style.display = "none";
    }
  }

  // Function to display cat information
  function displayCatInformation(cat) {
    catInfo.innerHTML = `
      <img src="${cat.url}" alt="Cat">
      <p><strong>Breed:</strong> ${cat.breeds[0].name}</p>
      <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
      <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
    `;
    catInfo.style.display = "block";
  }

  // Load breeds on page load
  (async () => {
    try {
      toggleLoader(true);
      const breeds = await fetchBreeds();
      breeds.forEach(breed => {
        breedSelect.innerHTML += `<option value="${breed.id}">${breed.name}</option>`;
      });
    } catch (error) {
      toggleError("Failed to load cat breeds. Please try again later.");
    } finally {
      toggleLoader(false);
    }
  })();

  // Event listener for breed select change
  breedSelect.addEventListener("change", async () => {
    const selectedBreedId = breedSelect.value;
    try {
      toggleLoader(true);
      toggleError();
      const cat = await fetchCatByBreed(selectedBreedId);
      displayCatInformation(cat);
    } catch (error) {
      toggleError("Failed to load cat information. Please try again later.");
    } finally {
      toggleLoader(false);
    }
  });
});