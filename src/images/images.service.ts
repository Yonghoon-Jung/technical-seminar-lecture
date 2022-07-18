import * as path from 'path';
import * as AWS from 'aws-sdk';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImagesService {
  private readonly awsS3: AWS.S3;
  public readonly S3_BUCKET_NAME: string;

  constructor(private readonly configService: ConfigService) {
    this.awsS3 = new AWS.S3({
      accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'), // process.env.AWS_S3_ACCESS_KEY
      secretAccessKey: this.configService.get('AWS_S3_SECRET_KEY'),
      region: this.configService.get('AWS_S3_REGION'),
    });
    this.S3_BUCKET_NAME = this.configService.get('AWS_S3_BUCKET_NAME');
  }

  async uploadUserPhotoToS3(
    folder: string,
    file: any,
    userIdx: string,
  ): Promise<string> {
    try {
      const userPhotoUrl: string = `${folder}/${Date.now()}_${path.basename(
        userIdx.slice(0, 10),
      )}`.replace(/ /g, '');

      this.awsS3
        .putObject({
          Bucket: this.S3_BUCKET_NAME,
          Key: userPhotoUrl,
          Body: file.buffer,
          ACL: 'public-read',
          ContentType: file.mimetype,
        })
        .promise();

      return userPhotoUrl;
    } catch (error) {
      throw new BadRequestException(`File upload failed : ${error}`);
    }
  }
}
