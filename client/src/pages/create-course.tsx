import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import Wrapper from "../components/Wrapper";
import {
  CreateCourseInput,
  useCourseCategoryQuery,
  useCreateCourseMutation,
} from "../generated/graphql";
import Spinner from "../components/Spinner";
import { useCheckAuth } from "../utils/useCheckAuth";
import PageNotFound from "./404";
import { useCallback, useState } from "react";
import Alert from "../components/Alert";
import { useRouter } from "next/router";

const schema: yup.SchemaOf<CreateCourseInput> = yup.object().shape({
  courseName: yup.string().required().default(""),
  courseCode: yup.string().required().default(""),
  description: yup.string().required().default(""),
  categoryId: yup.string().required().default(""),
});


const CreateCourse = () => {
  
  const { data: authData, loading: authLoading } = useCheckAuth();

  const [fileToUpload, setFileToUpload] = useState<File>([] as any);

  const [createCourse, { data }] = useCreateCourseMutation();

  const { data: dataCategory } = useCourseCategoryQuery();

  const [imageSrc, setImageSrc] = useState("");

  const route = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateCourseInput>({
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
    console.log([file]);
    console.log("single file", file);
    console.log("filename", file.name);
    setFileToUpload(file);
    console.log(file.name);
    onFileChange(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSubmit = async (values: CreateCourseInput) => {
    await createCourse({
      variables: {
        createCourseInput: values,
        file: fileToUpload,
      },
      update(cache, { data }) {
        cache.modify({
          fields: {
            courses(existing) {
              if (data?.createCourse.success && data.createCourse.course) {
                const newCourseRef = cache.identify(data.createCourse.course);
                console.log("New course ref ", newCourseRef);
                const newCourseAfterCreation = {
                  ...existing,
                  totalCount: existing.totalCount + 1,
                  paginatedCourses: [
                    { __ref: newCourseRef },
                    ...existing.paginatedCourses,
                  ],
                };
                console.log("After creation: ", newCourseAfterCreation);

                return newCourseAfterCreation;
              }
            },
          },
        });
      },
    });
    route.push("/courses");
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader ease-linear rounded-full inline border-4 border-t-4 border-gray-200 h-12 w-12 "></div>
      </div>
    );
  }

  if (authData?.me && authData?.me?.roleId === "student") {
    return <PageNotFound />;
  }

  return (
    <Wrapper>
      
      <h2 className="text-4xl text-center my-3">Create course</h2>
      <form className="w-1/3" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group flex flex-col py-2">
          <label className="pl-3 text-md" htmlFor="courseName">
            Course name
          </label>
          <input
            className="bg-transparent p-3 my-2 border rounded-lg focus:outline-none focus-visible:ring-2"
            {...register("courseName")}
          />
          {errors.courseName && (
            <p className="text-red-500 ml-3">{errors.courseName?.message}</p>
          )}
        </div>
        <div className="form-group flex flex-col py-2">
          <label className="pl-3 text-md" htmlFor="courseCode">
            Course code
          </label>
          <input
            type="text"
            className="bg-transparent p-3 my-2 border rounded-lg focus:outline-none focus-visible:ring-2"
            {...register("courseCode")}
          />
          {errors.courseCode && (
            <p className="text-red-500 ml-3">{errors.courseCode?.message}</p>
          )}
        </div>
        <div className="form-group flex flex-col py-2">
          <label className="pl-3 text-md" htmlFor="description">
            Description
          </label>
          <textarea
            className="bg-transparent p-3 my-2 border rounded-lg focus:outline-none focus-visible:ring-2"
            {...register("description")}
          />
          {errors.courseCode && (
            <p className="text-red-500 ml-3">{errors.courseCode?.message}</p>
          )}
        </div>
        <div className="form-group flex flex-col py-2">
          <label className="pl-3 text-md" htmlFor="categoryId">
            Category
          </label>
          <select
            id="categoryId"
            className="bg-transparent p-3 my-2 border rounded-lg focus:outline-none focus-visible:ring-2"
            {...register("categoryId")}
          >
            {dataCategory?.categories?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.categoryName}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-red-500 ml-3">{errors.categoryId?.message}</p>
          )}
        </div>
        <div className="form-group py-2">
          <label className="pl-3 text-md" htmlFor="uploadFile">
            Upload image
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

          <div className="flex justify-center py-3">
            <img src={imageSrc} alt="" />
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
              <span className="cursor-pointer text-xl">Submit</span>
            )}
          </button>
        </div>
        {data?.createCourse.success ? (
          <div className="form-group  mt-4">
            <Alert message={data?.createCourse.message as string} />
          </div>
        ) : (
          ""
        )}
      </form>
    </Wrapper>
  );
};

export default CreateCourse;
