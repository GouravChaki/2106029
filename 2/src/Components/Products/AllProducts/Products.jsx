import { Button, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
export default function Products() {
  const [products, setProducts] = useState([
    {
      productName: "Phone 12",
      price: 2703,
      rating: 5,
      discount: 86,
      availability: "yes",
      id: "2a6901e8-3adb-4f7f-ae70-eb48aea740fc",
    },
    {
      productName: "Phone 11",
      price: 1901,
      rating: 4.68,
      discount: 33,
      availability: "out-of-stock",
      id: "c09d93d6-b2f4-4177-b6da-ebea09b8889f",
    },
    {
      productName: "Phone 4",
      price: 9743,
      rating: 4.56,
      discount: 85,
      availability: "yes",
      id: "62736985-086e-439b-8c34-75a5d47336c2",
    },
    {
      productName: "Phone 3",
      price: 5400,
      rating: 4.52,
      discount: 21,
      availability: "out-of-stock",
      id: "c24a9adb-a837-4025-9fb3-4be897b2a508",
    },
    {
      productName: "Phone 10",
      price: 685,
      rating: 4.06,
      discount: 24,
      availability: "yes",
      id: "02aa0536-8bbe-4a64-9866-8e9d1ce68576",
    },
    {
      productName: "Phone 12",
      price: 8984,
      rating: 3.65,
      discount: 46,
      availability: "out-of-stock",
      id: "ae3bbea9-fb24-4d6f-bfaa-09e2636106be",
    },
    {
      productName: "Phone 10",
      price: 8814,
      rating: 3.12,
      discount: 88,
      availability: "out-of-stock",
      id: "785d7a26-967b-448b-b42c-36f4e0c17334",
    },
    {
      productName: "Phone 6",
      price: 7036,
      rating: 2.78,
      discount: 30,
      availability: "yes",
      id: "1944cd55-c423-4486-bd32-4a116bd4b296",
    },
    {
      productName: "Phone 1",
      price: 9303,
      rating: 2.75,
      discount: 77,
      availability: "yes",
      id: "ef0fc306-e08d-4cce-8e3e-640a7397d0df",
    },
    {
      productName: "Phone 5",
      price: 8728,
      rating: 2.45,
      discount: 62,
      availability: "out-of-stock",
      id: "9b1564f2-ae0a-41fb-8c9a-7922547596e9",
    },
  ]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
//here based on the filter, the parameter will be selected (phone here by default)
    axios.get('http://localhost:5000/categories/Phone/products?n=10&page=1&sortBy=rating&sortOrder=asc')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.productName.toLowerCase()
    );
    setFilteredProducts(filtered);
  }, [products]);

  // Paginate products
  const lastIndex = page * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentProducts = filteredProducts.slice(firstIndex, lastIndex);

  const handleChangePage = (direction) => {
    if (direction === 'prev' && page > 1) {
      setPage(page - 1);
    } else if (direction === 'next' && lastIndex < filteredProducts.length) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>All the Products</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Availability</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProducts.map(product => (
              <TableRow key={product.id}>
                <TableCell>{product.productName}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell>{product.discount}%</TableCell>
                <TableCell>{product.availability}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: '10px' }}>
        <Button variant="contained" onClick={() => handleChangePage('prev')}>Prev</Button>
        <Typography variant="body1" style={{ margin: '0 10px', display: 'inline-block' }}>{page}</Typography>
        <Button variant="contained" onClick={() => handleChangePage('next')}>Next</Button>
      </div>
    </div>
  );
}
