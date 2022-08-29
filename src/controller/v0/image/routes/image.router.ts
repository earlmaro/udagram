import { Router, Request, Response } from 'express';
import * as AWS from '../../../../aws';
import { filterImageFromURL, deleteLocalFiles } from '../../../../util/util';


const router: Router = Router();

// Get a signed url to get an image in the bucket and filter image
router.get('/filteredimage',
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


// Get a signed url to put a new item in the bucket
router.get('/put-signed-url/:fileName', 
    // requireAuth, 
    async (req: Request, res: Response) => {
    let { fileName } = req.params;
    const url = AWS.getPutSignedUrl(fileName);
    res.status(201).send({url: url});
    });
router.get('/', async (req: Request, res: Response) => {
    res.send(`image`);
});

export const ImageRouter: Router = router;