'use client'

import { useTheme } from 'next-themes'

export const Logomark = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
    <title>Read it Later</title>
    <defs>
      <clipPath id="squareClip">
        <rect x="0" y="0" width="40" height="40" rx="15" />
      </clipPath>
    </defs>
    <g clipPath="url(#squareClip)">
      <rect x="0" y="0" width="40" height="40" className="fill-primary" />
      <g transform="translate(20 20)">
        <g transform="scale(0.08)">
          <g transform="translate(-128 -128)">
            <path
              d="M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48ZM172,96a12,12,0,1,1-12,12A12,12,0,0,1,172,96ZM96,184H80a16,16,0,0,1,0-32H96ZM84,120a12,12,0,1,1,12-12A12,12,0,0,1,84,120Zm60,64H112V152h32Zm32,0H160V152h16a16,16,0,0,1,0,32Z"
              className="fill-secondary"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
)
