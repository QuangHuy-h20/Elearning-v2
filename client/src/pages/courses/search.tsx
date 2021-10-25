import { useRouter } from "next/router";
import { useSearchQuery } from "../../generated/graphql";
import NextLink from "next/link";
import Image from "next/image";

const Search = () => {
  const router = useRouter();

  const { keyword } = router.query;

  const { data, loading } = useSearchQuery({
    variables: { searchInput: { courseName: keyword as string } },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader ease-linear rounded-full inline border-4 border-t-4 border-gray-200 h-12 w-12 "></div>
      </div>
    );
  }

  console.log(data?.searchListings);

  if (data!.searchListings!.length === 0) {
    return (
      <div>
        <h1 className="text-3xl mb-4">
          Sorry, we couldn't find any results for "<b>{keyword}</b>".
        </h1>
        <h3>Please try again with another keyword.</h3>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl">
        {data?.searchListings?.length} results for "<b>{keyword}</b>"
      </h2>
      {data?.searchListings &&
        data?.searchListings?.map((course) => (
          <NextLink key={course.id} href={`/course/${course.id}`}>
            <a className="course-item flex flex-wrap border-b mt-12 pb-6">
              <Image
                src={course.image.split("/").pop() as string}
                width={240}
                height={135}
                alt={course.courseName}
              />
              <div className="flex flex-col flex-1 ml-4">
                <h1 className="font-bold text-md mb-3 tracking-wide">
                  {course.courseName}
                </h1>
                <p className="text-sm text-gray-400  w-2/3">{`${course.textSnippet}...`}</p>
                <h4 className="text-sm text-gray-300 my-1 font-light">
                  {course.user.username}
                </h4>
                {course.view >= 100 ? (
                  <span className="text-xs font-bold inline-block py-1 px-2 rounded-sm text-gray-600  bg-yellow-200 last:mr-0 w-max mr-1">
                    Best seller
                  </span>
                ) : (
                  <span className="text-xs font-bold inline-block py-1 px-2 rounded-sm text-green-600  bg-green-200 last:mr-0 w-max mr-1">
                    New
                  </span>
                )}
              </div>
            </a>
          </NextLink>
        ))}
    </>
  );
};

export default Search;
