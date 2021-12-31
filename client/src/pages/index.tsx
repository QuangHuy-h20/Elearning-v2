import type { NextPage } from "next";
// import Image from "next/image";
import { useMeQuery } from "../generated/graphql";
import FireIcon from "../icons/FireIcon";
const Home: NextPage = () => {
  const { data: meData } = useMeQuery();

  return (
    <main>
      <div className="relative flex justify-center">
        <div className="absolute w-2/5 h-60 top-1/4 p-6 left-16 bg-gray-900 border border-white rounded-lg bg-opacity-30 focus-visible:outline-none focus-visible:ring backdrop-filter backdrop-blur-sm border-opacity-10 ">
          <div className="flex flex-col w-full justify-between">
            <h2 className="text-4xl my-3 text-white">Traveller</h2>
            <p className="text-sm my-2 text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              velit harum delectus quam laborum, quisquam ratione odit amet
              consequatur eligendi ducimus minima totam itaque, libero suscipit?
            </p>
            <button
              type="button"
              className=" w-1/4 mt-3 px-4 py-3 text-sm text-indigo-300 font-semibold bg-gray-800 bg-opacity-95 rounded-xl hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              {!meData?.me ? (
                <a href="/register">Get started</a>
              ) : (
                <a href="/courses">Get explored</a>
              )}
            </button>
          </div>
        </div>
        <img
          className=" rounded-lg w-full banner"
          src="https://storage.googleapis.com/upload-image-elearning/banner.jpg"
          alt="Banner picture"
        />
      </div>

      <div className="w-full mt-12">
        <h2 className="flex items-center text-red-400">
          <FireIcon />{" "}
          <span className="text-md self-center font-bold ml-1">Trending</span>
        </h2>
        
      </div>
    </main>
  );
};

export default Home;
