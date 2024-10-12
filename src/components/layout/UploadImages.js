"use client";
import Image from "next/image";
import toast from "react-hot-toast";
import { useState } from "react";
import Script from "next/script";

export default function UploadImages({ link, setLink, handleImageUpload }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = (result) => {
    if (result?.info?.secure_url) {
      const imageUrl = result.info.secure_url;
      setLink(imageUrl);  // Update the local state with the image URL
      console.log(imageUrl);
      
      handleImageUpload(imageUrl);  // Pass the image URL to the parent component
      toast.success("Upload complete");
    } else {
      toast.error("Upload failed");
    }
    setUploading(false);  // Reset uploading state after upload is complete or fails
  };

  const openCloudinaryWidget = () => {
    if (!window.cloudinary) {
      toast.error("Cloudinary widget not loaded");
      return;
    }

    setUploading(true);  // Set uploading to true when initiating the upload
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "ddccss78q",
        uploadPreset: "ml_default",
        folder: "donor", // The folder where images will be stored
        sources: ["local"], // Only allow local uploads
      },
      (error, result) => {
        if (result.event === "success") {
          handleUpload(result);  // Handle the successful upload
        } else {
          setUploading(false);  // Reset state on failure
        }
      }
    );
    widget.open();  // Open the Cloudinary upload widget
  };

  return (
    <>
      <Script
        src="https://upload-widget.cloudinary.com/global/all.js"
        strategy="lazyOnload"  // Load widget script lazily
      />
      {link ? (
        <Image
          className="rounded-lg mb-1 object-cover"
          src={link}
          width={200}
          height={200}
          alt="avatar"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      ) : (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}

      <button
        className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer"
        onClick={openCloudinaryWidget}
        disabled={uploading}  // Disable button while uploading
      >
        {uploading ? "Opening..." : "Change image"}
      </button>
    </>
  );
}
