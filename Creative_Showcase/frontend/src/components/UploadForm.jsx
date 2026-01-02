import { useState } from "react";
import toast from "react-hot-toast";
import { uploadImage } from "../api/image.api";
import Button from "./ui/Button";

export default function UploadForm({ onUpload }) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Check file size (optional - max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      toast.success("Image selected successfully ✅");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image first");
      return;
    }

    const uploadToast = toast.loading(" Uploading your artwork...📤");

    try {
      setLoading(true);
      await uploadImage(image, title);

      // Clear form
      setImage(null);
      setTitle("");

      // Reset file input
      e.target.reset();

      toast.success("Artwork uploaded successfully! 🎉", {
        id: uploadToast,
      });

      onUpload();
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Upload failed";
      toast.error(`${errorMessage}`, {
        id: uploadToast,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    toast.success("Image removed 🗑️");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 sm:space-y-5 md:space-y-6"
    >
      {/* File Input Section */}
      <div>
        <label className="block text-teal-700 font-medium mb-2 text-sm sm:text-base">
          Choose Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="
            w-full px-3 py-2 sm:px-4 sm:py-3 
            border-2 border-dashed border-blue-300 rounded-xl
            text-sm sm:text-base
            file:mr-3 sm:file:mr-4 
            file:px-3 sm:file:px-4 
            file:py-1.5 sm:file:py-2 
            file:rounded-lg file:border-0
            file:bg-blue-600 file:text-white 
            file:font-medium file:text-sm
            file:cursor-pointer hover:file:bg-teal-600
            file:transition-all
            cursor-pointer
            focus:border-teal-500 focus:outline-none
          "
        />
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Supported formats: JPG, PNG, GIF (Max 5MB)
        </p>
      </div>

      {/* Image Preview */}
      {image && (
        <div className="relative rounded-xl overflow-hidden shadow-blue-200/40">
          <img
            src={image}
            alt="Preview"
            className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="
              absolute top-2 right-2 sm:top-3 sm:right-3
              bg-red-500 text-white 
              px-2 py-1 sm:px-3 sm:py-1.5 
              rounded-lg text-xs sm:text-sm font-medium
              hover:bg-red-600 transition-colors
              shadow-lg
            "
          >
            Remove
          </button>
        </div>
      )}

      {/* Title Input */}
      <input
        type="text"
        placeholder="Artwork title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
        className="
          w-full 
          px-3 py-2 sm:px-4 sm:py-3 
          text-sm sm:text-base
          rounded-xl border-2 border-gray-200 
          focus:border-teal-500 focus:outline-none
          transition-colors
          placeholder:text-gray-400
        "
      />

      {/* Submit Button */}
      <Button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload Artwork"}
      </Button>
    </form>
  );
}
