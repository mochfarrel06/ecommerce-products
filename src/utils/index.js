export const navLinks = [
  {
    id: 1,
    path: "/",
    text: "Home",
  },
  {
    id: 2,
    path: "/products",
    text: "Products",
  },
  {
    id: 3,
    path: "/tables",
    text: "Tables",
  },
];

// Fungsi untuk melakukan pencarian berdasarkan keyword pada nama produk
export const searchProducts = (products, keyword) => {
  const lowercaseKeyword = keyword.toLowerCase().trim();

  if (!lowercaseKeyword) {
    // Jika keyword kosong, kembalikan seluruh produk
    return products;
  }

  // Lakukan pencarian berdasarkan nama produk
  return products.filter((product) =>
    product.name.toLowerCase().includes(lowercaseKeyword)
  );
};

// Untuk memberikan landing page
