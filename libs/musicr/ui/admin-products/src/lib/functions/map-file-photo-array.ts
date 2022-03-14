import { Photo } from '@musicr/domain';
import { NzUploadFile } from 'ng-zorro-antd/upload';

export function mapPhotoFileArray(fileList: NzUploadFile[]): Photo[] {
  return fileList.map(file => {
    const mappedFile = file.response
      ? file.response
      : {
          id: file.uid,
          key: file.name,
          url: file.url,
        };
    return mappedFile;
  });
}
