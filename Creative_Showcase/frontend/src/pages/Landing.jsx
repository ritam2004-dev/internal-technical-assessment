import { useEffect, useState } from "react";
import Page from "../components/Page";
import ImageGrid from "../components/ImageGrid";
import SkeletonGrid from "../components/SkeletonGrid";
import { fetchRandomImages } from "../api/image.api";

export default function Landing() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadImages = async () => {
    setLoading(true);
    try {
      const data = await fetchRandomImages();
      setImages(data);
    } catch (error) {
      console.error("Failed to load images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <Page>
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold bg-linear-to-r from-blue-600 via-blue-500 to-teal-500 bg-clip-text text-transparent mb-4">
          Discover Creative Work
        </h1>
        <p className="text-xl text-gray-600">
          Explore amazing artwork from talented creators
        </p>
      </div>

      {loading ? (
        <SkeletonGrid count={12} />
      ) : (
        <ImageGrid images={images} onRefresh={loadImages} />
      )}
    </Page>
  );
}
