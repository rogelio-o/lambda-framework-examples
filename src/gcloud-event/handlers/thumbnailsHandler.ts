import * as Storage from "@google-cloud/storage";
import * as async from "async";
import * as originalGm from "gm";
import { IEventRequest, INext } from "lambda-framework";
import * as uuid from "uuid";

const gm = originalGm.subClass({ imageMagick: true });

const storage: Storage = new Storage({ projectId: "test-lambda-framework" });
const MAX_WIDTH  = 100;
const MAX_HEIGHT = 100;

const uploadFile = (bucketName: string, fileName: string, contentType: string, buffer: Buffer): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    const stream = file.createWriteStream({
      metadata: { contentType }
    });

    stream.on("error", (err) => reject(err));
    stream.on("finish", () => resolve());

    stream.end(buffer);
  });
};

export default function thumbnailsHandler(req: IEventRequest, mainNext: INext): void {
  const data = req.event.original.data;
  const eventID = uuid.v4();
  console.log("[" + eventID + "] Reading options from event: ", JSON.stringify(req.event.original));

  const srcBucket = data.bucket;
  const srcKey    = data.name;
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
      (next: (err: Error, output?: Buffer) => void): void => {
        console.log("[" + eventID + "] Getting Cloud Storage object.");

        storage
          .bucket(data.bucket)
          .file(srcKey)
          .download()
          .then((file) => next(null, file[0]))
          .catch((err) => next(err));
      },
      (response: Buffer, next: (err: Error, contentType?: string, buffer?: Buffer) => void): void => {
        console.log("[" + eventID + "] Resizing Cloud Storage object.");

        const image = gm(response);
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
                  next(null, data.contentType, buffer);
                }
              });
          }
        });
      },
      (contentType: string, imageData: Buffer, next: (err: Error) => void): void => {
        console.log("[" + eventID + "] Uploading Cloud Storage object.");

        uploadFile(dstBucket, dstKey, contentType, imageData)
          .then(() => next(null))
          .catch((err) => next(err));
      }
    ],
    (err) => mainNext(err)
  );
}
