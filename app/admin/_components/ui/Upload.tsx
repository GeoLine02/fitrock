"use client";

import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";

interface ImageUploadProps {
  label?: string;
  multiple?: boolean;
  accept?: string;
  onChange?: (files: File[]) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label = "Upload Image",
  multiple = false,
  accept = "image/*",
  onChange,
  className = "",
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    let updatedFiles: File[];

    if (multiple) {
      updatedFiles = [...files, ...selectedFiles];
    } else {
      updatedFiles = selectedFiles;
    }

    setFiles(updatedFiles);

    if (onChange) {
      onChange(updatedFiles);
    }

    e.target.value = "";
  };

  useEffect(() => {
    const objectUrls = files.map((file) => URL.createObjectURL(file));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPreviews(objectUrls);

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  return (
    <div className={`sm:col-span-2 ${className}`}>
      {label && (
        <label className="block text-xs font-semibold uppercase text-gray-700 sm:text-sm mb-3">
          {label}
        </label>
      )}

      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center bg-gray-50 hover:border-orange-400 hover:bg-orange-50 transition-all cursor-pointer"
      >
        <div className="space-y-2">
          <div className="flex justify-center">
            <svg
              className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>

          <p className="text-xs sm:text-sm text-gray-600">Click to upload</p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {previews.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4">
          {previews.map((src, index) => (
            <div
              key={index}
              className="relative w-24 h-24 rounded-lg overflow-hidden border"
            >
              <Image
                src={src}
                alt={`preview-${index}`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
