"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/app/components/app-product-card";

type Product = {
  ["Lot #"]: string;
  Shape: string;
  Color: string;
  Clarity: string;
  Weight: number;
  Lab: string;
  ["Diamond Parcel Price"]: number;
  ["Total Amount"]: number;
  ["Diamond Image"]: string;
  [key: string]: any;
};

export default function LabDiamondsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 20;

  const fetchProducts = async (pageNumber: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/lab-diamonds?page=${pageNumber}&limit=${limit}`
      );
      const data = await res.json();
      setProducts(data.data);
      setTotal(data.total);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = async (newPage: number) => {
    // Scroll to top first and wait for it to complete
    await new Promise((resolve) => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Wait for scroll animation to complete (typical duration is 500ms)
      setTimeout(resolve, 500);
    });

    // Then change the page
    setPage(newPage);
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const totalPages = Math.ceil(total / limit);
  const showingStart = (page - 1) * limit + 1;
  const showingEnd = Math.min(page * limit, total);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Lab Grown Diamonds</h1>

      {/* Products count info */}
      <div className="text-sm text-gray-600 mb-6">
        Showing {showingStart}-{showingEnd} of {total} diamonds
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[800px]">
        {isLoading
          ? // Loading skeleton
            [...Array(limit)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-lg h-[400px] animate-pulse"
              />
            ))
          : products.map((product) => (
              <ProductCard key={product["Lot #"]} product={product} />
            ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex flex-col items-center space-y-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handlePageChange(1)}
            disabled={page === 1 || isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:hover:bg-white flex items-center space-x-1"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1 || isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:hover:bg-white flex items-center space-x-1"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="inherit"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Page numbers */}
          <div className="flex space-x-2">
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 min-w-[40px] ${
                    pageNum === page
                      ? "bg-[#361111] text-white shadow-md hover:bg-[#342e37]"
                      : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={isLoading}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages || isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:hover:bg-white flex items-center space-x-1"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="inherit"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={page === totalPages || isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:hover:bg-white flex items-center space-x-1"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="inherit"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Page info */}
        <div className="text-sm text-gray-500 font-medium">
          Page {page} of {totalPages}
        </div>
      </div>
    </div>
  );
}
