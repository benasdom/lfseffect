Yes — they're already built and live in `lfseffect-backend`. Quick recap of what's there:

**Files/Media**
- `POST /api/upload` — single file upload (field `file`, optional `folderName`)
- `POST /api/upload/batch` — multiple files / whole folder upload (field `files`, optional `relativePaths` to preserve folder structure)
- `GET /api/files/:id` — proxied file stream (this is the URL you actually put in `<img src>` / `<video src>` — never a raw Drive link, supports video seeking via Range requests)
- `GET /api/files/:id/info` — just metadata (name, size, type) without the bytes
- `GET /api/lfseffect/images` — the gallery endpoint, returns every image/video in `lfseffect` with ready-to-use proxied URLs
- `GET /api/folders/:id/contents` — generic listing of any folder's contents

**Signup**
- `POST /api/signup` — appends a row to the auto-created "Salon Signups" sheet. Required: `fullName`, `email`, `phone`. Optional: `dateOfBirth`, `gender`, `preferredLocation`, `preferredStylist`, `hairType`, `skinType`, `allergies`, `referralSource`, `marketingConsent`, `notes`.

Example frontend usage:
```js
// Gallery
const { files } = await fetch("http://localhost:5175/api/lfseffect/images").then(r => r.json());
// files[0].url is something like "/api/files/1AbC..."

<img src={`http://localhost:5175${files[0].url}`} />

// Upload
const form = new FormData();
form.append("file", fileInput.files[0]);
const { file } = await fetch("http://localhost:5175/api/upload", { method: "POST", body: form }).then(r => r.json());

// Signup
await fetch("http://localhost:5175/api/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ fullName, email, phone }),
});
```

One thing to set before your frontend can actually call these: `CORS_ORIGINS` in `.env` needs your frontend's dev URL (e.g. `http://localhost:5173`) or the browser will block the requests.

Once you get `/api/lfseffect/images` returning real data (we were debugging that a moment ago), you're ready to wire the frontend to all of these.