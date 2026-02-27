import { getClient, type WachtClient } from "../client";

/**
 * Upload an image to CDN
 * Supports JPEG, PNG, GIF, WEBP, ICO formats
 */
export async function uploadImage(
  imageType:
    | "logo"
    | "favicon"
    | "user-profile"
    | "org-profile"
    | "workspace-profile",
  file: File,
  client?: WachtClient,
): Promise<{ url: string }> {
  const sdkClient = client ?? getClient();
  const formData = new FormData();
  formData.append("file", file);

  return sdkClient.post<{ url: string }>(
    `/settings/upload/${imageType}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
}
