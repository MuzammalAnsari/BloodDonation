"use client";
import Image from "next/image";
import toast from "react-hot-toast";
import { useState } from "react";
import Script from "next/script";

export default function UploadImages({ link, setLink }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = (result) => {
    if (result.info?.secure_url) {
      setLink(result.info.secure_url);
      toast.success("Upload complete");
    } else {
      toast.error("Upload failed");
    }
    setUploading(false);
  };

  const openCloudinaryWidget = () => {
    setUploading(true);
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "ddccss78q",
        uploadPreset: "ml_default",
        folder: "donor", // Optional
        sources: ["local"], // Only allow file upload from local files
      },
      (error, result) => {
        if (result.event === "success") {
          handleUpload(result);
        } else {
          setUploading(false);
        }
      }
    );
    widget.open();
  };

  return (
    <>
      <Script
        src="https://upload-widget.cloudinary.com/global/all.js"
        strategy="lazyOnload"
      />
      {link ? (
        <Image
          className="rounded-lg mb-1 object-cover" // Added object-cover for proper fit
          src={link}
          width={200}
          height={200}
          alt="avatar"
          style={{ maxWidth: "100%", height: "auto" }} // Ensures responsiveness
        />
      ) : (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}

      <span
        className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer"
        onClick={openCloudinaryWidget}
      >
        {uploading ? "Opening..." : "Change image"}
      </span>
    </>
  );
}
