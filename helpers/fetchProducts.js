const fetchProducts = async (searchedProduct) => {
  const myUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${searchedProduct}`;

  try {
    const response = await fetch(myUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
