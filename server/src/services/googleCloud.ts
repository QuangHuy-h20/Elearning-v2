import path from "path";
import { Storage } from "@google-cloud/storage";

export const gc = new Storage({
  keyFilename: path.join(
    __dirname,
    "../../images/western-emitter-326400-70dc060706b0.json"
  ),
  projectId: "western-emitter-326400",
});

// async function disableUniformBucketLevelAccess() {
//   // Disables uniform bucket-level access for the bucket
//   await uploadFileBucket.setMetadata({
//     iamConfiguration: {
//       uniformBucketLevelAccess: {
//         enabled: false,
//       },
//     },
//   });
// }
// disableUniformBucketLevelAccess().catch(console.error);

// async function setPublicAccessPreventionUnspecified() {
//   // Sets public access prevention to 'unspecified' for the bucket
//   await uploadFileBucket.setMetadata({
//     iamConfiguration: {
//       publicAccessPrevention: "unspecified",
//     },
//   });
// }

// setPublicAccessPreventionUnspecified();
