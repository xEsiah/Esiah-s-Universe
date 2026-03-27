import React, { useState } from "react";
import { Download } from "lucide-react";
import { ProjectDownloads } from "./data/DownloadData";

interface DownloadButtonProps {
  projectId: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ projectId }) => {
  const projectData = ProjectDownloads[projectId];

  if (!projectData) return null;

  const isAvailable =
    projectData.downloadUrl &&
    projectData.downloadUrl !== "#" &&
    projectData.downloadUrl !== "";

  const handleDownload = () => {
    if (!isAvailable) return;

    const link = document.createElement("a");
    link.href = projectData.downloadUrl;

    if (projectData.downloadUrl.endsWith(".zip")) {
      const fileName =
        projectData.downloadUrl.split("/").pop() || "project.zip";
      link.setAttribute("download", fileName);
    } else {
      link.setAttribute("target", "_blank");
    }

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center mt-10 gap-3">
      <button
        onClick={handleDownload}
        disabled={!isAvailable}
        className={`cursor-target flex items-center gap-3 px-8 py-4 font-bold rounded-full transition-all transform shadow-lg group ${
          isAvailable
            ? "bg-[#b71c1c] text-white hover:bg-[#d32f2f] hover:scale-105 cursor-pointer"
            : "bg-gray-700 text-gray-400 cursor-not-allowed opacity-60"
        }`}
      >
        <Download
          className={isAvailable ? "group-hover:animate-bounce" : ""}
          size={20}
        />
        <span>{isAvailable ? "Download Project" : "Not available"}</span>
      </button>

      {!isAvailable && (
        <p className="text-sm text-gray-400 italic animate-pulse">
          Not available yet, come back later
        </p>
      )}
    </div>
  );
};

export default DownloadButton;
