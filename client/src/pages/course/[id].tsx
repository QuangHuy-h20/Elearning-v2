import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import ActionButtons from "../../components/ActionButtons";
import {
  CourseDocument,
  CourseIdsDocument,
  CourseIdsQuery,
  CourseQuery,
  EnrollStatus,
  useCourseQuery,
  useEnrollMutation,
  useMeQuery,
} from "../../generated/graphql";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import PageNotFound from "../404";
import { limit } from "../courses";
import NextLink from "next/link";
enum EnrollStatusValue {
  Enroll = 1,
  UnEnroll = 0,
}

const Course = () => {
  const router = useRouter();
  const { data, loading, error } = useCourseQuery({
    variables: { id: router.query.id as string },
  });

  const { data: meData } = useMeQuery();

  const [enroll] = useEnrollMutation();

  const handleEnroll = async () => {
    await enroll({
      variables: {
        enrollStatusValue: EnrollStatus.Enroll,
        courseId: data!.course!.id,
      },
    });
  };

  const handleUnEnroll = async () => {
    await enroll({
      variables: {
        enrollStatusValue: EnrollStatus.UnEnroll,
        courseId: data!.course!.id,
      },
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader ease-linear rounded-full inline border-4 border-t-4 border-gray-200 h-12 w-12 "></div>
      </div>
    );

  if (error || !data?.course) return <PageNotFound />;

  //Handle description
  const [one, ...item] = data!.course!.description?.split("~");

  const description = [...item];

  //Handle time
  let getDate = data?.course?.updatedAt;

  getDate = new Date();
  const month = getDate.getUTCMonth() + 1;
  const year = getDate.getUTCFullYear();

  const newDate = `${month}/${year}`;

  const staticList = [
    "Be able to build ANY website you want",
    "Build fully-fledged websites and web apps for your startup or business.",
    "Work as a freelance developer.",
    "Learn professional developer best practices.",
  ];

  return (
    <div className="flex justify-around flex-column">
      <div className="w-1/2 flex-1 pr-10">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl text-indigo-300">{data.course.courseName}</h2>
          <ActionButtons
            courseId={data.course.id.toString()}
            courseUserId={data?.course?.userId.toString()}
          />
        </div>
        <h3 className="text-md my-3">{one}</h3>
        <div className="">
          {data.course.view >= 100 ? (
            <span className="text-xs font-bold inline-block py-1 px-2 rounded-sm text-gray-600  bg-yellow-200 last:mr-0 w-max mr-1">
              Best seller
            </span>
          ) : (
            <span className="text-xs font-bold inline-block py-1 px-2 rounded-sm text-green-600  bg-green-200 last:mr-0 w-max mr-1">
              New
            </span>
          )}

          <span className="ml-2 text-sm text-gray-400">
            <b>views:</b> {data.course.view}
          </span>
        </div>
        <h4 className="text-sm my-3 text-gray-300">
          Created by: <strong>{data.course.user.username}</strong>
        </h4>
        <h5 className="text-sm my-3 text-gray-300">
          Students: <strong>{data.course.numberOfStudent}</strong>
        </h5>
        
        <p className="text-sm">Last updated: {newDate}</p>

        <h2 className="text-2xl mt-10 mb-2">Description</h2>
        <div className="text-sm text-gray-400 leading-5 tracking-wide">
          {description.map((item, index) => (
            <p key={index} className="mb-4">
              {item}
            </p>
          ))}
        </div>
      </div>
      <div className="w-1/4">
        <div className="rounded-sm border  px-10 border-indigo-300 border-opacity-70">
          <div className="flex justify-center">
            <img
              className="w-full mt-6"
              src={data.course.image}
              alt={data.course.courseName}
            />
          </div>
          <div className="flex flex-col justify-center my-6  ">
            {!meData?.me ? (
              <button className="border border-red-400 w-full hover:bg-red-400 my-3 px-8 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                <NextLink href="/login">
                  <a>Login to enroll this course</a>
                </NextLink>
              </button>
            ) : (
              <button
                className="bg-indigo-500 w-full active:bg-indigo-600 my-3 font-bold text-base px-8 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={
                  data.course.enrollStatus === EnrollStatusValue.Enroll
                    ? handleUnEnroll
                    : handleEnroll
                }
              >
                {data.course.enrollStatus === EnrollStatusValue.Enroll
                  ? "Unenroll"
                  : "Enroll"}
              </button>
            )}

            <h2 className="text-sm mt-3 font-semibold">What you'll learn: </h2>
            <ul className="text-sm ">
              {staticList.map((item, index) => (
                <li key={index} className="py-2 ml-6 list-outside list-disc">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<CourseIdsQuery>({
    query: CourseIdsDocument,
    variables: { limit },
  });
  return {
    paths: data!.courses!.paginatedCourses.map((course) => ({
      params: { id: `${course.id}` },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  { [key: string]: any },
  { id: string }
> = async ({ params }) => {
  const apolloClient = initializeApollo();
  await apolloClient.query<CourseQuery>({
    query: CourseDocument,
    variables: { id: params?.id as string },
  });

  return addApolloState(apolloClient, { props: {} });
};

export default Course;
