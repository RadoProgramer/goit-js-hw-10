import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_HdoCjTnFdLHiC3kvnww3rwGzRt9wyyf4AAamqdllHtH8LE8QUY1z4NNsB5Y50Zde";

export async function fetchBreeds() {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch cat breeds");
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.data[0]; // Assuming the first cat returned is what we want
  } catch (error) {
    throw new Error("Failed to fetch cat information");
  }
}