"use client"

import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ProductCell from "./ProductCell";
import axios, { AxiosResponse } from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const ROW_COUNT = 4;
const COL_COUNT = 5;

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  }>({ row: -1, col: -1 });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response: AxiosResponse<Product[]> = await axios.get(
          "https://fakestoreapi.com/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setProducts([]);
      }
    };

    fetchProductData();
  }, []);

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;
    const { row, col } = selectedCell;

    switch (key) {
      case "ArrowUp":
        setSelectedCell({ row: Math.max(row - 1, 0), col });
        break;
      case "ArrowDown":
        setSelectedCell({ row: Math.min(row + 1, ROW_COUNT - 1), col });
        break;
      case "ArrowLeft":
        setSelectedCell({ row, col: Math.max(col - 1, 0) });
        break;
      case "ArrowRight":
        setSelectedCell({ row, col: Math.min(col + 1, COL_COUNT - 1) });
        break;
      default:
        break;
    }
  };

  const handleDragStart = (e: React.DragEvent, row: number, col: number) => {
    e.dataTransfer.setData("text/plain", `${row},${col}`);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent,
    targetRow: number,
    targetCol: number
  ) => {
    e.preventDefault();
    const [sourceRow, sourceCol] = e.dataTransfer
      .getData("text/plain")
      .split(",");
    const sourceIndex = Number(sourceRow) * COL_COUNT + Number(sourceCol);
    const targetIndex = targetRow * COL_COUNT + targetCol;

    const updatedProducts = [...products];
    const temp = updatedProducts[sourceIndex];
    updatedProducts[sourceIndex] = updatedProducts[targetIndex];
    updatedProducts[targetIndex] = temp;

    setProducts(updatedProducts);
    setSelectedCell({ row: targetRow, col: targetCol });
  };

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {Array.from(Array(ROW_COUNT).keys()).map((row) => (
              <TableRow key={row}>
                {Array.from(Array(COL_COUNT).keys()).map((col) => (
                  <ProductCell
                    key={`${row}-${col}`}
                    product={products[row * COL_COUNT + col]}
                    isSelected={
                      selectedCell.col === col && selectedCell.row === row
                    }
                    onClick={() => handleCellClick(row, col)}
                    onDragStart={(e) => handleDragStart(e, row, col)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, row, col)}
                  />
                ))}
              </TableRow>
            ))}
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductTable;
