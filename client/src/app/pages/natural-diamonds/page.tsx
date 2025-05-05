"use client";
import { useEffect, useState, useCallback } from "react";
import ProductCard from "@/app/components/app-product-card";
import DiamondToggle from "@/app/components/diamond-toggle";
import DiamondFilters from "@/app/components/diamond-filters";
import AppLayout from "@/app/components/app-layout";

type Product = {
  Stock_NO: string;
  Shape: string;
  Color: string;
  Clarity: string;
  Carat: number;
  Lab: string;
  ["Diamond Parcel Price"]: number;
  ["Total Amount"]: number;
  ImageLink: string;
  [key: string]: string | number;
};

type DiamondShape =
  | "Round"
  | "Princess"
  | "Cushion"
  | "Emerald"
  | "Oval"
  | "Radiant"
  | "Asscher"
  | "Marquise"
  | "Heart"
  | "Pear";
type DiamondColor = "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K";
type DiamondClarity =
  | "FL"
  | "IF"
  | "VVS1"
  | "VVS2"
  | "VS1"
  | "VS2"
  | "SI1"
  | "SI2";

export default function NaturalDiamondsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    shapes: [] as DiamondShape[],
    priceRange: { min: 200, max: 50000000 },
    caratRange: { min: 0.01, max: 50.0 },
    colors: [] as DiamondColor[],
    clarity: [] as DiamondClarity[],
  });
  const [search, setSearch] = useState("");
  const limit = 20;

  const fetchProducts = useCallback(
    async (pageNumber: number, searchTerm = search) => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page: pageNumber.toString(),
          limit: limit.toString(),
          ...(filters.shapes.length > 0 && { shape: filters.shapes.join(",") }),
          ...(filters.colors.length > 0 && { color: filters.colors.join(",") }),
          ...(filters.clarity.length > 0 && {
            clarity: filters.clarity.join(","),
          }),
          minPrice: filters.priceRange.min.toString(),
          maxPrice: filters.priceRange.max.toString(),
          minCarat: filters.caratRange.min.toString(),
          maxCarat: filters.caratRange.max.toString(),
          ...(searchTerm && { search: searchTerm }),
        });

        const res = await fetch(`/api/natural-diamonds?${queryParams}`);
        const data = await res.json();
        setProducts(data.data);
        setTotal(data.total);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [filters, limit, search]
  );

  const handlePageChange = async (newPage: number) => {
    await new Promise((resolve) => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(resolve, 500);
    });
    setPage(newPage);
  };

  useEffect(() => {
    fetchProducts(page, search);
  }, [page, filters, search, fetchProducts]);

  const totalPages = Math.ceil(total / limit);
  const showingStart = (page - 1) * limit + 1;
  const showingEnd = Math.min(page * limit, total);

  return (
    <AppLayout>
      <DiamondToggle currentType="natural" />
      <div className="container mx-auto px-4 py-8">
        <DiamondFilters
          onFilterChange={(newFilters) => {
            setPage(1); // Reset to first page when filters change
            setFilters(newFilters);
          }}
          search={search}
          onSearchChange={setSearch}
          diamondType="natural"
        />
        <hr className="my-6" />
        {/* Products count info */}
        <div className="text-sm text-gray-600 mb-6">
          Showing {showingStart}-{showingEnd} of {total} natural diamonds
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
                <ProductCard
                  key={product.Stock_NO}
                  product={product}
                  diamondType="natural"
                  fieldMapping={{
                    lotNumber: "Stock_NO",
                    shape: "Shape",
                    color: "Color",
                    clarity: "Clarity",
                    weight: "Carat",
                    lab: "Lab",
                    price: "Diamond Parcel Price",
                    image: "ImageLink",
                  }}
                />
              ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handlePageChange(1)}
              disabled={page === 1 || isLoading}
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
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1 || isLoading}
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
                    className={`px-4 py-2 text-sm font-medium transition-all duration-200 min-w-[40px] ${
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
        </div>
      </div>
    </AppLayout>
  );
}
