import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';


import fs = require('fs');

import path = require('path');

const validMimeType = ['image/png', 'image/jpg', 'Image/jpg'];

export const saveImagesToStorage = (destination) => {
    return {
        storage: diskStorage({
            destination: './uploads/${destination}',
            filename: (req, file, callback) => {
                const fileExtension: string = path.extname(file.originalname);
                const filename: string = uuidv4() + fileExtension;
                callback(null, filename);
            },
        }),
        fileFilter: (req, file, callback) => {
            const allowedMimeTypes = validMimeType;
            allowedMimeTypes.includes(file.mimetype)
                ? callback(null, true)
                : callback(null, false);
        },
    };
};

interface diskStorageOptions {
    /**
     * @param callback Callback to determine the destination path.
     */
    destination?:
        | string
        | ((
            req: Request,
            file: Express.Multer.File,
            callback: (error: Error | null, destination: string) => void,
        ) => void)
        | undefined;
    /**
     * A function that determines the name of the upload file. If nothing
     * is passed, Multer will generate a 32 character pseudorandom hex string
     * with no extension.
     * 
     * @param req The Express 'Request' object.
     * @param file Object containing information about the processed file.
     * @param callback Callback to determine the name of the uploaded file.
     */
    filename?(
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, filename: string) => void,
    ): void;
}

export const removeFile = (fullFilePath: string) => {
    try {
        fs.unlinkSync(fullFilePath);
    } catch (e) {
        console.error(new Date(), e);
    }
};
