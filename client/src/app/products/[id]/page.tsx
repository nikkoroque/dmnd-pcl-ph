"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AppLayout from "@/app/components/app-layout";
import Image from "next/image";
import DiamondPlaceholder from "../../../../public/images/diamond-placeholder.jpg";

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
  labType: "Lab-Grown Diamond" | "Natural Diamond";
  cut: string;
  measurements: string;
  table: number;
  polish: string;
  culet: string;
  fluorescence: string;
  symmetry: string;
  certificate: string;
  certLink: string;
  [key: string]: string | number;
};

type PageParams = {
  id: string;
};

export default function ProductDetailPage() {
  const params = useParams() as PageParams;
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://api.tdapi.xyz/api/v1/products/${id}`
        );
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!product) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Product not found</h1>
        </div>
      </AppLayout>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Main Media Section */}
          <div className="space-y-6">
            <div className="relative aspect-square bg-white overflow-hidden">
              {product.video ? (
                <>
                  <Image
                    src={DiamondPlaceholder}
                    alt={`Diamond ${product.lot}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <iframe
                    src={product.video}
                    className="w-full h-full absolute top-0 left-0"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    style={{ border: "none" }}
                  />
                </>
              ) : (
                <Image
                  src={product.image || DiamondPlaceholder}
                  alt={`Diamond ${product.lot}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div className="pb-6">
              <h1 className="text-4xl font-light mb-2 text-gray-900 tracking-wide">
                {product.carat} Carat {product.shape} {product.labType}
              </h1>

              <div className="h-1 w-20 rounded bg-gradient-to-r from-gray-200 to-gray-50 mb-2" />
            </div>

            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold tracking-wide text-gray-900">
                Diamond Information
              </h2>
              <span className="text-lg text-gray-900">
                {formatPrice(product.displayedPrice)}
              </span>
            </div>
            {/* Diamond Information Section (two columns, alternating backgrounds) */}
            <div className="grid grid-cols-2 gap-0">
              <div className="px-6 py-4 flex justify-between items-center bg-white">
                <span className="text-gray-700 font-medium">Stock Number:</span>
                <span className="text-gray-900 font-semibold">
                  {product.lot}
                </span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-white">
                <span className="text-gray-700 font-medium">Shape:</span>
                <span className="text-gray-900 font-semibold">
                  {product.shape}
                </span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-gray-50">
                <span className="text-gray-700 font-medium">Carat Weight:</span>
                <span className="text-gray-900 font-semibold">
                  {product.carat} ct.
                </span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-gray-50">
                <span className="text-gray-700 font-medium">Color:</span>
                <span className="text-gray-900 font-semibold">
                  {product.color}
                </span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-white">
                <span className="text-gray-700 font-medium">Clarity:</span>
                <span className="text-gray-900 font-semibold">
                  {product.clarity}
                </span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-white">
                <span className="text-gray-700 font-medium">Cut:</span>
                <span className="text-gray-900 font-semibold">
                  {product.cut}
                </span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-gray-50">
                <span className="text-gray-700 font-medium">Measurements:</span>
                <span className="text-gray-900 font-semibold">
                  {product.measurements}
                </span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-gray-50">
                <span className="text-gray-700 font-medium">Table:</span>
                <span className="text-gray-900 font-semibold">
                  {product.table}%
                </span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-white">
                <span className="text-gray-700 font-medium">Polish:</span>
                <span className="text-gray-900 font-semibold">
                  {product.polish}
                </span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-white">
                <span className="text-gray-700 font-medium">Culet:</span>
                <span className="text-gray-900 font-semibold">
                  {product.culet}
                </span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-gray-50">
                <span className="text-gray-700 font-medium">Fluorescence:</span>
                <span className="text-gray-900 font-semibold">
                  {product.fluorescence}
                </span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-gray-50">
                <span className="text-gray-700 font-medium">Symmetry:</span>
                <span className="text-gray-900 font-semibold">
                  {product.symmetry}
                </span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-white">
                <span className="text-gray-700 font-medium">Lab:</span>
                <span className="text-gray-900 font-semibold">
                  {product.lab}
                </span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-white">
                <span className="text-gray-700 font-medium">Certificate:</span>
                <span className="text-gray-900 font-semibold">
                  {product.certificate}
                </span>
              </div>
            </div>
            {product.certLink && (
              <a
                href={product.certLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#361111] text-white rounded-lg hover:bg-[#4a1717] transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                View Certificate
              </a>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
