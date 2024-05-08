const axios = require("axios");
var url = "";
const bearerToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE1MTUyMzAyLCJpYXQiOjE3MTUxNTIwMDIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjViM2E2MmQxLTI1YzItNDgyMy04MTQ4LWRjYmQ4MjQzYjYyMSIsInN1YiI6ImdvdXJhdmNoYWtpMTIzQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6IktJSVQsIEJodWJhbmVzd2FyIiwiY2xpZW50SUQiOiI1YjNhNjJkMS0yNWMyLTQ4MjMtODE0OC1kY2JkODI0M2I2MjEiLCJjbGllbnRTZWNyZXQiOiJ3aWlPWHZFUFNZVWJYQXNBIiwib3duZXJOYW1lIjoiR291cmF2IENoYWtpIiwib3duZXJFbWFpbCI6ImdvdXJhdmNoYWtpMTIzQGdtYWlsLmNvbSIsInJvbGxObyI6IjIxMDYwMjkifQ.X62tToQS7IRBJMj4FaZl7pvLU9_nEdVEO0sGpmHNHtk"
module.exports = async (req, res) => {
  try {
    const { categoryname, productid } = req.params;

    const [companyId, price, rating, discount] = productid.split(/[^\w]+/);

    // Forming the URL for API call
    const url = `http://20.244.56.144/test/companies/${String(companyId)}/categories/${String(categoryname)}/products`;

    const response = await axios.get(url, {
      params: {
        top: 100,
        minPrice: 1,
        maxPrice: 1000000000000000
      },
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    
    const filteredResults = response.data.filter(product => (
        product.price === price &&
        product.rating === rating &&
        product.discount === discount
      ));
  
      console.log(filteredResults)

    return res
      .status(200)
      .send({ success: true, message: "SUCCESS", result: filteredResults });
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      message: "ERROR IN ENDPOINT",
      data: error,
    });
  }
};
