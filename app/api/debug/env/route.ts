import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? '***SET***' : 'NOT_SET',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? '***SET***' : 'NOT_SET',
    NODE_ENV: process.env.NODE_ENV,
  });
}
