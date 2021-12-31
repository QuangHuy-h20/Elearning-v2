import { Reference } from "@apollo/client";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  PaginatedCourses,
  useDeleteCourseMutation,
  useMeQuery,
} from "../generated/graphql";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";

interface IActionButtonsProps {
  courseId: string;
  courseUserId: string;
}

const ActionButtons = ({ courseId, courseUserId }: IActionButtonsProps) => {
  const router = useRouter();
  const { data: meData } = useMeQuery();

  const [deleteCourse, _] = useDeleteCourseMutation();

  const onCourseDelete = async (courseId: string) => {
    await deleteCourse({
      variables: { id: courseId },
      update(cache, { data }) {
        if (data?.deleteCourse.success) {
          cache.modify({
            fields: {
              courses(
                existing: Pick<
                  PaginatedCourses,
                  "__typename" | "totalCount" | "cursor" | "hasMore"
                > & { paginatedCourses: Reference[] }
              ) {
                const newCoursesAfterDeletion = {
                  ...existing,
                  totalCount: existing.totalCount - 1,
                  paginatedCourses: existing.paginatedCourses.filter(
                    (courseRefObject) =>
                      courseRefObject.__ref !== `Course:${courseId}`
                  ),
                };
                return newCoursesAfterDeletion;
              },
            },
          });
        }
      },
    });
    if (router.route !== "/courses") router.push("/courses");
  };

  if (meData?.me?.id !== courseUserId) return null;

  return (
    <div className="flex items-center align-center">
      <NextLink href={`/course/update-course/${courseId}`}>
        <a className="bg-indigo-400 mr-3 text-white  text-xs px-3 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150">
          <EditIcon />
        </a>
      </NextLink>
      <button
        onClick={() => {
          if (window.confirm("Do you want to delete this course?")) {
            onCourseDelete(courseId);
          }
        }}
        className="bg-red-400 text-white text-xs px-3 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

export default ActionButtons;
