import * as async from "async";
import * as AWS from "aws-sdk";
import * as originalGm from "gm";
import { IEventRequest, INext } from "lambda-framework";
import * as uuid from "uuid";

const gm = originalGm.subClass({ imageMagick: true });

const s3: AWS.S3 = new AWS.S3();
const MAX_WIDTH  = 100;
const MAX_HEIGHT = 100;

export default function thumbnailsHandler(req: IEventRequest, mainNext: INext): void {
  const eventID = uuid.v4();
  console.log("[" + eventID + "] Reading options from event: ", JSON.stringify(req.event.original));

  const srcBucket = req.event.original.Records[0].s3.bucket.name;
  const srcKey    = req.event.original.Records[0].s3.object.key;
  const dstBucket = srcBucket + "-thumbnails";
  const dstKey    = "thumb-" + srcKey;

  if (srcBucket === dstBucket) {
    throw new Error("[" + eventID + "] Destination bucket must not match source bucket.");
  }

  const typeMatch = srcKey.match(/\.([^.]*)$/);
  if (!typeMatch) {
    throw new Error("[" + eventID + "] Unable to infer image type for key " + srcKey);
  }

  const validImageTypes = ["png", "jpg", "jpeg", "gif"];
  const imageType = typeMatch[1];
  if (validImageTypes.indexOf(imageType.toLowerCase()) < 0) {
    throw new Error("[" + eventID + "] Skipping non-image " + srcKey);
  }

  async.waterfall(
    [
      (next: (err: AWS.AWSError, output?: AWS.S3.GetObjectOutput) => void): void => {
        console.log("[" + eventID + "] Getting S3 object.");

        s3.getObject(
          {
            Bucket : srcBucket,
            Key    : srcKey
          },
          next
        );
      },
      (response: AWS.S3.GetObjectOutput, next: (err: Error, contentType?: string, buffer?: Buffer) => void): void => {
        console.log("[" + eventID + "] Resizing S3 object.");

        const image = gm(response.Body);
        image.size((err: Error, size: { width: number, height: number }): void => {
          if (err) {
            next(err);
          } else {
            const scalingFactor = Math.min(
              MAX_WIDTH / size.width,
              MAX_HEIGHT / size.height
            );
            const width  = scalingFactor * size.width;
            const height = scalingFactor * size.height;

            image
              .resize(width, height)
              .toBuffer(imageType, (err2: Error, buffer: Buffer) => {
                if (err2) {
                  next(err2);
                } else {
                  next(null, response.ContentType, buffer);
                }
              });
            }
        });
      },
      (contentType: string, data: Buffer, next: (err: AWS.AWSError, output: AWS.S3.PutObjectOutput) => void): void => {
        console.log("[" + eventID + "] Uploading S3 object.");

        s3.putObject(
          {
            Bucket      : dstBucket,
            Key         : dstKey,
            Body        : data,
            ContentType : contentType
          },
          next
        );
      }
    ],
    (err) => mainNext(err)
  );
}
