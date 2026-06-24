import axios from 'axios';

export async function getImagesByQuery(query, page = 1) {
  const response = await axios.get(`https://pixabay.com/api/`, {
    params: {
      key: '56333257-5e55ad218ba23a27bfc212fa1',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 15,
    },
  });

  return response.data;
}
