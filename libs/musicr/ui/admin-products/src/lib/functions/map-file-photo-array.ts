import { Photo } from '@musicr/domain';
import { NzUploadFile } from 'ng-zorro-antd/upload';

export function mapPhotoFileArray(fileList: NzUploadFile[]): Photo[] {
  return fileList.map(file => {
    const mappedFile = file.response
      ? {
          id: file.response.id,
          key: file.response.key,
          url: file.response.url,
        }
      : {
          id: file.uid,
          key: file.name,
          url: file.url,
        };
    return mappedFile;
  });
}
