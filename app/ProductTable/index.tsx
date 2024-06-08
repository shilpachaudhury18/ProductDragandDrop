"use client";

import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import axios, { AxiosResponse } from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Image from "next/image";
import styles from "./Product.module.css";

// Define the type for your product data
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// Function to fetch product data from the endpoint
const fetchProductData = async (): Promise<Product[]> => {
  try {
    const response: AxiosResponse<Product[]> = await axios.get(
      "https://fakestoreapi.com/products"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return [];
  }
};

const ProductTable: React.FC = () => {
  // State variables
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [focusedCell, setFocusedCell] = useState<{ row: number; col: number }>(
    { row: -1, col: -1 } // Initial invalid value
  );

  // Refs
  const tableRef = useRef<HTMLTableElement>(null);

  // Constants
  const ROW_COUNT = 4;
  const COL_COUNT = 5;

  // Fetch product data on component mount
  useEffect(() => {
    const getProductData = async () => {
      const data = await fetchProductData();
      setProducts(data);
    };

    getProductData();
  }, []);

  // Event handlers
  const handleCellClick = (product: Product, row: number, col: number) => {
    // Update selected product and focused cell
    setSelectedProduct(product);
    setFocusedCell({ row, col });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;

    if (key === "ArrowUp" && focusedCell.row > 0) {
      setFocusedCell((prev) => ({ ...prev, row: prev.row - 1 }));
    } else if (key === "ArrowDown" && focusedCell.row < ROW_COUNT - 1) {
      setFocusedCell((prev) => ({ ...prev, row: prev.row + 1 }));
    } else if (key === "ArrowLeft" && focusedCell.col > 0) {
      setFocusedCell((prev) => ({ ...prev, col: prev.col - 1 }));
    } else if (key === "ArrowRight" && focusedCell.col < COL_COUNT - 1) {
      setFocusedCell((prev) => ({ ...prev, col: prev.col + 1 }));
    }
  };

  const handleDragStart = (
    event: React.DragEvent,
    rowIndex: number,
    colIndex: number
  ) => {
    event.dataTransfer.setData("text/plain", `${rowIndex},${colIndex}`);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (
    event: React.DragEvent,
    targetRow: number,
    targetCol: number
  ) => {
    event.preventDefault();
    const [sourceRow, sourceCol] = event.dataTransfer
      .getData("text/plain")
      .split(",");
    const sourceIndex = Number(sourceRow) * COL_COUNT + Number(sourceCol);
    const targetIndex = targetRow * COL_COUNT + targetCol;

    const updatedProducts = [...products];
    const temp = updatedProducts[sourceIndex];
    updatedProducts[sourceIndex] = updatedProducts[targetIndex];
    updatedProducts[targetIndex] = temp;

    setProducts(updatedProducts);

    // Update focused cell to the dropped cell
    setFocusedCell({ row: targetRow, col: targetCol });
  };

  // Helper functions
  const getFocusedProduct = () => {
    const productIndex = focusedCell.row * COL_COUNT + focusedCell.col;
    return products[productIndex];
  };

  // Set the selected product when the focused cell changes
  useEffect(() => {
    setSelectedProduct(getFocusedProduct());
  }, [focusedCell, products]);

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown}>
      <TableContainer component={Paper}>
        <Table ref={tableRef}>
          <TableHead>
            <TableRow>
              {/* Generate column headers */}
              {Array.from(Array(COL_COUNT).keys()).map((col) => (
                <TableCell key={col}>Column {col + 1}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Generate table rows */}
            {Array.from(Array(ROW_COUNT).keys()).map((row) => (
              <TableRow key={row}>
                {/* Generate table cells */}
                {Array.from(Array(COL_COUNT).keys()).map((col) => {
                  const productIndex = row * COL_COUNT + col;
                  const product = products[productIndex];

                  return (
                    <TableCell
                      className={styles.tableCellStyle}
                      key={`${row}-${col}`}
                      // style={{
                      //   border: "3px solid #fff",
                      //   height: 200,
                      //   width: 200,

                      //   backgroundColor: "black", // Set the cell background color to black
                      //   cursor: "pointer",
                      // }}
                      onClick={() => handleCellClick(product, row, col)}
                      draggable
                      onDragStart={(e) => handleDragStart(e, row, col)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, row, col)}
                    >
                      {/* Display product details when available */}
                      {selectedProduct && selectedProduct.id === product.id && (
                        <>
                          <Image
                            src={selectedProduct.image}
                            alt={selectedProduct.title}
                            width={50}
                            height={50}
                          />
                          <p>{selectedProduct.title}</p>
                          <p>{selectedProduct.price}</p>
                        </>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductTable;
