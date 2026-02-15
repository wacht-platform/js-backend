import { getClient } from '../client';

/**
 * Upload an image to CDN
 * Supports JPEG, PNG, GIF, WEBP, ICO formats
 */
export async function uploadImage(
  imageType: 'logo' | 'favicon' | 'user-profile' | 'org-profile' | 'workspace-profile',
  file: File
): Promise<{ url: string }> {
  const client = getClient();
  const formData = new FormData();
  formData.append('file', file);

  return client.post<{ url: string }>(
    `/settings/upload/${imageType}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
}
