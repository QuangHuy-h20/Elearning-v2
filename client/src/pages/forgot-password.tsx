import Wrapper from "../components/Wrapper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Spinner from "../components/Spinner";
import {
  ForgotPasswordInput,
  useForgotPasswordMutation,
} from "../generated/graphql";
import { useCheckAuth } from "../utils/useCheckAuth";
import BackArrowIcon from "../icons/BackArrowIcon";
import NextLink from "next/link";


const schema: yup.SchemaOf<ForgotPasswordInput> = yup.object().shape({
  email: yup.string().required("Email is required").email().default(""),
});

const ForgotPassword = () => {
  const { data: authData, loading: authLoading } = useCheckAuth();

  const [forgotPassword, { loading, data }] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: ForgotPasswordInput) => {
    await forgotPassword({ variables: { forgotPasswordInput: values } });
  };

  if (authLoading || (!authLoading && authData?.me)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader ease-linear rounded-full inline border-4 border-t-4 border-gray-200 h-12 w-12 "></div>
      </div>
    );
  } else {
    return (
      <Wrapper>
        <h2 className="text-3xl text-center my-3">Forgot password</h2>
        {!loading && data ? (
          <h2 className="text-xl text-center text-red-400 mt-3">
            Please check your inbox to reset password
          </h2>
        ) : (
          <>
            <form className="w-2/5" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group flex flex-col py-2">
                <label className="pl-3 text-md" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  className="bg-transparent p-3 my-2 border rounded-lg focus:outline-none focus-visible:ring-2"
                  {...register("email")}
                  placeholder="Enter email"
                />
                {errors.email && (
                  <p className="text-red-500 ml-3">{errors.email?.message}</p>
                )}
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
            </form>
            <div className="flex justify-start ml-2 my-6">
            <NextLink href="/login">
              <a className= "flex">
                <BackArrowIcon /> <span className="ml-1">Back to Login</span>
              </a>
            </NextLink>
          </div>
          </>
        )}
      </Wrapper>
    );
  }
};

export default ForgotPassword;
