import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { generatePostPath, makeDirIfNotExists } from 'src/helpers/utils/generators';
import { writeFile } from 'fs'
import Constants from 'src/helpers/utils/constants';

@Injectable()
export class ProcessPostImagePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const picture = value.picture;
    if(!picture)
      throw new BadRequestException('No image recieved')
    
    const imageData = picture.split(',')[1]
    const path = generatePostPath();
    makeDirIfNotExists(Constants.staticContent.postPicturePath)
    writeFile(path, imageData, 'base64', function(err) {
      console.log(err);
    })

    value.picture = path;
    return value;
  }
}
