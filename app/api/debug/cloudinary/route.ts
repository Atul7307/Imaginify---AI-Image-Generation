import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    // Simple test - try to get basic account info
    const result = await cloudinary.api.resources({
      type: 'upload',
      max_results: 1
    });

    return NextResponse.json({ 
      success: true, 
      message: "Cloudinary connection successful",
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      resourceCount: result.resources.length
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      hasApiKey: !!process.env.CLOUDINARY_API_KEY,
      hasApiSecret: !!process.env.CLOUDINARY_API_SECRET
    }, { status: 500 });
  }
}
