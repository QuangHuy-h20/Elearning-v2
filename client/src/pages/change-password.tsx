import Wrapper from "../components/Wrapper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Spinner from "../components/Spinner";
import {
  ChangePasswordInput,
  MeDocument,
  MeQuery,
  useChangePasswordMutation,
} from "../generated/graphql";
import { useRouter } from "next/router";
import { useState } from "react";

import NextLink from "next/link";
import { useCheckAuth } from "../utils/useCheckAuth";
import BackArrowIcon from "../icons/BackArrowIcon";
import PageNotFound from "./404";
import { mapFieldErrors } from "../helper/mapFieldErrors";

interface IInputProps {
  newPassword: string;
}

const schema: yup.SchemaOf<IInputProps> = yup.object().shape({
  newPassword: yup.string().required("Password is required").default(""),
});

const ChangePassword = () => {
  const { data: authData, loading: authLoading } = useCheckAuth();

  const [changePassword] = useChangePasswordMutation();

  const [tokenError, setTokenError] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<IInputProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: ChangePasswordInput) => {
    const { userId, token } = router.query;

    if (userId && token) {
      const response = await changePassword({
        variables: {
          userId: userId as string,
          token: token as string,
          changePasswordInput: values,
        },
        update(cache, { data }) {
          if (data?.changePassword.success) {
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: { me: data.changePassword.user },
            });
          }
        },
      });

      if (response.data?.changePassword.errors) {
        const fieldErrors = mapFieldErrors(
          response.data?.changePassword.errors
        );
        if ("token" in fieldErrors) {
          setTokenError(fieldErrors.token);
          console.log(tokenError);
        }
        Object.keys(fieldErrors).forEach((key) =>
          setError(key as "newPassword", { message: fieldErrors[key] })
        );
      } else if (response.data?.changePassword.user) {
        router.push("/");
      }
    }
  };

  if (authLoading || (!authLoading && authData?.me)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader ease-linear rounded-full inline border-4 border-t-4 border-gray-200 h-12 w-12 "></div>
      </div>
    );
  } else if (!router.query.userId || !router.query.token) {
    return <PageNotFound />;
  } else {
    return (
      <Wrapper>
        <h2 className="text-4xl text-center my-3">Change password</h2>

        <form className="w-2/5" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group flex flex-col py-2">
            <label className="pl-3 text-md" htmlFor="newPassword">
              New password
            </label>
            <input
              type="password"
              className="bg-transparent p-3 my-2 border rounded-lg focus:outline-none focus-visible:ring-2"
              {...register("newPassword")}
              placeholder="Enter new password"
            />
            {errors.newPassword && (
              <p className="text-red-500 ml-3">{errors.newPassword?.message}</p>
            )}
          </div>
          {tokenError && (
            <div className="flex flex-col ml-3">
              <p className="text-red-500 ">{tokenError}</p>
              <div className="flex my-6">
                <NextLink href="/forgot-password">
                  <a className="flex">
                    <BackArrowIcon />{" "}
                    <span className="ml-1">Back to Forgot password</span>
                  </a>
                </NextLink>
              </div>
            </div>
          )}

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
      </Wrapper>
    );
  }
};

export default ChangePassword;
