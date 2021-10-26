import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { CoursesDocument, useCoursesQuery } from "../../generated/graphql";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import Spinner from "../../components/Spinner";
import NextLink from "next/link";
import Image from "next/image";
import DownArrowSmallIcon from "../../icons/DownArrowSmallIcon";
import { NetworkStatus } from "@apollo/client";

export const limit = 3;

const Courses = () => {

  const { data, loading, fetchMore, networkStatus } = useCoursesQuery({
    variables: { limit },
    notifyOnNetworkStatusChange: true,
  });

  const loadingMoreCourses = networkStatus === NetworkStatus.fetchMore;

  const loadMoreCourses = () => {
    fetchMore({
      variables: { cursor: data?.courses?.cursor },
    });
  };

  return (
    <section >
      <h2 className="text-2xl">All courses</h2>
      {loading && !loadingMoreCourses ? (
        <Spinner />
      ) : (
        <>
          {data?.courses?.paginatedCourses.map((course) => (
            <NextLink key={course.id} href={`/course/${course.id}`}>
              <a className="course-item flex flex-wrap border-b border-gray-500 border-opacity-30 last:border-b-0 mt-12 pb-6">
                <Image src={course.image.split("/").pop() as string} width={240} height={135} alt={course.courseName} />
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

          {data?.courses?.hasMore && (
            <div className="flex justify-center">
              <button
                className="flex justify-between items-center mt-10 flex-row bg-blue-400 text-white  font-semibold text-sm pr-4 pl-2 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={loadMoreCourses}
              >
                {loadingMoreCourses ? (
                  <Spinner />
                ) : (
                  <>
                    <DownArrowSmallIcon />
                    <span className="ml-2 text-md">Show more</span>
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const apolloClient = initializeApollo({ headers: context.req.headers });

  await apolloClient.query({
    query: CoursesDocument,
    variables: {
      limit,
    },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default Courses;
