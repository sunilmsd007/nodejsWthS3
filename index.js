const AWS = require('aws-sdk');
var fs = require('fs');
require('dotenv').config()

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const BUCKET_NAME = 'my-awss3-bucket3'

const bucketParams = {
    Bucket: BUCKET_NAME
};

//---> to list out all the buckets in account
const bucketList= ()=>{
    s3.listBuckets(function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Bucket list", data.Buckets);
        }
    });
}
bucketList();

//---> to create a bucket
const bucketCreation=()=>{
    s3.createBucket(bucketParams, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Bucket created Successfully", data.Location);
        }
    });
}
//bucketCreation();

//---> to upload files into bucket
const uploadFile = (filename)=>{
    const fileContent = fs.readFileSync(filename);

    const uploadParams = {
        Bucket: 'my-awss3-bucket3',
        Key: 'mys3text.txt',
        Body: fileContent,
    }

    s3.upload(uploadParams, function(err, data) {
        if (err) {
            console.log("Error", err);
        } 
        if (data) {
            console.log("File Uploaded Successfully", data.Location);
        }
    });
}
var localfile = 'C:/Users/ASUS/Desktop/mytext.txt'
//uploadFile(localfile)

//---> to list the objects in bucket
const objectList= ()=>{
    s3.listObjects(bucketParams, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("List of the objects", data);
        }
    });
}
//objectList();

//---> to delete the object/file from the bucket
const deleteFile = (objectKey)=>{
    const deleteParams = {
        Bucket: BUCKET_NAME,
        Key: objectKey,
    }

    s3.deleteObject(deleteParams, function(err, data) {
        if (err) {
            console.log("Error", err);
        } 
        if (data) {
            console.log("File Deleted Successfully", data);
        }
    });
}
//deleteFile('mys3text.txt');

//---> to delete a bucket
const bucketDeletion=()=>{
    s3.deleteBucket(bucketParams, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Bucket deleted Successfully", data);
        }
    });
}
//bucketDeletion();