import { ServiceUnavailableException } from '@nestjs/common';
import Constants from 'src/helpers/utils/constants';
import { existsSync, mkdirSync } from 'fs';

export const generateStringHash = (n: number) => {
  let res = '';
  for (let i = 0; i < n; i++) {
    const random = Math.floor(Math.random() * 25);
    res += String.fromCharCode(97 + random);
  }
  return res;
};

export const checkIfFileExists = (path: string): boolean => {
  return existsSync(path);
};

export const generatePostPath = (): string => {
  for (let i = 0; i < 1000; i++) {
    let hash = generateStringHash(15);
    let path = Constants.staticContent.postPicturePath + `${hash}.jpg`;
    if (!checkIfFileExists(path)) return path;
  }
  throw new ServiceUnavailableException('Error generating image path...');
};

export const generateProfilePicturePath = (): string => {
  for (let i = 0; i < 1000; i++) {
    let hash = generateStringHash(15);
    let path = Constants.staticContent.userPicturePath + `${hash}.jpg`;
    if (!checkIfFileExists(path)) return path;
  }
  throw new ServiceUnavailableException('Error generating image path...');
};

export const makeDirIfNotExists = (dir: string): void => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
};

export const rnd = (min: number, max: number) : number => { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}