import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { auth } from "@/lib/auth";
import { supabaseAdmin, isSupabaseStorageReady } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    // 1. Verify User Session
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
    }

    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    // 2. Validate File Size (Max 5MB)
    const maxFileSize = 5 * 1024 * 1024;
    if (file.size > maxFileSize) {
      return NextResponse.json({ success: false, error: "File size exceeds 5MB limit" }, { status: 400 });
    }

    // 3. Validate MIME Type
    const allowedMimeTypes = [
      "image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif", "image/svg+xml",
      "video/mp4", "video/webm",
      "application/json"
    ];
    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json({ success: false, error: `File type "${file.type}" not allowed` }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Read optional bucket and folder parameters
    const searchParams = request.nextUrl.searchParams;
    const bucket = searchParams.get("bucket") || "mascot-assets";
    const folder = searchParams.get("folder") || "";

    // Make filename unique
    const ext = file.name.split('.').pop() || 'png';
    const uniqueFilename = `media_${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;
    const uploadPath = folder ? `${folder}/${uniqueFilename}` : uniqueFilename;

    // 4. Dynamic upload based on configuration
    if (isSupabaseStorageReady && supabaseAdmin) {
      // Upload to target Supabase Storage Bucket (e.g. mascot-assets or jz-events-assets)
      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from(bucket)
        .upload(uploadPath, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (uploadError) {
        console.error("Supabase Storage Upload Error:", uploadError);
        return NextResponse.json({ success: false, error: uploadError.message }, { status: 500 });
      }

      // Get public URL
      const { data: publicUrlData } = supabaseAdmin.storage
        .from(bucket)
        .getPublicUrl(uploadPath);

      if (!publicUrlData?.publicUrl) {
        return NextResponse.json({ success: false, error: "Failed to generate public storage URL" }, { status: 500 });
      }

      return NextResponse.json({ success: true, url: publicUrlData.publicUrl });
    } else {
      // Fallback: Local filesystem uploads (for local development)
      const uploadDir = folder 
        ? join(process.cwd(), "public", "uploads", folder)
        : join(process.cwd(), "public", "uploads");
      const filepath = join(uploadDir, uniqueFilename);

      // Ensure the directory exists
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (err: any) {
        if (err.code !== 'EEXIST') throw err;
      }

      // Write file to disk
      await writeFile(filepath, buffer);

      // Return the public local URL
      const publicUrl = folder
        ? `/uploads/${folder}/${uniqueFilename}`
        : `/uploads/${uniqueFilename}`;
      return NextResponse.json({ success: true, url: publicUrl });
    }

  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
