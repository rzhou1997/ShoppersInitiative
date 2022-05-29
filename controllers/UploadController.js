const cloudinary = require('cloudinary');
const fs = require('fs');

// we will upload image on cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const uploadCtrl = {
    uploadData: async (req, res) => {
        try {
            //check if files were uploaded
            if(!req.files || Object.keys(req.files).length === 0)
                return res.status(400).json({msg: 'No files were uploaded.'})
            //checking file size is too big or not
            const file = req.files.file;
            if(file.size > 1024*1024) {
                removeTmp(file.tempFilePath)
                return res.status(400).json({msg: "Size too large"})
            }
            //checking if file format is correct or not
            if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
                removeTmp(file.tempFilePath)
                return res.status(400).json({msg: "File format is incorrect."})
            }
            //uploading file into folder
            cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test"}, async(err, result)=>{
                if(err) throw err;
    
                removeTmp(file.tempFilePath)
    
                res.json({public_id: result.public_id, url: result.secure_url})
            })
    
    
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteData: async(req, res) => {
        try {
            //taking the id of the photo
            const {public_id} = req.body;
            //checking if images were selected or not
            if(!public_id) return res.status(400).json({msg: 'No images Selected'})
            //deleting the photo
            cloudinary.v2.uploader.destroy(public_id, async(err, result) =>{
                if(err) throw err;
    
                res.json({msg: "Deleted Image"})
            })
    
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const removeTmp = (path) =>{
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}

module.exports = uploadCtrl;