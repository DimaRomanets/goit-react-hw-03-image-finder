export async function fetchImage(searchQuery, page) {
  const response = await fetch(
    `https://pixabay.com/api/?key=39500887-ed861f87514cb23ba337b4b50&q=${searchQuery}&image_type=photo&page=${page}&per_page=12`
  );
  const images = await response.json();
  if (!images.hits.length) {
    throw new Error('No images');
  }
  return [images.hits, images.totalHits];
}
