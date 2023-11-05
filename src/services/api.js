export async function fetchImage(searchQuery, page) {
  const response = await fetch(
    `https://pixabay.com/api/?key=30859701-04efb23d375a384661f66a904&q=${searchQuery}&image_type=photo&page=${page}&per_page=12`
  );
  const images = await response.json();
  if (!images.hits.length) {
    throw new Error('No images');
  }
  return [images.hits, images.totalHits];
}
