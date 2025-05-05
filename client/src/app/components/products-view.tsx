import Link from "next/link";

export default function ProductsView() {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-[#342e37]">Natural Diamonds</h2>
            <p className="text-gray-600 mb-6">
              Discover our collection of natural diamonds, each one unique and carefully selected for its exceptional quality. IGI and GIA certified diamonds that meet the highest standards.
            </p>
            <Link 
              href="/natural-diamonds"
              className="inline-block bg-[#361111] text-white px-6 py-3 rounded-full hover:bg-[#1a1a1a] transition-colors"
            >
              Browse Natural Diamonds
            </Link>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-[#342e37]">Lab-Grown Diamonds</h2>
            <p className="text-gray-600 mb-6">
              Explore our selection of lab-grown diamonds, offering exceptional quality and value. These sustainable alternatives are physically and chemically identical to natural diamonds.
            </p>
            <Link 
              href="/lab-diamonds"
              className="inline-block bg-[#361111] text-white px-6 py-3 rounded-full hover:bg-[#1a1a1a] transition-colors"
            >
              Browse Lab-Grown Diamonds
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 