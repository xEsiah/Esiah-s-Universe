export interface ProjectDownloadData {
  id: string;
  downloadUrl: string;
}

export const ProjectDownloads: Record<string, ProjectDownloadData> = {
  NTR: {
    id: "NTR",
    downloadUrl: "/downloads/Neo-Tokyo-Rush.zip",
  },
  SPRotD: { id: "SPRotD", downloadUrl: "" },
  ZATYSHOK: {
    id: "ZATYSHOK",
    downloadUrl: "https://github.com/xEsiah/zatyshok-frontend/releases",
  },
  EotLS: { id: "EotLS", downloadUrl: "" },
  WYGTIWIF: {
    id: "WYGTIWIF",
    downloadUrl:
      "https://codeload.github.com/xEsiah/WYG-TIWIF/zip/refs/heads/main",
  },
};
