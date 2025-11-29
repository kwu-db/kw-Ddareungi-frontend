import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#00a651',
          borderRadius: '50%',
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
          <path d="M19 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
          <path d="M12 19h-2a4 4 0 0 1-4-4V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
          <path d="M12 19h2a4 4 0 0 0 4-4v-5a2 2 0 0 0-2-2h-4" />
          <path d="M8 11h8" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}

