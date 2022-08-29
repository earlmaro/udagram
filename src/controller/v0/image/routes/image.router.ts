import { Router, Request, Response } from 'express';
import * as AWS from '../../../../aws';
import { filterImageFromURL, deleteLocalFiles } from '../../../../util/util';


const router: Router = Router();

// Get a signed url to get an image in the bucket and filter image
router.get('/filter-bucket-image',
    // requireAuth, 
    async (req: Request, res: Response) => {
        let { image }: { image: string } = req.query
        if (!image) {
            return res.status(400).send({ message: 'Provide the name of the image you wish to filter and assign it to "image" as key in your query string' });
        } 
        let filteredImage : string;
        const url: string = AWS.getGetSignedUrl(image);
        filteredImage = await filterImageFromURL(url);
        res.sendFile(filteredImage);
        await deleteLocalFiles([filteredImage])
    });

// Get any public image and filter
router.get('/filter-public-image',
    // requireAuth, 
    async (req: Request, res: Response) => {
        let { image_url }: { image_url: string } = req.query
        if (!image_url) {
            return res.status(400).send({ message: 'Provide the url of the image you wish to filter' });
        }
        let filteredImage: string;
        // const url: string = AWS.getGetSignedUrl(image);
        filteredImage = await filterImageFromURL(image_url);
        res.sendFile(filteredImage);
        await deleteLocalFiles([filteredImage])
    });


export const ImageRouter: Router = router;