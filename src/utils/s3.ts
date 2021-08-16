import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY
})

// Initialise new S3 Bucket
const s3Bucket = new AWS.S3({
  
  params: { Bucket: process.env.NEXT_PUBLIC_BUCKET},
  region: process.env.NEXT_PUBLIC_REGION,
});

export const uploadFile = async(file) => {
  console.log(process.env.NEXT_PUBLIC_BUCKET);
    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket:  process.env.NEXT_PUBLIC_BUCKET,
        Key: file.name
    };

    // Put new Object(in our case image) inside bucket
    const putObjectPromise = s3Bucket.putObject(params).promise();
    return putObjectPromise.then(data => {
      console.log('Success');
    }).catch(function(err) {
      console.log(err);
    });
}