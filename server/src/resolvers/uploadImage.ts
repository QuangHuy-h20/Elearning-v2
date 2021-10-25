import { Resolver, Mutation, Arg } from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
// import { createWriteStream } from "fs";
import { Storage } from "@google-cloud/storage";
import path from "path";

const gc = new Storage({
  keyFilename: path.join(
    __dirname,
    "../../images/western-emitter-326400-70dc060706b0.json"
  ),
  projectId: "western-emitter-326400",
});

gc.getBuckets().then((x) => console.log(x));

const uploadFileBucket = gc.bucket("upload-image-elearning");

// '{"query":"mutation UploadImage($file: Upload!) {\n singleUpload(file: $file)\n}"}'

@Resolver()
export class UploadImageResolver {

  @Mutation(() => Boolean)
  async singleUpload(
    @Arg("file", () => GraphQLUpload)
    { createReadStream, filename }: FileUpload
  ): Promise<Boolean> {
    new Promise(async (reject) =>
      createReadStream()
        .pipe(
          uploadFileBucket.file(filename).createWriteStream({
            resumable: false,
            gzip: true,
          })
        )
        .on("finish", () =>
          uploadFileBucket
            .file(filename)
            .makePublic()
            .then((e) => {
              console.log(e[0].object);
            })
        )
        .on("error", () => reject(false))
    );
    return true;
  }
}
