function customSort(products, sortBy, sortOrder) {
  return products.reduce((sorted, product) => {
    let index = 0;
    while (index < sorted.length) {
      if (
        (sortOrder === "asc" && product[sortBy] < sorted[index][sortBy]) ||
        (sortOrder === "desc" && product[sortBy] > sorted[index][sortBy])
      ) {
        break;
      }
      index++;
    }
    return [...sorted.slice(0, index), product, ...sorted.slice(index)];
  }, []);
}

module.exports = { customSort };
