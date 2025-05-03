"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AppLayout from "@/app/components/app-layout";
import DiamondToggle from "@/app/components/diamond-toggle";
import Image from "next/image";
import DiamondPlaceholder from "../../../../../public/images/diamond-placeholder.jpg";
import ProductsView from "@/app/components/products-view";

type Product = {
  [key: string]: string | number;
};

type PageParams = {
  diamondType: string;
  id: string;
};

export default function ProductDetailPage() {
  const params = useParams() as PageParams;
  const { diamondType, id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/${diamondType}-diamonds/${id}`);
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
  }, [diamondType, id]);

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

  const getField = (field: string) => {
    const fieldMapping =
      diamondType === "lab"
        ? {
            lotNumber: "Lot #",
            shape: "Shape",
            color: "Color",
            clarity: "Clarity",
            weight: "Carat",
            lab: "Lab",
            price: "Diamond Parcel Price",
            image: "Diamond Image",
          }
        : {
            lotNumber: "Stock_NO",
            shape: "Shape",
            color: "Color",
            clarity: "Clarity",
            weight: "Carat",
            lab: "Lab",
            price: "Diamond Parcel Price",
            image: "ImageLink",
          };

    return product[fieldMapping[field as keyof typeof fieldMapping]];
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square">
            <Image
              src={(getField("image") as string) || DiamondPlaceholder}
              alt={`Diamond ${getField("lotNumber")}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {getField("weight")} Carat {getField("shape")} Diamond
              </h1>
              <p className="text-2xl font-semibold text-primary">
                {formatPrice(getField("price") as number)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-600 mb-1">
                  Type
                </h3>
                <p className="text-lg">
                  {diamondType === "lab" ? "Lab Grown" : "Natural"} Diamond
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-600 mb-1">
                  Color
                </h3>
                <p className="text-lg">{getField("color")}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-600 mb-1">
                  Clarity
                </h3>
                <p className="text-lg">{getField("clarity")}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-600 mb-1">
                  Certification
                </h3>
                <p className="text-lg">{getField("lab")}</p>
              </div>
            </div>
            {/* 
            <div className="pt-6">
              <button className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors">
                Contact for Purchase
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <ProductsView />
    </AppLayout>
  );
}
