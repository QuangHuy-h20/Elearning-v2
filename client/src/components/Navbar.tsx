import NextLink from "next/link";
import Image from "next/image";
import SearchIcon from "../icons/SearchIcon";
import {
  MeDocument,
  MeQuery,
  useCourseCategoryQuery,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";
import BellIcon from "../icons/BellIcon";
import DownArrow from "../icons/DownArrowIcon";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { Transition } from "@headlessui/react";
import Burger from "../icons/Burger";

const Navbar = () => {
  const route = useRouter();

  const { data: meData, loading: meLoading } = useMeQuery();

  const [logout] = useLogoutMutation();

  const { data: catData } = useCourseCategoryQuery();

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const [isShow, setIsShow] = useState(false);

  const [keyword, setKeyword] = useState("");

  const logoutUser = async () => {
    await logout({
      update(cache, { data }) {
        if (data?.logout) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: { me: null },
          });
        }
      },
    });

    route.push("/");
  };

  const showDropdown = () => {
    setIsShow(!isShow);
  };

  const hideDropdown = () => {
    setIsShow(false);
  };

  const showCategory = () => (
    <Transition
      as="div"
      show={isOpen}
      className="absolute z-50 top-full w-60 h-38 p-1 bg-black border border-white rounded-lg bg-opacity-10 focus-visible:outline-none focus-visible:ring backdrop-filter backdrop-blur border-opacity-10 "
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <ul className="m-2 h-full">
        {catData?.categories?.map((category) => (
          <>
            <NextLink href={`/courses/${category.id}`}>
          <li key={category.id} className="relative py-3 text-sm hover:backdrop-filter hover:backdrop-blur hover:bg-gray-500 hover:bg-opacity-20 hover:border rounded-lg">
              <a className="px-2">{category.categoryName}</a>
          </li>
            </NextLink>
          </>
        ))}
      </ul>
    </Transition>
  );

  const showUser = () => (
    <Transition
      as="div"
      show={isShow}
      className="absolute z-50 top-full right-0 w-40 h-38 p-1 bg-black border border-white rounded-lg bg-opacity-10 focus-visible:outline-none focus-visible:ring backdrop-filter backdrop-blur border-opacity-10 "
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <ul className="m-2 h-full text-sm">
        <li key="account" className="relative py-3 text-sm hover:bg-gray-500 hover:bg-opacity-40 hover:border rounded-lg">
          <NextLink href="/user">
          <a className="px-2">Account</a>
          </NextLink>
        </li>
        <li key="edit" className="relative py-3 text-sm hover:bg-gray-500 hover:bg-opacity-40 hover:border rounded-lg">
          <NextLink href="/user/edit-profile">
          <a className="px-2">Edit profile</a>
          </NextLink>
        </li>
        <li key="logout" className="relative py-3 text-sm hover:bg-gray-500 hover:bg-opacity-40 hover:border rounded-lg">
          <button className="px-2" onClick={logoutUser}>Logout</button>
        </li>
      </ul>
    </Transition>
  );

  //Handle image url

  const lastUrl = meData?.me?.profilePicture.split("/");
  const filename = lastUrl && lastUrl[lastUrl.length - 1];

  let body;
  if (meLoading) body = null;
  else if (!meData?.me) {
    body = (
      <>
        <ul className="flex justify-between">
          <li className="p-3 mr-3 md:mr-0">
            <NextLink href="/login">
              <a className="text-sm font-semibold tracking-wide">Login</a>
            </NextLink>
          </li>
          <li className="sign-up px-6 py-3 ml-3 border border-gray-500 border-opacity-30 rounded-full text-red-200">
            <NextLink href="/register">
              <a className="text-sm font-semibold tracking-wide">Sign up</a>
            </NextLink>
          </li>
        </ul>
      </>
    );
  } else {
    body = (
      <div className="flex justify-between items-center">
        <div className="relative bg-gray-600 bg-opacity-30 p-2 mx-8 rounded-full cursor-pointer hover:bg-gray-500">
          <BellIcon color="#fff" fill="#fff"/>
          <span className=" top-0 left-0 absolute inline-flex h-2 w-2  rounded-full bg-green-400"></span>
        </div>
        <div
          onMouseEnter={showDropdown}
          onMouseLeave={hideDropdown}
          className="relative flex items-center cursor-pointer py-4"
        >
          <span className="mr-3 text-sm text-indigo-300">
            {meData.me.username}
          </span>
          <div className="image-wrapper flex justify-center items-center border border-gray-500 border-opacity-90 rounded-full h-14 w-14 ">
            {!meData.me.profilePicture ? (
              <span>{meData?.me?.username.charAt(0).toUpperCase()}</span>
            ) : (
              <Image
                className=" rounded-full border object-cover"
                src={`${filename}`}
                width={50}
                height={50}
                layout="fixed"
                alt="profile-picture"
              />
            )}
            {showUser()}
          </div>
        </div>
      </div>
    );
  }

  //Handle search

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({ pathname: "/courses/search", query: { keyword } });
  };

  return (
    <header className="relative flex justify-between items-center shadow-inner border-gray-600 border-b border-opacity-60 h-20 px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-56">
      <nav className="flex justify-between items-center w-full h-full py-5">
      <div className="lg:hidden">
          <Burger />
        </div>
        <div className="logo border-0 lg:border-r border-gray-700 p-0 md:pr-2 lg:pr-10">
          <h2 className="text-2xl font-semibold">
            <NextLink href="/">Traveller</NextLink>
          </h2>
        </div>
        <div className="hidden lg:block">
          <NextLink href="/courses">
            <div
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
              className="relative flex flex-row items-center xl:mx-10 lg:mx-6 cursor-pointer"
            >
              <span className="categories mr-2 py-8 text-white text-sm">Categories</span>
              <DownArrow />
              {showCategory()}
            </div>
          </NextLink>
        </div>
        <div className="hidden bg-gray-600 bg-opacity-30 rounded-full max-w-md w-full lg:block md:max-w-sm xl:max-w-lg ">
          <form
            onSubmit={handleSubmit}
            className="relative search-bar w-full h-12 flex items-center px-3 rounded-full text-gray-500 flex-row-reverse"
          >
            <input
              className="bg-transparent border-0 border-opacity-0 w-full h-full px-4 focus:outline-none text-sm"
              type="search"
              value={keyword}
              onChange={handleChange}
              placeholder="Search..."
            />

            <button type="submit">
              <SearchIcon />
            </button>
          </form>
        </div>
        <div className="flex-grow hidden lg:block"></div>
        <div className="hidden lg:block">{body}</div>
        <div className="lg:hidden">
          <SearchIcon />
        </div>
        
      </nav>
    </header>
  );
};

export default Navbar;
