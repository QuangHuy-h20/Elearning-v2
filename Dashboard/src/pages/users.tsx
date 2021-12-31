import { useUsersQuery } from "../generated/graphql";
import Table from "../components/Table";
import Spinner from "../components/Spinner";
const Users = () => {
  const { data: usersData, loading: usersLoading } = useUsersQuery();

  const tableTopStudentHead: Object[] = [
    { key: "id", name: "ID" },
    { key: "user", name: "User" },
    { key: "email", name: "Email" },
    { key: "phoneNumber", name: "Phone" },
    { key: "roleId", name: "Role" },
    { key: "total", name: "Total enrolls" },
  ];

  const renderStudentTopBody = (item: any) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.username}</td>
      <td>{item.email}</td>
      <td>{item.phoneNumber}</td>
      <td>{item.roleId}</td>
      <td>{item.count}</td>
      <td>
      </td>
    </tr>
  );

  const studentData = usersData?.users;

  const renderTableHead = (item: any) => <th key={item.key}>{item.name}</th>;

  return (
    <div>
      <h2 className="page-header">Users</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              {usersLoading ? (
                <Spinner />
              ) : (
                <Table
                  limit="6"
                  headData={tableTopStudentHead}
                  renderHead={renderTableHead}
                  bodyData={studentData}
                  renderBody={renderStudentTopBody}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
