export default function SkeletonGrid({ count = 8 }) {
  const heights = [200, 280, 240, 320, 180, 260, 300, 220];

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="mb-6 break-inside-avoid bg-linear-to-br from-blue-200 via-blue-100 to-teal-200 rounded-2xl animate-pulse"
          style={{ height: `${heights[i % heights.length]}px` }}
        />
      ))}
    </div>
  );
}
