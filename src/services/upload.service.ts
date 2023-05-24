'use strict'

import cloudinary from '~/configs/config.cloudinary'
import streamifier from 'streamifier'

class UploadService {
    static upload = async (req: any) => {
        const streamUpload = (req: any) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result)
                    } else {
                        reject(error)
                    }
                })

                streamifier.createReadStream(req.file.buffer).pipe(stream)
            })
        }

        const result: any = await streamUpload(req)
        console.log({
            result
        })
        return {
            url: result.secure_url,
            id: result.asset_id
        }
    }
}

export default UploadService
