import Image from "next/image";

type ProductCardProps = {
  product: {
    ["Lot #"]: string;
    Shape: string;
    Color: string;
    Clarity: string;
    Weight: number;
    Lab: string;
    ["Diamond Parcel Price"]: number;
    ["Diamond Image"]: string;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={`${product["Diamond Image"]}`}
          alt={`${product.Weight} Carat ${product.Shape}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-sm">
            {product.Weight} Carat {product.Shape}
          </h2>
          <span className="text-sm">
            ₱{product["Diamond Parcel Price"].toLocaleString()}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-3 text-center hover:shadow-md transition-all duration-300">
            <div className="text-sm font-semibold text-gray-800 tracking-wide mb-1">
              Lab
            </div>
            <p className="text-xs font-medium">Diamond</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-3 text-center hover:shadow-md transition-all duration-300">
            <div className="text-sm font-semibold text-gray-800 tracking-wide mb-1">
              Color
            </div>
            <p className="text-xs font-medium">{product.Color}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-3 text-center hover:shadow-md transition-all duration-300">
            <div className="text-sm font-semibold text-gray-800 tracking-wide mb-1">
              Clarity
            </div>
            <p className="text-xs font-medium">{product.Clarity}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-3 text-center hover:shadow-md transition-all duration-300">
            <div className="text-sm font-semibold text-gray-800 tracking-wide mb-1">
              {product.Lab}
            </div>
            <p className="text-xs font-medium">Certified</p>
          </div>
        </div>
      </div>
    </div>
  );
}
