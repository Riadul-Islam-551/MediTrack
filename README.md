# Medi Track

Medi Track is a modern medical intelligence dashboard built with Next.js, TypeScript, and Google Gemini AI. It provides a secure local patient ledger, prescription ingestion, and structured clinical data extraction for simplified record management.

## Key Features

- AI-powered prescription ingestion using Google Gemini via `@google/genai`
- PDF / PNG / JPEG upload support for clinical documents
- Structured medical record extraction with medicines, vitals, and diagnostic results
- Patient profile assignment and record history storage
- LocalStorage persistence for client-side state
- Audit logging for upload success and failure events
- Smooth UI interactions with Tailwind CSS and Framer Motion

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Google GenAI (`@google/genai`)

## Getting Started

### Requirements

- Node.js 20+ (recommended)
- npm
- Google Gemini API key

### Install

```bash
npm install
```

### Environment

Create a `.env.local` file at the project root and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000` and the app will redirect to the patient portal.

## Usage

1. Select a target patient profile from the dropdown.
2. Upload a prescription, diagnostic report, or clinical summary.
3. The AI engine parses the document and stores the extracted data in the selected patient record.
4. Success or failure messages appear along with an audit log entry.

> The application uses local storage to keep state between page reloads, so patient records and logs persist in the browser session.

## Project Structure

- `src/app/page.tsx` — redirects users to the patient portal
- `src/app/patient/page.tsx` — main patient ingestion UI
- `src/app/actions.ts` — server action that sends uploaded files to Google Gemini and parses JSON output
- `src/app/types/medical.ts` — domain models for patient profiles, medical records, medicines, test results, and audit logs
- `src/hooks/useLocalStorage.ts` — local storage state persistence hook
- `src/utils/mockData.ts` — seeded example patient data

## Available Scripts

- `npm run dev` — start development server
- `npm run build` — build production assets
- `npm run start` — run built production server
- `npm run lint` — run ESLint

## Notes

- The AI document parser expects a valid `GEMINI_API_KEY`.
- Uploaded files are processed client-side and sent to the server action for extraction.
- This project is configured as a private application in `package.json`.

## License

This repository is currently private. Refer to project stakeholders for license details.
