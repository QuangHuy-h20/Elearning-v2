import { useMeQuery } from "../../generated/graphql";
import { useCheckAuth } from "../../utils/useCheckAuth";
import PageNotFound from "../404";
import NextLink from "next/link";

const User = () => {
  const { data: authData, loading: authLoading } = useCheckAuth();

  const { data: meData, loading: meLoading } = useMeQuery();

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
    <div className="relative flex mt-52 mx-auto bg-gray-700  border-white rounded-lg bg-opacity-20 backdrop-filter backdrop-blur- border-opacity-10 justify-center w-4/5 h-3/4 border">
      <div className=" absolute -top-20 h-44 w-44 cursor-pointer">
        <NextLink href="/user/edit-profile">
          <a className="edit-user w-full h-full object-cover rounded-full">
            {!meData?.me?.profilePicture ? (
              <div className="flex justify-center items-center w-full border border-dashed rounded-full border-opacity-20 h-full">
                <h1 className="text-4xl">
                  {meData?.me?.username.charAt(0).toUpperCase()}
                </h1>
              </div>
            ) : (
              <img
                className="w-full h-full object-cover rounded-full"
                src={meData?.me?.profilePicture}
                alt=""
              />
            )}
          </a>
        </NextLink>
      </div>

      <div className="my-32 flex flex-col">
        <h2 className="text-2xl text-center mb-14 text-indigo-300">
          {meData?.me?.username}
        </h2>
        <p className="mb-3">Email: {meData?.me?.email}</p>
        <p className="mb-3">Phone number: {meData?.me?.phoneNumber}</p>
      </div>
    </div>
  );
};

export default User;
