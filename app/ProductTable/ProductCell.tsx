"use client"

import React from "react";
import { TableCell } from "@mui/material";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductCellProps {
  product: Product;
  isSelected: boolean;
  onClick: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

const ProductCell: React.FC<ProductCellProps> = ({
  product,
  isSelected,
  onClick,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  return (
    <TableCell
      style={{
        height: "250px",
        width: "250px",
        backgroundColor: isSelected ? "#f0f0f0" : "black",
        cursor: "pointer",
        border: "3px solid #fff",
      }}
      onClick={onClick}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {isSelected && (
        <>
          <Image
            src={product.image}
            alt={product.title}
            width={50}
            height={50}
            style={{ display: "block" }}
          />
          <p style={{ color: "#000", display: "block" }}>{product.title}</p>
          <p style={{ color: "#000", display: "block" }}>{product.price}</p>
        </>
      )}
    </TableCell>
  );
};

export default ProductCell;
