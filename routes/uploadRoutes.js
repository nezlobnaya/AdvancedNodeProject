const AWS = require('aws-sdk')
const requireLogin = require('../middlewares/requireLogin')
const keys = require('../config/keys')
const { v1: uuidv1 } = require('uuid');

const s3 = new AWS.S3({
     accessKeyId: keys.accessKeyId,
     secretAccessKey: keys.secretAccessKey,
     region: keys.region
})

module.exports = app => {
    app.get('/api/upload', requireLogin, (req, res) => {
        const key = `${req.user.id}/${uuidv1()}.jpeg`

        s3.getSignedUrl('putObject', 
        {
            Bucket: 'my-bloggg-bucket-123',
            ContentType: 'image/jpeg',
            Key: key
        }, 
        (err, url) => res.send({ key, url }))
    })
}