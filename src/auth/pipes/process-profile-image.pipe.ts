import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { writeFile } from 'fs';
import { generateProfilePicturePath, makeDirIfNotExists, rnd } from 'src/helpers/utils';
import Constants from 'src/helpers/utils/constants';


@Injectable()
export class ProcessProfileImagePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const picture = value.profilePicture;
    makeDirIfNotExists(Constants.staticContent.userPicturePath)

    if (!picture){
      value.profilePicture = `data/users/npc${rnd(1,3)}.jpg`
      return value;
    };

    const imageData = picture.split(',')[1];
    const path = generateProfilePicturePath();
    writeFile(path, imageData, 'base64', function (err) {
      console.log(err);
    });

    value.profilePicture = path;
    return value;
  }
}
