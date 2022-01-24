const fetchItem = async (productId) => {
  const productUrl = `https://api.mercadolibre.com/items/${productId}`;

  try {
    const response = await fetch(productUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
