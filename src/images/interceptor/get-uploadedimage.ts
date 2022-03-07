import { FileInterceptor } from "@nestjs/platform-express";

export class getUploadedImage extends FileInterceptor('picture', {dest: './static'})
{
    //TODO
    constructor() {
        super()
    }
}