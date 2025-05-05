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
            weight: "Weight",
            cut: "Cut Grade",
            length: "Length",
            width: "Width",
            table: "Table %",
            polish: "Polish",
            culet: "Culet",
            fluorescence: "Fluor",
            symmetry: "Symmetry",
            lab: "Lab",
            cerfiticate_no: "Certificate #",
            price: "Diamond Parcel Price",
            image: "Diamond Image",
            video: "Video",
          }
        : {
            lotNumber: "Stock_NO",
            shape: "Shape",
            color: "Color",
            clarity: "Clarity",
            weight: "Carat",
            cut: "Cut",
            measurements: "Measurement",
            table: "Tab_",
            polish: "Polish",
            culet: "CUL",
            fluorescence: "Fluorescent",
            symmetry: "Symmetry",
            lab: "Lab",
            cerfiticate_no: "CERT_NO",
            price: "Diamond Parcel Price",
            image: "ImageLink",
            video: "VideoLink",
          };

    return product[fieldMapping[field as keyof typeof fieldMapping] as keyof typeof product];
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Main Media Section */}
          <div className="space-y-6">
            <div className="relative aspect-square bg-white overflow-hidden">
              {getField("video") ? (
                <iframe
                  src={getField("video") as string}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  style={{ border: 'none' }}
                />
              ) : (
                <Image
                  src={(getField("image") as string) || DiamondPlaceholder}
                  alt={`Diamond ${getField("lotNumber")}`}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div className="pb-6">
              <h1 className="text-4xl font-light mb-2 text-gray-900 tracking-wide">
                {getField("weight")} Carat {getField("shape")}  {diamondType === "lab"
                    ? `Lab-Grown`
                    : `Natural`} Diamond
              </h1>
              
              <div className="h-1 w-20 rounded bg-gradient-to-r from-gray-200 to-gray-50 mb-2" />
            </div>

            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold tracking-wide text-gray-900">Diamond Information</h2>
                <span className="text-lg text-gray-900">{formatPrice(getField("price") as number)}</span>
              </div>
            {/* Diamond Information Section (two columns, alternating backgrounds) */}
            <div className="grid grid-cols-2 gap-0">
              <div className="px-6 py-4 flex justify-between items-center bg-white">
                <span className="text-gray-700 font-medium">Stock Number:</span>
                <span className="text-gray-900 font-semibold">{getField("lotNumber")}</span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-white">
                <span className="text-gray-700 font-medium">Shape:</span>
                <span className="text-gray-900 font-semibold">{getField("shape")}</span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-gray-50">
                <span className="text-gray-700 font-medium">Carat Weight:</span>
                <span className="text-gray-900 font-semibold">{getField("weight")} ct.</span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-gray-50">
                <span className="text-gray-700 font-medium">Color:</span>
                <span className="text-gray-900 font-semibold">{getField("color")}</span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-white">
                <span className="text-gray-700 font-medium">Clarity:</span>
                <span className="text-gray-900 font-semibold">{getField("clarity")}</span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-white">
                <span className="text-gray-700 font-medium">Cut:</span>
                <span className="text-gray-900 font-semibold">{getField("cut")}</span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-gray-50">
                <span className="text-gray-700 font-medium">Measurements:</span>
                <span className="text-gray-900 font-semibold">
                  {diamondType === "lab"
                    ? `${getField("length")} x ${getField("width")}`
                    : getField("measurements")}
                </span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-gray-50">
                <span className="text-gray-700 font-medium">Polish</span>
                <span className="text-gray-900 font-semibold">{getField("polish")}</span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-white">
                <span className="text-gray-700 font-medium">Table %:</span>
                <span className="text-gray-900 font-semibold">{getField("table")}%</span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-white">
                <span className="text-gray-700 font-medium">Culet:</span>
                <span className="text-gray-900 font-semibold">{getField("culet")}</span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-gray-50">
                <span className="text-gray-700 font-medium">Flourescent:</span>
                <span className="text-gray-900 font-semibold">{getField("fluorescence")}</span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-gray-50">
                <span className="text-gray-700 font-medium">Symmetry:</span>
                <span className="text-gray-900 font-semibold">{getField("symmetry")}</span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-white">
                <span className="text-gray-700 font-medium">Certified:</span>
                <span className="text-gray-900 font-semibold">{getField("lab")}</span>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-white">
                <span className="text-gray-700 font-medium">Certificate No:</span>
                <span className="text-gray-900 font-semibold">{getField("cerfiticate_no")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductsView />
    </AppLayout>
  );
}
