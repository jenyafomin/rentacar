import { S3Client } from "@aws-sdk/client-s3";

const validateEnv = () => {
    if (!process.env.AWS_REGION) throw new Error("AWS_REGION is not defined");
    if (!process.env.AWS_ACCESS_KEY_ID) throw new Error("AWS_ACCESS_KEY_ID is not defined");
    if (!process.env.AWS_SECRET_ACCESS_KEY) throw new Error("AWS_SECRET_ACCESS_KEY is not defined");
  };
  
  try {
    validateEnv();
  } catch (error) {
    console.error("S3 Client configuration error:", error);
    process.exit(1);
  }

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    forcePathStyle: true,
});

console.log({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID?.slice(0, 5),
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY?.slice(0, 5),
})

export { s3Client };