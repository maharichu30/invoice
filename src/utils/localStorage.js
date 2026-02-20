export const getClients = () => {
  const data = localStorage.getItem("clients");
  return data ? JSON.parse(data) : [];
};

export const saveClients = (clients) => {
  localStorage.setItem("clients", JSON.stringify(clients));
};

// INVOICES

export const getInvoices = () => {
  const data = localStorage.getItem("invoices");
  return data ? JSON.parse(data) : [];
};

export const saveInvoices = (invoices) => {
  localStorage.setItem("invoices", JSON.stringify(invoices));
};


// PRODUCT STOCK

export const getProductStock = () => {
  const data = localStorage.getItem("productStock");
  return data ? JSON.parse(data) : [];
};

export const saveProductStock = (products) => {
  localStorage.setItem("productStock", JSON.stringify(products));
};