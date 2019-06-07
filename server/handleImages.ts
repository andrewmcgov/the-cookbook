import * as Koa from 'koa';
var cloudinary = require('cloudinary').v2;

// Cloudinary docs: https://cloudinary.com/documentation/node_integration
// Cloudinary reads the CLOUDINARY_URL env variable

export async function saveImage(ctx: Koa.ParameterizedContext) {
  // If there is no file for some reason, respond with an error
  if (!ctx.request.files.imageFile) {
    ctx.status = 400;
    ctx.body = {
      errorMessage: 'No image file attached to request!'
    };
  } else {
    // Cloudinary only wants the image file path
    const imageFile = ctx.request.files.imageFile.path;
    // Upload the image to cloudinary
    const image = await cloudinary.uploader.upload(imageFile);

    // If something went wrong with cloudinary, respond with an error
    if (!image.url) {
      console.log(image);
      ctx.status = 400;
      ctx.body = {
        errorMessage: 'Error saving the image, please try again!'
      };
    }

    ctx.body = { image: image.url };
  }
}
