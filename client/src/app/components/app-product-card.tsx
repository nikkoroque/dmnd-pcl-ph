import Image from "next/image";
import Link from "next/link";
import DiamondPlaceholder from "../../../public/images/diamond-placeholder.jpg";

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
  [key: string]: string | number;
};

type ProductCardProps = {
  product: Product;
  diamondType: "lab" | "natural";
  fieldMapping?: {
    lotNumber: string;
    shape: string;
    color: string;
    clarity: string;
    weight: string;
    lab: string;
    price: string;
    image: string;
  };
};

export default function ProductCard({
  product,
  diamondType,
  fieldMapping,
}: ProductCardProps) {
  const getField = (field: string) => {
    if (fieldMapping) {
      return product[fieldMapping[field as keyof typeof fieldMapping]];
    }
    return product[field];
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer">
        <div className="relative aspect-square">
          <Image
            src={product.image || DiamondPlaceholder}
            alt={`Diamond ${product.lot}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        <div className="flex justify-between items-center mb-4 p-2">
          <span className="text-md font-medium">
            {product.carat} Carat {product.shape}
          </span>
          <span className="text-md font-medium">
            {formatPrice(product.displayedPrice)}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-4 p-2">
          <div className="text-center bg-gray-50 p-2">
            <div className="font-semibold text-sm text-gray-600 mb-1">
              {product.labType === "Lab-Grown Diamond" ? "Lab" : "Natural"}
            </div>
            <div className="text-sm text-gray-600">Diamond</div>
          </div>
          <div className="text-center bg-gray-50 p-2">
            <div className="font-semibold text-sm text-gray-600">Color</div>
            <div className="text-sm mb-1">{product.color}</div>
          </div>
          <div className="text-center bg-gray-50 p-2">
            <div className="font-semibold text-sm text-gray-600">Clarity</div>
            <div className="text-sm mb-1">{product.clarity}</div>
          </div>
          <div className="text-center bg-gray-50 p-2">
            <div className="font-semibold text-sm text-gray-600">Certified</div>
            <div className="text-sm mb-1">{product.lab}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
