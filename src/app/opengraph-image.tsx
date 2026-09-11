import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Enate Ethiopian and Eritrean Restaurant';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const runtime = 'nodejs';

export default async function OpenGraphImage() {
  const logoFile = await readFile(join(process.cwd(), 'public/menu-assets/enate-logo-transparent.png'));
  const logoImage = logoFile.buffer.slice(logoFile.byteOffset, logoFile.byteOffset + logoFile.byteLength) as ArrayBuffer;

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: '#242522',
          color: '#f4f2e9',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          position: 'relative',
          width: '100%',
        }}
      >
        <div style={{ background: '#f3cf22', height: '100%', left: 0, opacity: 0.18, position: 'absolute', top: 0, width: '34px' }} />
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <img
            src={logoImage as unknown as string}
            width={220}
            height={220}
            style={{ borderRadius: '110px', objectFit: 'contain' }}
          />
          <div style={{ color: '#f3cf22', fontSize: 34, fontWeight: 700, letterSpacing: 7, textTransform: 'uppercase' }}>Enate Restaurant</div>
          <div style={{ fontSize: 26, letterSpacing: 2 }}>Ethiopian and Eritrean Cuisine · Soho, London</div>
        </div>
      </div>
    ),
    size,
  );
}
