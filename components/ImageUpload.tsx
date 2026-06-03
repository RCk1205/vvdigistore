"use client";

import React from "react";

type Props = {
  setImage: (url: string) => void;
};

export default function ImageUpload({
  setImage,
}: Props) {
  const uploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = e.target.files?.[0];

      if (!file) return;

      const formData = new FormData();

      formData.append("file", file);

      formData.append(
        "upload_preset",
        process.env
          .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          process.env
            .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

const data = await response.json();

console.log("Response Status:", response.status);
console.log("Cloudinary Response:", data);

if (response.ok && data.secure_url) {
  setImage(data.secure_url);
  alert("Image Uploaded Successfully");
} else {
  alert(
    JSON.stringify(data, null, 2)
  );
}
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={uploadImage}
      className="bg-black p-4 rounded-xl"
    />
  );
}