import { Injectable } from '@nestjs/common';

@Injectable()
export class ImagesService {
  constructor() {}

  uploadImage(imageb64: string, entityId: number, entityType: string) : string{
    
    const imageData = imageb64.split(',')[1]
    require("fs").writeFile("out.png", imageData, 'base64', function(err) {
      console.log(err);
    })

      return 'success Image data'
  }
}
