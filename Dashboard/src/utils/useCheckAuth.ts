import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useCheckAuth = () => {
  const router = useRouter();

  const { data, loading } = useMeQuery();

  useEffect(() => {
    if (
      !loading &&
      !data?.me &&
      (router.route === "/" ||
        router.route === "/students" ||
        router.route === "/courses" ||
        router.route === "/categories" ||
        router.route === "/setting")
    ) {
      router.replace("/login");
    }
    if (
      !loading &&
      data?.me &&
      (router.route === "/login" ||
        router.route === "/register" ||
        router.route === "/forgot-password" ||
        router.route === "/change-password")
    ) {
      router.replace("/");
    }

    if (
      data?.me?.roleId === "student" &&
      (router.route === "/create-course" ||
        router.route === "/update-course" ||
        router.route === "/delete-course")
    ) {
      router.replace("/");
    }
  }, [data, loading, router]);

  return { data, loading };
};
