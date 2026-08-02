/**
 * lfseffect-backend API client
 *
 * Thin wrapper around fetch() for every endpoint the backend exposes.
 * Framework-agnostic — works in React, Vue, vanilla JS, etc.
 *
 * Set your backend's base URL below, or override it with an env var:
 *   Vite:                VITE_API_BASE_URL=http://localhost:5175
 *   Create React App:    REACT_APP_API_BASE_URL=http://localhost:5175
 * If neither is present, it falls back to http://localhost:5175.
 */

export const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_API_BASE_URL) ||
  "http://localhost:5175";

async function handleResponse(res) {
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const body = isJson ? await res.json() : null;

  if (!res.ok) {
    const message = body?.error || `Request failed with status ${res.status}`;
    throw new Error(message);
  }
  return body;
}

/**
 * Turns a relative proxied path like "/api/files/abc123" into a full URL
 * you can drop straight into <img src> / <video src>.
 */
export function resolveFileUrl(relativeUrl) {
  if (!relativeUrl) return "";
  return `${BASE_URL}${relativeUrl}`;
}

/**
 * Uploads a single file.
 * @param {File} file
 * @param {string} [folderName] - optional Drive folder to upload into (created if missing)
 */
export async function uploadFile(file, folderName) {
  const form = new FormData();
  form.append("file", file);
  if (folderName) form.append("folderName", folderName);

  const res = await fetch(`${BASE_URL}/api/upload`, { method: "POST", body: form });
  return handleResponse(res); // -> { file: { id, name, mimeType, size, url, createdTime } }
}

/**
 * Uploads multiple files, optionally preserving a folder structure.
 * @param {File[]} files
 * @param {Object} [options]
 * @param {string[]} [options.relativePaths] - same length/order as files, e.g. ["gallery/jane/1.jpg", ...]
 * @param {string} [options.folderName] - base Drive folder (default: "uploads")
 */
export async function uploadFiles(files, { relativePaths, folderName } = {}) {
  const form = new FormData();
  files.forEach((file) => form.append("files", file));
  if (relativePaths) form.append("relativePaths", JSON.stringify(relativePaths));
  if (folderName) form.append("folderName", folderName);

  const res = await fetch(`${BASE_URL}/api/upload/batch`, { method: "POST", body: form });
  return handleResponse(res); // -> { files: [{ id, name, mimeType, size, url, createdTime }, ...] }
}

/**
 * Fetches metadata (not bytes) for a single file by id.
 */
export async function getFileInfo(fileId) {
  const res = await fetch(`${BASE_URL}/api/files/${fileId}/info`);
  return handleResponse(res); // -> { file: {...} }
}

/**
 * Returns every image/video in the "lfseffect" folder, ready to render.
 */
export async function getLfseffectImages() {
  const res = await fetch(`${BASE_URL}/api/lfseffect/images`);
  const data = await handleResponse(res); // -> { folderId, count, files: [...] }
  return {
    ...data,
    files: data.files.map((f) => ({ ...f, resolvedUrl: resolveFileUrl(f.url) })),
  };
}

/**
 * Lists the direct contents (files + subfolders) of any Drive folder by id.
 */
export async function getFolderContents(folderId) {
  const res = await fetch(`${BASE_URL}/api/folders/${folderId}/contents`);
  return handleResponse(res); // -> { items: [...] }
}

/**
 * Submits a signup, appending a row to the Salon Signups sheet.
 * Required: fullName, email, phone. Everything else is optional.
 */
export async function submitSignup({
  fullName,
  email,
  phone,
  dateOfBirth,
  gender,
  preferredLocation,
  preferredStylist,
  hairType,
  skinType,
  allergies,
  referralSource,
  marketingConsent,
  notes,
}) {
  const res = await fetch(`${BASE_URL}/api/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName,
      email,
      phone,
      dateOfBirth,
      gender,
      preferredLocation,
      preferredStylist,
      hairType,
      skinType,
      allergies,
      referralSource,
      marketingConsent,
      notes,
    }),
  });
  return handleResponse(res); // -> { success: true, spreadsheetId }
}