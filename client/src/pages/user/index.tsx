import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  useMeQuery,
  useUploadUserProfilePictureMutation,
} from "../../generated/graphql";
import CancelIcon from "../../icons/CancelIcon";
import CheckIcon from "../../icons/CheckIcon";
import { useCheckAuth } from "../../utils/useCheckAuth";
import PageNotFound from "../404";

const User = () => {
  const { data: authData, loading: authLoading } = useCheckAuth();

  const { data: meData, loading: meLoading } = useMeQuery();

  const [uploadUserProfilePicture] = useUploadUserProfilePictureMutation();

  const [fileToUpload, setFileToUpload] = useState<File>([] as any);

  const [isUpload, setIsUpload] = useState(false);

  const [imageSrc, setImageSrc] = useState("");

  const router = useRouter();

  const readFile = (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const onFileChange = async (e: any) => {
    const file = e;
    let imageUrl: any = await readFile(file);
    setImageSrc(imageUrl);
  };

  const onDrop = useCallback(([file]) => {
    setFileToUpload(file);
    setIsUpload(true);
    onFileChange(file);
  }, []);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await uploadUserProfilePicture({
      variables: {
        id: authData!.me!.id as string,
        file: fileToUpload,
      },
    });
    router.reload();
  };

  const handleCancel = () => {
    setIsUpload(false);
    setImageSrc(meData?.me?.profilePicture as string);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader ease-linear rounded-full inline border-4 border-t-4 border-gray-200 h-12 w-12 "></div>
      </div>
    );
  }

  if (!authData?.me || (!meLoading && meData?.me?.id !== authData.me.id)) {
    return <PageNotFound />;
  }

  return (
    <div className=" my-10 bg-gray-700  border-white rounded-lg bg-opacity-20 backdrop-filter backdrop-blur border-opacity-10 justify-center border ">
      <div className="flex flex-col items-center my-8">
        <div className="relative h-48 w-48 cursor-pointer">
          <form onSubmit={handleSubmit} className="w-full h-full">
            <div
              {...getRootProps({
                className: "edit-user w-full h-full object-cover rounded-full",
              })}
            >
              <input name="uploadFile" {...getInputProps()} />
              {!meData?.me?.profilePicture ? (
                <div className="flex justify-center items-center w-full border border-dashed rounded-full border-opacity-20 h-full">
                  <h1 className="text-4xl">
                    {meData?.me?.username.charAt(0).toUpperCase()}
                  </h1>
                </div>
              ) : (
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={imageSrc === "" ? meData?.me?.profilePicture : imageSrc}
                  alt=""
                />
              )}
            </div>
            {isUpload ? (
              <div className="flex justify-between w-full my-3 text-white">
                <button
                  onClick={handleCancel}
                  className="flex items-center p-2 bg-red-400 hover:bg-red-400 rounded-md bg-opacity-80"
                >
                   <span className="mr-1 text-sm">Cancel</span><CancelIcon />
                </button>
                <button
                  type="submit"
                  className="flex items-center p-2 bg-green-200 hover:bg-green-400 rounded-md bg-opacity-80"
                >
                  
                  <span className="mr-1 text-sm">Change</span><CheckIcon />
                </button>
              </div>
            ) : (
              ""
            )}
          </form>
        </div>

        <div className="my-10 flex flex-col">
          <h2 className="text-2xl text-center my-4 text-indigo-300">
            {meData?.me?.username}
          </h2>
          <p className="mb-3">Email: {meData?.me?.email}</p>
          <p className="mb-3">Phone number: {meData?.me?.phoneNumber}</p>
        </div>
        <h3 className="text-xl">Courses you have enrolled:</h3>
        <ul className="grid grid-cols-4 gap-6 px-10 mt-10">
          {meData?.me?.coursesEnrolledByUser?.map((course) => (
            <li key={course.id} className="flex flex-col w-full">
              <NextLink href={`/course/${course.id}`}>
                <a className="flex justify-center ">
                  <Image
                    src={course.image.split("/").pop() as string}
                    width={240}
                    height={135}
                    alt={course.courseName}
                  />
                </a>
              </NextLink>
              <div className="flex flex-col px-11 mt-4">
                <a
                  href={`/course/${course.id}`}
                  className="title font-bold text-md mb-3 tracking-wide"
                >
                  {course.courseName}
                </a>
                <p className="text-sm text-gray-400">{`${course.textSnippet}...`}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* <div className="list flex">
          {meData.}
        </div> */}
      </div>
    </div>
  );
};

export default User;
