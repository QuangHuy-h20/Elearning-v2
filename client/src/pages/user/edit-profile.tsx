import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
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
  email: yup.string().email().required().default(""),
  password: yup
    .string()
    .notRequired()
    .default("")
    .min(5, "password must be greater than 5 characters")
    .max(16, "password must be smaller than 16 characters"),
  phoneNumber: yup.string().notRequired().default(""),
});

const EditUserProfile = () => {
  const { data: authData, loading: authLoading } = useCheckAuth();

  const { data: meData, loading: meLoading } = useMeQuery();

  const [updatedUser, { data }] = useUpdateUserMutation();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IProfileInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: IProfileInputs) => {
    await updatedUser({
      variables: {
        updateUserInput: { ...values, id: authData!.me!.id },
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
      <form className="w-1/3" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group flex flex-col py-2">
          <label className="pl-3 text-md" htmlFor="email">
            Email
          </label>
          <input
            defaultValue={meData?.me?.email}
            type="email"
            className="bg-gray-600 bg-opacity-30 rounded-md p-3 my-2 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 focus:outline-none"
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
            className="bg-gray-600 bg-opacity-30 rounded-md p-3 my-2 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 focus:outline-none"
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
            className="bg-gray-600 bg-opacity-30 rounded-md p-3 my-2 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 focus:outline-none"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 ml-3">{errors.phoneNumber?.message}</p>
          )}
        </div>
        <div className="form-group flex justify-center mt-6">
          <button
            type="submit"
            className="p-3 w-1/2 rounded-lg bg-red-400 hover:bg-red-500"
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
