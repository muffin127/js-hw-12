import axios from 'axios';

export async function getImagesByQuery(query) {
  const response = await axios.get(
    `https://pixabay.com/api/?key=56333257-5e55ad218ba23a27bfc212fa1&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
  );

  return response.data;
}
