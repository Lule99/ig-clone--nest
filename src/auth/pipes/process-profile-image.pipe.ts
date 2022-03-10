import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { writeFile } from 'fs';
import { generateProfilePicturePath } from 'src/helpers/utils/generators';


@Injectable()
export class ProcessProfileImagePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const picture = value.profilePicture;
    if (!picture) throw new BadRequestException('No image recieved');

    const imageData = picture.split(',')[1];
    const path = generateProfilePicturePath();
    writeFile(path, imageData, 'base64', function (err) {
      console.log(err);
    });

    value.profilePicture = path;
    return value;
  }
}
