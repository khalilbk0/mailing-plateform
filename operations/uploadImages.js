const path = require('path');
const uuid = require('uuid')
const uploadFile = async (req, res) => {
    try {
        if (!req.files) {
            res.status(500).send({
                status: false,
                message: 'No file uploaded'
            });
        
        } else {
        
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;
            if(avatar.length > 1) {
                return res.status(400).send({
                    status:false ,
                    message:'Only one image!'
                })
            }
            const uniqueId = uuid.v4();
            if (avatar.mimetype !== 'image/png' && avatar.mimetype !== 'image/jpg' && avatar.mimetype !== 'image/jpeg') {
               return res.status(400).send({
                    status: false,
                    message: 'File type not supported. Only PNG and JPEG files are allowed.'
                });  }  
            //Get the original file extension using the path module
            const extension = path.extname(avatar.name);

            //Append the unique ID and the original extension to the file name
            const name = `${uniqueId}${extension}`;

            //Use the mv() method to place the file in the upload directory (i.e. "uploads")
            avatar.mv('./uploads/' + name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
        console.log(err)
    }
}

module.exports = {uploadFile};
