import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Wrapper from "../components/Wrapper";
import Spinner from "../components/Spinner";
import {
  MeDocument,
  MeQuery,
  RegisterInput,
  useRegisterMutation,
} from "../generated/graphql";
import { useRouter } from "next/router";
import { useCheckAuth } from "../utils/useCheckAuth";
import Link from "next/link";

const schema: yup.SchemaOf<RegisterInput> = yup.object().shape({
  username: yup.string().required("Username is required").default(""),
  password: yup.string().required("Password is required").default(""),
  email: yup.string().required("Email is required").default(""),
});
type Field = "username" | "password" | "email";

const Register = () => {
  const [registerUser] = useRegisterMutation();

  const router = useRouter();

  const { data: authData, loading: authLoading } = useCheckAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: RegisterInput) => {
    const response = await registerUser({
      variables: {
        registerInput: values,
      },
      update(cache, { data }) {
        if (data?.register.message) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: { me: data.register.user },
          });
        }
      },
    });

    const registerFieldErrors = response.data?.register.errors;
    if (registerFieldErrors) {
      registerFieldErrors.map(({ field, message }) => setError(field as Field, { message }))
    } else if (response.data?.register.user) {
      router.push("/");
    }
  };

  return (
    <>
      {authLoading || (!authLoading && authData?.me) ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="loader ease-linear rounded-full inline border-4 border-t-4 border-gray-200 h-12 w-12 "></div>
        </div>
      ) : (
        <Wrapper>
          <h2 className="text-4xl text-center my-3">Register</h2>
          <form className="w-2/5" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group flex flex-col py-2">
              <label className="pl-3 text-md" htmlFor="username">
                Username
              </label>
              <input
                className="bg-transparent p-3 my-2 border rounded-lg focus:outline-none focus-visible:ring-2"
                {...register("username")}
                placeholder="Enter username"
              />
              {errors.username && (
                <p className="text-red-500 ml-3">{errors.username?.message}</p>
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
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="text-red-500 ml-3">{errors.password?.message}</p>
              )}
            </div>
            <div className="form-group flex flex-col py-2">
              <label className="pl-3 text-md" htmlFor="email">
                Email
              </label>
              <input
                className="bg-transparent p-3 my-2 border rounded-lg focus:outline-none focus-visible:ring-2"
                {...register("email")}
                placeholder="Ex: dev@gmail.com"
              />
              {errors.email && (
                <p className="text-red-500 ml-3">{errors.email?.message}</p>
              )}
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="p-3 mt-6 w-full rounded-lg bg-red-400 hover:bg-red-500"
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
            <div className="flex flex-col justify-center items-center mt-4">
              <span className="text-gray-400">or</span>
              <Link href="/login">
                <a className="text-blue-400 mt-3">Already have an account?</a>
              </Link>
            </div>
          </form>
        </Wrapper>
      )}
    </>
  );
};

export default Register;
