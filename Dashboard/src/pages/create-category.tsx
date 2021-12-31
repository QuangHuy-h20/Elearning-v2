import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {
  CreateCourseCategoryInput,
  useCreateCategoryMutation,
} from "../generated/graphql";
import { useRouter } from "next/router";
import { useCheckAuth } from "../utils/useCheckAuth";
import PageNotFound from "./404";
import Wrapper from "../components/Wrapper";
import Spinner from "../components/Spinner";

const schema: yup.SchemaOf<CreateCourseCategoryInput> = yup.object().shape({
  id: yup.string().required().default(""),
  categoryName: yup.string().required().default(""),
});

const CreateCategory = () => {
  const [createCategory] = useCreateCategoryMutation();
  const { data: authData, loading: authLoading } = useCheckAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateCourseCategoryInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: CreateCourseCategoryInput) => {
    await createCategory({
      variables: {
        createCourseCategoryInput: values,
      },
    });
    router.push("/categories");
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
      <h2 className="text-4xl text-center my-3">Create category</h2>
      <form className="w-1/3" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group flex flex-col py-2">
          <label className="pl-3 text-md" htmlFor="id">
            Category ID
          </label>
          <input
            type="text"
            className="p-3 my-2 focus:ring-2 border border-gray-300 focus:outline-none"
            {...register("id")}
          />
          {errors.id && (
            <p className="text-red-500 ml-3">{errors.id?.message}</p>
          )}
        </div>
        <div className="form-group flex flex-col py-2">
          <label className="pl-3 text-md" htmlFor="categoryName">
            Category name
          </label>
          <input
            className=" p-3 my-2 focus:ring-2 border border-gray-300 focus:outline-none"
            {...register("categoryName")}
          />
          {errors.categoryName && (
            <p className="text-red-500 ml-3">{errors.categoryName?.message}</p>
          )}
        </div>

        <div className="form-group flex justify-center">
          <button
            type="submit"
            className="p-3 mt-4 w-full rounded-lg bg-indigo-400 hover:bg-indigo-500"
            disabled={isSubmitting}
          >
            {isSubmitting && isSubmitting ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : (
              <span className="cursor-pointer text-xl text-white">Submit</span>
            )}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default CreateCategory;
