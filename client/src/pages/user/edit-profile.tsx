import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import {
  UpdateUserInput,
  useMeQuery,
  useUpdateUserMutation,
} from "../../generated/graphql";
import { useCheckAuth } from "../../utils/useCheckAuth";
import { useRouter } from "next/router";
import PageNotFound from "../404";
import Wrapper from "../../components/Wrapper";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";

type IProfileInputs = Omit<UpdateUserInput, "id">;

const schema: yup.SchemaOf<IProfileInputs> = yup.object().shape({
  email: yup.string().required().default(""),
  password: yup.string().notRequired().default(""),
  phoneNumber: yup.string().notRequired().default(""),
});

const EditUserProfile = () => {
  const { data: authData, loading: authLoading } = useCheckAuth();

  const { data: meData, loading: meLoading } = useMeQuery();

  const [fileToUpload, setFileToUpload] = useState<File>([] as any);

  const [updatedUser, { data }] = useUpdateUserMutation();

  const [imageSrc, setImageSrc] = useState(meData?.me?.profilePicture);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IProfileInputs>({
    resolver: yupResolver(schema),
  });

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
    onFileChange(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSubmit = async (values: Omit<UpdateUserInput, "id">) => {
    await updatedUser({
      variables: {
        updateUserInput: { ...values, id: authData!.me!.id },
        file: fileToUpload,
      },
    });
      router.push("/user");
  };

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
    <Wrapper>
      <h2 className="text-4xl text-center my-3">Update user profile</h2>
      <form className="w-2/5" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group flex flex-col py-2">
          <label className="pl-3 text-md" htmlFor="email">
            Email
          </label>
          <input
            defaultValue={meData?.me?.email}
            type="email"
            className="bg-transparent p-3 my-2 border rounded-lg focus:outline-none focus-visible:ring-2"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 ml-3">{errors.email?.message}</p>
          )}
        </div>

        <div className="form-group flex flex-col py-2">
          <label className="pl-3 text-md" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className="bg-transparent p-3 my-2 border rounded-lg focus:outline-none focus-visible:ring-2"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 ml-3">{errors.password?.message}</p>
          )}
        </div>
        <div className="form-group flex flex-col py-2">
          <label className="pl-3 text-md" htmlFor="phoneNumber">
            Phone number
          </label>
          <input
            defaultValue={meData?.me?.phoneNumber}
            className="bg-transparent p-3 my-2 border rounded-lg focus:outline-none focus-visible:ring-2"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 ml-3">{errors.phoneNumber?.message}</p>
          )}
        </div>

        <div className="form-group py-2">
          <label className="pl-3 text-md" htmlFor="uploadFile">
            Upload avatar
          </label>
          <div
            {...getRootProps({
              className: "border border-dashed py-6 px-3 my-2",
            })}
          >
            <input name="uploadFile" {...getInputProps()} />
            <p className="text-center">
              Drag 'n' drop some files here, or click to select files
            </p>
          </div>

          <div className="form-group flex justify-center py-3">
            <img className="w-64 h-34" src={imageSrc} alt="" />
          </div>
        </div>

        <div className="form-group flex justify-center">
          <button
            type="submit"
            className="p-3 mt-4 w-full rounded-lg bg-red-400 hover:bg-red-500"
            disabled={isSubmitting}
          >
            {isSubmitting && isSubmitting ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : (
              <span className="text-xl">Submit</span>
            )}
          </button>
        </div>
        {data?.updatedUser.success ? (
          <div className="form-group  mt-4">
            <Alert message={data?.updatedUser.message as string} />
          </div>
        ) : (
          ""
        )}
      </form>
    </Wrapper>
  );
};

export default EditUserProfile;
