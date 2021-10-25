import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import {
  UpdateCourseInput,
  useCourseCategoryQuery,
  useCourseQuery,
  useMeQuery,
  useUpdateCourseMutation,
} from "../../../generated/graphql";
import PageNotFound from "../../404";
import Wrapper from "../../../components/Wrapper";
import Spinner from "../../../components/Spinner";
import Alert from "../../../components/Alert";

type IUpdateCourseInputProps = Omit<UpdateCourseInput, "id">;

const schema: yup.SchemaOf<IUpdateCourseInputProps> = yup.object().shape({
  courseName: yup.string().required().default(""),
  courseCode: yup.string().required().default(""),
  description: yup.string().required().default(""),
  categoryId: yup.string().required().default(""),
});

const UpdateCourse = () => {
  const router = useRouter();
  const courseId = router.query.id as string;
  const { data: meData, loading: meLoading } = useMeQuery();

  const { data: courseData, loading: courseLoading } = useCourseQuery({
    variables: { id: courseId },
  });

  const { data: dataCategory } = useCourseCategoryQuery();

  const [fileToUpload, setFileToUpload] = useState<File>([] as any);

  const [updateCourse, { data }] = useUpdateCourseMutation();

  const [imageSrc, setImageSrc] = useState(courseData?.course?.image);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUpdateCourseInputProps>({
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

  const onSubmit = async (values: IUpdateCourseInputProps) => {
    await updateCourse({
      variables: {
        updateCourseInput: { ...values, id: courseId },
        file: fileToUpload,
      },
    });
    router.push("/courses");
  };

  if (meLoading || courseLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader ease-linear rounded-full inline border-4 border-t-4 border-gray-200 h-12 w-12 "></div>
      </div>
    );
  }

  if (
    !meLoading &&
    !courseLoading &&
    meData?.me?.id !== courseData?.course?.userId.toString()
  ) {
    return <PageNotFound />;
  }

  return (
    <Wrapper>
      <h2 className="text-4xl text-center my-3">Update user profile</h2>
      <form className="w-2/5" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group flex flex-col py-2">
          <label className="pl-3 text-md" htmlFor="courseName">
            Course name
          </label>
          <input
            defaultValue={courseData?.course?.courseName}
            type="text"
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
            defaultValue={courseData?.course?.courseCode}
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
            defaultValue={courseData?.course?.description}
            className="bg-transparent p-3 my-2 border rounded-lg focus:outline-none focus-visible:ring-2"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 ml-3">{errors.description?.message}</p>
          )}
        </div>

        <div className="form-group flex flex-col py-2">
          <label className="pl-3 text-md" htmlFor="categoryId">
            Category
          </label>
          <select
            id="categoryId"
            defaultValue={courseData?.course?.categoryId}
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
        {data?.updateCourse.success ? (
          <div className="form-group  mt-4">
            <Alert message={data?.updateCourse.message as string} />
          </div>
        ) : (
          ""
        )}
      </form>
    </Wrapper>
  );
};

export default UpdateCourse;
