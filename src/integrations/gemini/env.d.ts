// This file ensures TypeScript recognizes our environment variables

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_GEMINI_API_KEY: string;
  }
}
