import cloudinary from 'cloudinary';

// Configure Cloudinary (Ensure environment variables are set)
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    // Parse the incoming form data
    const formData = await req.formData();
    console.log([...formData.entries()]);

    // Validate the presence of a file
    if (!formData.has('file')) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
    }

    // Extract the file from form data
    const file = formData.get('file');

    if (!file || typeof file.stream !== 'function') {
      return new Response(JSON.stringify({ error: 'Invalid file' }), { status: 400 });
    }

    // Upload the file stream to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { folder: 'donor' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      // Pipe the file stream to Cloudinary
      file.stream().pipe(uploadStream);
    });

    // Return the secure URL of the uploaded image
    return new Response(JSON.stringify({ url: uploadResponse.secure_url }), { status: 200 });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return new Response(
      JSON.stringify({ error: 'Upload failed', details: error.message }),
      { status: 500 }
    );
  }
}
