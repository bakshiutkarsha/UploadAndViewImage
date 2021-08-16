import { AWS_S3 } from './constants';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: AWS_S3.ACCESS_KEY_ID,
  secretAccessKey: AWS_S3.SECRET_ACCESS_KEY
})

// Initialise new S3 Bucket
const s3Bucket = new AWS.S3({
  params: { Bucket: AWS_S3.BUCKET},
  region: AWS_S3.REGION,
});

export const uploadFile = async(file) => {
    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket:  AWS_S3.BUCKET,
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