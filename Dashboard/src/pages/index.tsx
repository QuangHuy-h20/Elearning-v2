import type { NextPage } from "next";
import { useCoursesQuery, useUsersQuery } from "../generated/graphql";
import StatusCard from "../components/StatusCard";
import orderBy from "lodash/orderBy";
import Table from "../components/Table";
import Chart from "../components/Chart";
import Badge from "../components/Badge";
import Spinner from "../components/Spinner";
const Home: NextPage = () => {
  const { data: coursesData, loading: courseLoading } = useCoursesQuery();
  const { data: usersData, loading: usersLoading } = useUsersQuery();

  let total: number = 0;
  usersData?.users?.map((item) => {
    item?.count !== null && item?.count !== undefined
      ? (total += item.count)
      : null;
  });

  const cardItem = [
    {
      icon: "bx bx-book-content",
      count: `${coursesData?.allCourses?.length}`,
      title: "Total courses",
    },
    {
      icon: "bx bx-user",
      count: `${usersData?.users?.length}`,
      title: "Total users",
    },
    {
      icon: "bx bx-dollar-circle",
      count: "$2,632",
      title: "Total income",
    },
    {
      icon: "bx bx-receipt",
      count: `${total}`,
      title: "Total enrolls",
    },
  ];

  const tableTopStudentHead: Object[] = [
    { key: "id", name: "ID" },
    { key: "user", name: "User" },
    { key: "total", name: "Total enrolls" },
  ];

  const tableTopCourseHead: Object[] = [
    { key: "id", name: "ID" },
    { key: "courseName", name: "Course" },
    // { key: "category", name: "Category" },
    { key: "numOfStudent", name: "Students" },
    // { key: "lastUpdated", name: "Last Updated" },
    { key: "status", name: "Status" },
  ];

  const renderTableHead = (item: any) => <th key={item.key}>{item.name}</th>;

  const sortTopStudent = orderBy(
    usersData?.users,
    [
      (o) => {
        return o.count || 0;
      },
    ],
    ["desc"]
  );

  const renderStudentTopBody = (item: any) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.username}</td>
      <td>{item.count}</td>
    </tr>
  );

  const sortTopCourse = orderBy(
    coursesData?.allCourses,
    [
      (o) => {
        return o.numberOfStudent || 0;
      },
    ],
    ["desc"]
  );

  const renderStudentCourseBody = (item: any) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.courseName}</td>
      {/* <td>{item.category.categoryName}</td> */}
      <td>{item.numberOfStudent}</td>
      <td>
        <Badge view={item.view} />
      </td>
    </tr>
  );

  return (
    <>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-6">
          <div className="row">
            {cardItem.map((item, index) => (
              <div className="col-6" key={index}>
                <StatusCard
                  icon={item.icon}
                  count={item.count}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
            <Chart />
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card__header">
              <h3>Top Students</h3>
            </div>
            <div className="card__body">
              {usersLoading ? (
                <Spinner />
              ) : (
                <Table
                limit="4"
                  headData={tableTopStudentHead}
                  renderHead={renderTableHead}
                  bodyData={sortTopStudent}
                  renderBody={renderStudentTopBody}
                />
              )}
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="card__header">
              <h3>Top Courses</h3>
            </div>
            <div className="card__body">
              {courseLoading ? (
                <Spinner />
              ) : (
                <Table
                  limit="4"
                  headData={tableTopCourseHead}
                  renderHead={renderTableHead}
                  bodyData={sortTopCourse}
                  renderBody={renderStudentCourseBody}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
