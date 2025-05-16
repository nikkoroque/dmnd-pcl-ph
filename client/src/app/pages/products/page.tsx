"use client";
import { useEffect, useState, useCallback } from "react";
import ProductCard from "@/app/components/app-product-card";
import DiamondToggle from "@/app/components/diamond-toggle";
import DiamondFilters from "@/app/components/diamond-filters";
import AppLayout from "@/app/components/app-layout";

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
type LabType = "Lab-Grown Diamond" | "Natural Diamond";

type Product = {
  id: number;
  lot: string;
  shape: string;
  color: string;
  clarity: string;
  carat: number;
  lab: string;
  price: number;
  displayedPrice: number;
  image: string;
  video: string;
  labType: LabType;
  [key: string]: string | number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedLabType, setSelectedLabType] = useState<LabType | "all">(
    "all"
  );
  const [filters, setFilters] = useState({
    shapes: [] as DiamondShape[],
    priceRange: { min: 0, max: 100000000 },
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
          ...(selectedLabType !== "all" && { labType: selectedLabType }),
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

        console.log('Price filter range:', filters.priceRange);
        console.log('API URL:', `https://api.tdapi.xyz/api/v1/products?${queryParams}`);

        const res = await fetch(
          `https://api.tdapi.xyz/api/v1/products?${queryParams}`
        );
        const data = await res.json();
        console.log('API Response:', data.data.map((p: Product) => ({ id: p.id, price: p.price, displayedPrice: p.displayedPrice })));
        setProducts(data.data);
        setTotal(data.total);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [filters, limit, search, selectedLabType]
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
      <DiamondToggle
        currentType={
          selectedLabType === "all"
            ? "all"
            : selectedLabType === "Lab-Grown Diamond"
            ? "lab-grown"
            : "natural"
        }
        onTypeChange={(type) => {
          setSelectedLabType(
            type === "all"
              ? "all"
              : type === "lab-grown"
              ? "Lab-Grown Diamond"
              : "Natural Diamond"
          );
          setPage(1);
        }}
      />
      <div className="container mx-auto px-4 py-8">
        <DiamondFilters
          onFilterChange={(newFilters) => {
            setPage(1); // Reset to first page when filters change
            setFilters(newFilters);
          }}
          search={search}
          onSearchChange={setSearch}
          diamondType={
            selectedLabType === "all"
              ? "all"
              : selectedLabType === "Lab-Grown Diamond"
              ? "lab-grown"
              : "natural"
          }
        />
        <hr className="my-6" />
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
                <ProductCard
                  key={product.id}
                  product={product}
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
