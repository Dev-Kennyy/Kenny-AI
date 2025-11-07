# KennyAI — Personal Gemini Companion

KennyAI is a personal AI assistant inspired by Google Gemini and tuned to showcase Kehinde Salimonu’s work. The app focuses on a conversational experience that highlights personal branding, project insights, and community engagement.

## Features

- Responsive layout with a collapsible sidebar and mobile-first navigation.
- Persistent recent prompts (stored locally) for fast follow-up questions.
- Gemini-powered responses, streamed and rendered progressively for natural pacing.
- Personal quick actions that introduce projects, stack, and community goals.
- Accessibility upgrades: keyboard-friendly controls, labelled inputs, polite live regions.

## Getting Started

### Prerequisites

- Node.js 18+
- A Google AI Studio API key with access to Gemini models.

### Installation

```bash
npm install   # or pnpm install / yarn install
```

Create an `.env` file at the project root with your Gemini key:

```env
VITE_GOOGLE_API_KEY=your-google-genai-api-key
```

### Development

```bash
npm run dev   # start Vite dev server
```

### Production Build

```bash
npm run build
npm run preview
```

## Customising KennyAI

- Update quick action tiles and CTA copy in `src/components/Main/Main.tsx`.
- Replace brand colours or background gradients in `src/App.css` and `src/components/Main/Main.css`.
- Tailor prompt persistence by adjusting the storage key inside `src/context/context.tsx`.

## Tech Stack

- React 18 + TypeScript
- Vite tooling
- Google GenAI SDK
- Vanilla CSS modules

## License

This project is maintained as a personal showcase. Feel free to adapt the structure for your own portfolio; attribution is appreciated.
