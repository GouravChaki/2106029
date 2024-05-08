const axios = require("axios");
const { customSort } = require("./functions/functions");
const bearerToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE1MTUwNjUxLCJpYXQiOjE3MTUxNTAzNTEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjViM2E2MmQxLTI1YzItNDgyMy04MTQ4LWRjYmQ4MjQzYjYyMSIsInN1YiI6ImdvdXJhdmNoYWtpMTIzQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6IktJSVQsIEJodWJhbmVzd2FyIiwiY2xpZW50SUQiOiI1YjNhNjJkMS0yNWMyLTQ4MjMtODE0OC1kY2JkODI0M2I2MjEiLCJjbGllbnRTZWNyZXQiOiJ3aWlPWHZFUFNZVWJYQXNBIiwib3duZXJOYW1lIjoiR291cmF2IENoYWtpIiwib3duZXJFbWFpbCI6ImdvdXJhdmNoYWtpMTIzQGdtYWlsLmNvbSIsInJvbGxObyI6IjIxMDYwMjkifQ.c6ACvmYU5yZsSJQ26pD4LeVpnkJsSKwbG53Y1JZFFic";
var url = "";
module.exports = async (req, res) => {
  try {
    let { categoryname } = req.params;
    let { n, page = 1, sortBy, sortOrder } = req.query;
    let companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];

    if (!categoryname || !n || isNaN(parseInt(n)) || parseInt(n) <= 0) {
      return res
        .status(200)
        .send({ success: false, message: "REQUESTED PARAMETERS ARE INVALID" });
    }

    n = parseInt(n);
    page = parseInt(page);
    let startIndex = (page - 1) * n;
    let endIndex = page * n;

    const productsPromises = companies.map(async (company) => {
      url = `http://20.244.56.144/test/companies/${String(
        company
      )}/categories/${String(categoryname)}/products`;

      try {
        let response = await axios.get(url, {
          params: {
            top: endIndex,
            minPrice: 1,
            maxPrice: 10000,
          },
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        return response.data.map((product) => ({
          ...product,
          companyId: company,
        }));
      } catch (error) {
        console.log(error);
        console.error(
          `Error fetching products for company ${company}:`,
          error.message
        );
        return [];
      }
    });

    let productsByCompany = await Promise.all(productsPromises);

    let allProducts = productsByCompany.reduce(
      (acc, products) => acc.concat(products),
      []
    );

    if (sortBy && sortOrder) {
      allProducts = customSort(allProducts, sortBy, sortOrder);
    }
    let paginatedProducts = allProducts.slice(startIndex, endIndex);
    return res
      .status(200)
      .send({ success: true, message: "SUCCESS", result: paginatedProducts });
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      message: "ERROR ENDPOINT",
      data: error,
    });
  }
};
