"use client";

type DiamondToggleProps = {
  currentType: "natural" | "lab-grown" | "all";
  onTypeChange?: (type: "natural" | "lab-grown" | "all") => void;
};

export default function DiamondToggle({
  currentType,
  onTypeChange,
}: DiamondToggleProps) {
  const handleClick = (type: "natural" | "lab-grown" | "all") => {
    if (onTypeChange) {
      onTypeChange(type);
    }
  };

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center text-[#1a1a1a] mb-6">
          {currentType === "all"
            ? "Diamond Finder"
            : `${
                currentType === "natural" ? "Natural" : "Lab-Grown"
              } Diamond Finder`}
        </h1>
        <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-10">
          Use our diamond search feature to find IGI and GIA-graded,
          conflict-free loose diamonds of the highest quality. Browse thousands
          of options and use the filters to narrow down the selection.
        </p>

        <div className="flex justify-center gap-4 max-w-xl mx-auto">
          <button
            onClick={() => handleClick("all")}
            className={`flex-1 py-4 px-8 text-center rounded-full text-lg font-medium transition-all duration-300 ${
              currentType === "all"
                ? "bg-[#361111] text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleClick("natural")}
            className={`flex-1 py-4 px-8 text-center rounded-full text-lg font-medium transition-all duration-300 ${
              currentType === "natural"
                ? "bg-[#361111] text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Natural
          </button>
          <button
            onClick={() => handleClick("lab-grown")}
            className={`flex-1 py-4 px-8 text-center rounded-full text-lg font-medium transition-all duration-300 ${
              currentType === "lab-grown"
                ? "bg-[#361111] text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Lab-Grown
          </button>
        </div>
      </div>
    </div>
  );
}
