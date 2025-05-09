import Image from "next/image";
import Link from "next/link";
import DiamondPlaceholder from "../../../public/images/diamond-placeholder.jpg";

type Product = {
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
    <Link href={`/pages/${diamondType}/${getField("lotNumber")}`}>
      <div className="bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer">
        <div className="relative aspect-square">
          <Image
            src={(getField("image") as string) || DiamondPlaceholder}
            alt={`Diamond ${getField("lotNumber")}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        <div className="flex justify-between items-center mb-4 p-2">
          <span className="text-md font-medium">
            {getField("weight")} Carat {getField("shape")}
          </span>
          <span className="text-md font-medium">
            {formatPrice(getField("price") as number)}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-4 p-2">
          <div className="text-center bg-gray-50 p-2">
            <div className="font-semibold text-sm text-gray-600 mb-1">
              {diamondType === "lab" ? "Lab" : "Natural"}
            </div>
            <div className="text-sm text-gray-600">Diamond</div>
          </div>
          <div className="text-center bg-gray-50 p-2">
            <div className="font-semibold text-sm text-gray-600">Color</div>
            <div className="text-sm mb-1">{getField("color")}</div>
          </div>
          <div className="text-center bg-gray-50 p-2">
            <div className="font-semibold text-sm text-gray-600">Clarity</div>
            <div className="text-sm mb-1">{getField("clarity")}</div>
          </div>
          <div className="text-center bg-gray-50 p-2">
            <div className="font-semibold text-sm text-gray-600">Certified</div>
            <div className="text-sm mb-1">{getField("lab")}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
