
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Spinner from "../components/Spinner";
import {
  LoginInput,
  MeDocument,
  MeQuery,
  useLoginMutation
} from "../generated/graphql";
import { useCheckAuth } from "../utils/useCheckAuth";
import Wrapper from '../components/Wrapper';


const schema: yup.SchemaOf<LoginInput> = yup.object().shape({
  usernameOrEmail: yup
    .string()
    .required("Username or email is required")
    .default(""),
  password: yup.string().required("Password is required").default(""),
});

type Field = "usernameOrEmail" | "password"

const Login = () => {
  const [loginUser] = useLoginMutation();

  const { data: authData, loading: authLoading } = useCheckAuth();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: LoginInput) => {
    const response = await loginUser({
      variables: {
        loginInput: values,
      },
      update(cache, { data }) {
        // const meData = cache.readQuery({query: MeDocument})
        // console.log('Data',data);
        // console.log('Me data: ', meData);
        if (data?.login.message) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: { me: data.login.user },
          });
        }
      },
    });

    const loginFieldErrors = response.data?.login.errors;
    if (loginFieldErrors) {
      loginFieldErrors.map(({ field, message }) => setError(field as Field, { message }))
      
    } else if (response.data?.login.user) {
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
        <h2 className="text-4xl text-center my-3">Login</h2>
        <form className="w-1/3" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group flex flex-col py-2">
            <label className="pl-3 text-md" htmlFor="usernameOrEmail">
              Username
            </label>
            <input
              className="p-3 my-2 focus:ring-2 border border-gray-300 focus:outline-none"
              {...register("usernameOrEmail")}
              placeholder="Enter username or email"
            />
            {errors.usernameOrEmail && (
              <p className="text-red-500 ml-3">
                {errors.usernameOrEmail?.message}
              </p>
            )}
          </div>
          <div className="form-group flex flex-col py-2">
            <label className="pl-3 text-md" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className="p-3 my-2 focus:ring-2 border border-gray-300 focus:outline-none"
              {...register("password")}
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-500 ml-3">{errors.password?.message}</p>
            )}
          </div>
          <div className="flex justify-end my-3">
            <Link href="/forgot-password">
              <a >Forgot password?</a>
            </Link>
          </div>
          <div className="form-group flex justify-center">
            <button
              type="submit"
              className="p-3 mt-4 w-full bg-blue-500  hover:bg-opacity-90"
              disabled={isSubmitting}
            >
              {isSubmitting && isSubmitting ? (
                <div className="flex justify-center">
                  <Spinner />
                </div>
              ) : (
                <span className="cursor-pointer text-xl text-white">Login</span>
              )}
            </button>
          </div>
         
        </form>
      </Wrapper>
    )}
  </>
  );
};

export default Login;
