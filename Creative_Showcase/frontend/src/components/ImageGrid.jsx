export default function ImageGrid({
  images,
  onDelete,
  showDelete = false,
  onRefresh,
}) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-5 md:gap-6">
      {images.map((img) => (
        <div
          key={img._id}
          className="mb-4 sm:mb-5 md:mb-6 break-inside-avoid group relative"
        >
          <img
            src={img.imageUrl}
            alt={img.title || "Artwork"}
            className="
              w-full rounded-xl sm:rounded-2xl 
              shadow-md sm:shadow-lg 
              hover:shadow-xl sm:hover:shadow-2xl 
              transition-shadow duration-300
              cursor-pointer
            "
            loading="lazy"
          />

          {/* Delete Button - Only owner's images */}
          {showDelete && (
            <button
              onClick={() => onDelete(img._id)}
              className="
                absolute 
                top-2 right-2 sm:top-3 sm:right-3
                px-2.5 py-1 sm:px-3 sm:py-1.5
                rounded-md sm:rounded-lg
                bg-red-500 text-white 
                text-xs sm:text-sm font-medium
                opacity-100 sm:opacity-0 
                group-hover:opacity-100 
                transition-opacity duration-200
                hover:bg-red-600
                shadow-lg
                active:scale-95
                cursor-pointer
              "
            >
              Delete
            </button>
          )}

          {img.title && (
            <p className="text-center mt-2 text-sm sm:text-base text-gray-700 font-medium px-1">
              {img.title}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
