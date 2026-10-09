const LABELS = {
  electronics: "Electronice",
  jewelery: "Bijuterii",
  "men's clothing": "Haine bărbați",
  "women's clothing": "Haine femei",
};

export const categoryLabel = (category) => LABELS[category] || category;