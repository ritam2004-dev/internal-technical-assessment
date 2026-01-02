import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Page from "../components/Page";
import ImageGrid from "../components/ImageGrid";
import SkeletonGrid from "../components/SkeletonGrid";
import { fetchUserImages } from "../api/image.api";

export default function PublicProfile() {
  const { username } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadImages = async () => {
    setLoading(true);
    try {
      const data = await fetchUserImages(username);
      setImages(data);
    } catch (error) {
      console.error("Failed to load user images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, [username]);

  return (
    <Page>
      <h1 className="text-4xl font-bold mb-10 text-gray-800">
        <span className="bg-linear-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          @{username}
        </span>
        's Gallery
      </h1>

      {loading ? (
        <SkeletonGrid />
      ) : (
        <ImageGrid images={images} onRefresh={loadImages} />
      )}
    </Page>
  );
}
