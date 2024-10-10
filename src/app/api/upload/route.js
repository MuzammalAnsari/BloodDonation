import cloudinary from 'cloudinary';

export async function POST(req) {
    try {
        // Handle form data
        const formData = await req.formData();

        // Check if the file is present
        if (!formData.has('file')) {
            return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
        }

        // Extract the file from form data
        const file = formData.get('file');

        // Ensure the file is valid
        if (!file || !(file instanceof Blob)) {
            return new Response(JSON.stringify({ error: 'Invalid file' }), { status: 400 });
        }

        // Upload to Cloudinary
        const uploadResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: 'donor' }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }).end(file);
        });

        // Return the URL of the uploaded image
        return new Response(JSON.stringify({ url: uploadResponse.secure_url }), { status: 200 });
    } catch (error) {
        console.error('Upload error:', error);
        return new Response(JSON.stringify({ error: 'Upload failed' }), { status: 500 });
    }
}
