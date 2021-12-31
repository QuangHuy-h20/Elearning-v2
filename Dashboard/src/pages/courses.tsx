import Spinner from "../components/Spinner";
import Table from "../components/Table";
import ActionButtons from "../components/ActionButtons";
import { useCoursesQuery } from "../generated/graphql";
import Image from "next/image";
import PlusIcon from "../icons/PlusIcon";
const Courses = () => {
  const { data: courseData, loading: courseLoading } = useCoursesQuery();

  const tableCourseHead: Object[] = [
    { key: "id", name: "ID" },
    { key: "courseName", name: "Course name" },
    { key: "courseCode", name: "Code" },
    { key: "category", name: "Category" },
    { key: "image", name: "Image" },
    { key: "updatedAt", name: "Updated at" },
    { key: "action", name: "Action" },
  ];

  const renderCourseBody = (item: any) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.courseName}</td>
      <td>{item.courseCode}</td>
      <td>{item.category.categoryName}</td>
      <td>
        <Image
          src={item.image.split("/").pop() as string}
          width={55}
          height={30}
          alt={item.courseName}
        />
      </td>
      <td>{item.updatedAt}</td>
      <td>
        <ActionButtons
          courseId={item.id.toString()}
          courseUserId={item.userId.toString()}
        />
      </td>
    </tr>
  );

  const coursesData = courseData?.allCourses;

  const renderTableHead = (item: any) => <th key={item.key}>{item.name}</th>;

  return (
    <div>
      <div className="flex justify-between mb-10">
        <span className="">Courses</span>
        <a href="/create-course">
          <button className="flex space-x-1 bg-green-300 mr-10 py-2 px-3 text-white">
            <PlusIcon />
            <span>New</span>
          </button>
        </a>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              {courseLoading ? (
                <Spinner />
              ) : (
                <Table
                  limit="6"
                  headData={tableCourseHead}
                  renderHead={renderTableHead}
                  bodyData={coursesData}
                  renderBody={renderCourseBody}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
