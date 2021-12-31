import NextLink from "next/link";

const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-center text-6xl mb-10">404, Page not found</h1>
      <NextLink href="/">
        <a className="flex justify-between py-4 px-8 bg-red-400 rounded-lg">
          <span className="ml-1">Back to Home</span>
        </a>
      </NextLink>
    </div>
  );
};

export default PageNotFound;
