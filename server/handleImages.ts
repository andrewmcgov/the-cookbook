import * as Koa from 'koa';
const cloudinary = require('cloudinary').v2;
import * as imagemin from 'imagemin';
import * as imageminMozjpeg from 'imagemin-mozjpeg';
import * as fs from 'fs';

// Cloudinary docs: https://cloudinary.com/documentation/node_integration
// Cloudinary reads the CLOUDINARY_URL env variable

export async function saveImage(ctx: Koa.ParameterizedContext) {
  // If there is no file for some reason, respond with an error
  const imageFile = ctx.request.files.imageFile;
  if (!imageFile) {
    ctx.status = 400;
    ctx.body = {
      errorMessage: 'No image file attached to request!'
    };
  } else {
    // Compress the massive iphone image, saves it to a file in
    // server_build/server/images
    const compressedImage = await imagemin(
      [imageFile.path],
      './server_build/server/images',
      {
        plugins: [imageminMozjpeg({ quality: 65 })]
      }
    );

    const compressedImagePath = compressedImage[0].path;

    if (!compressedImagePath) {
      ctx.status = 400;
      ctx.body = {
        errorMessage: 'Error compressing image, please try again!'
      };
    }

    // Upload the image to cloudinary
    const image = await cloudinary.uploader.upload(compressedImagePath, {
      eager: [{ width: 500 }, { width: 1024 }, { width: 2048 }]
    });

    // Delete the image from the filesystem
    fs.unlinkSync(compressedImagePath);

    const [small, medium, large] = image.eager;

    // console.log(image);
    // If something went wrong with cloudinary, respond with an error
    if (!image.url) {
      ctx.status = 400;
      ctx.body = {
        errorMessage: 'Error saving the image, please try again!'
      };
    }

    ctx.body = {
      image: {
        small: small.secure_url,
        medium: medium.secure_url,
        large: large.secure_url
      }
    };
  }
}
