import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Page from "../components/Page";
import UploadForm from "../components/UploadForm";
import ImageGrid from "../components/ImageGrid";
import SkeletonGrid from "../components/SkeletonGrid";
import ConfirmModal from "../components/ConfirmModal";
import { fetchMyImages, deleteImage } from "../api/image.api";

export default function Dashboard() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);

  const loadImages = async () => {
    setLoading(true);
    try {
      const data = await fetchMyImages();
      setImages(data);
    } catch (error) {
      toast.error("Failed to load your images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedImageId(id);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedImageId) return;

    const deleteToast = toast.loading("Deleting artwork...🗑️");

    try {
      await deleteImage(selectedImageId);
      setImages(images.filter((img) => img._id !== selectedImageId));
      toast.success("Artwork deleted successfully ✅", { id: deleteToast });
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete artwork", { id: deleteToast });
    } finally {
      setSelectedImageId(null);
    }
  };

  return (
    <Page>
      <h1 className="text-4xl font-bold mb-8 bg-linear-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
        Your Creations
      </h1>

      <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Upload New Artwork
        </h2>
        <UploadForm onUpload={loadImages} />
      </div>

      {loading ? (
        <SkeletonGrid />
      ) : images.length > 0 ? (
        <ImageGrid
          images={images}
          onDelete={handleDeleteClick}
          showDelete={true}
        />
      ) : (
        <div className="text-center py-16 bg-blue-50 rounded-2xl border-2 border-dashed border-blue-200">
          <div className="text-6xl mb-4">🎨</div>
          <p className="text-gray-600 text-lg">
            No artworks yet. Upload your first creation!
          </p>
        </div>
      )}

      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedImageId(null);
        }}
        onConfirm={handleDelete}
        title="Delete Artwork?"
        message="Are you sure you want to delete this artwork? This action cannot be undone."
        type="danger"
      />
    </Page>
  );
}
