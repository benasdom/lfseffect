/**
 * lfseffect-backend React handlers
 *
 * One hook per backend operation, each managing its own loading/error/data
 * state so components just destructure and go. Sits on top of
 * lfseffect-api.js — keep both files in the same folder (e.g. src/api/),
 * or adjust the import path below.
 */

import { useCallback, useState } from "react";
import {
  uploadFile,
  uploadFiles,
  getFileInfo,
  getLfseffectImages,
  getFolderContents,
  submitSignup,
} from "./lfseffect-api";

/**
 * Gallery: fetches all images/videos in the "lfseffect" folder.
 *
 * const { images, loading, error, refresh } = useLfseffectGallery();
 * useEffect(() => { refresh(); }, [refresh]);
 */
export function useLfseffectGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { files } = await getLfseffectImages();
      setImages(files);
      return files;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { images, loading, error, refresh };
}

/**
 * Single file upload.
 *
 * const { upload, uploading, error, uploadedFile } = useFileUpload();
 * <input type="file" onChange={(e) => upload(e.target.files[0])} />
 */
export function useFileUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const upload = useCallback(async (file, folderName) => {
    setUploading(true);
    setError(null);
    try {
      const { file: result } = await uploadFile(file, folderName);
      setUploadedFile(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  }, []);

  return { upload, uploading, error, uploadedFile };
}

/**
 * Multi-file / folder upload.
 *
 * const { uploadBatch, uploading, error, uploadedFiles } = useBatchUpload();
 * uploadBatch(Array.from(fileInput.files), { folderName: "gallery" });
 */
export function useBatchUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const uploadBatch = useCallback(async (files, options) => {
    setUploading(true);
    setError(null);
    try {
      const { files: results } = await uploadFiles(files, options);
      setUploadedFiles(results);
      return results;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  }, []);

  return { uploadBatch, uploading, error, uploadedFiles };
}

/**
 * Metadata for a single file by id (no bytes).
 *
 * const { fetchInfo, loading, error, info } = useFileInfo();
 * fetchInfo(fileId);
 */
export function useFileInfo() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInfo = useCallback(async (fileId) => {
    setLoading(true);
    setError(null);
    try {
      const { file } = await getFileInfo(fileId);
      setInfo(file);
      return file;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchInfo, info, loading, error };
}

/**
 * Contents (files + subfolders) of any Drive folder by id.
 *
 * const { fetchContents, items, loading, error } = useFolderContents();
 * fetchContents(folderId);
 */
export function useFolderContents() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContents = useCallback(async (folderId) => {
    setLoading(true);
    setError(null);
    try {
      const { items: result } = await getFolderContents(folderId);
      setItems(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchContents, items, loading, error };
}

/**
 * Signup form submission.
 *
 * const { signup, submitting, error, success } = useSignup();
 * signup({ fullName, email, phone, preferredStylist });
 */
export function useSignup() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const signup = useCallback(async (formData) => {
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      const result = await submitSignup(formData);
      setSuccess(true);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setSubmitting(false);
    }
  }, []);

  return { signup, submitting, error, success };
}