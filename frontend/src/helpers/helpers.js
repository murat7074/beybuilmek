export const getPriceQueryParams = (searchParams, key, value) => {
  const hasValueInParam = searchParams.has(key);

  if (value && hasValueInParam) {
    searchParams.set(key, value);
  } else if (value) {
    searchParams.append(key, value);
  } else if (hasValueInParam) {
    searchParams.delete(key);
  }

  return searchParams;
};

export const calculateOrderCost = (cartItems) => {
  const itemsPrice = cartItems?.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );

  const shippingPrice = itemsPrice >= 200 ? 0 : 25;
  // const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  // const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);
  const totalPrice = (itemsPrice + shippingPrice).toFixed(2);

  return {
    itemsPrice: Number(itemsPrice).toFixed(2),
    shippingPrice,
    // taxPrice,
    totalPrice,
  };
};



export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100)
}

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type])
  if (type === 'colors') {
    unique = unique.flat()
  }

  return ['all', ...new Set(unique)]
}
