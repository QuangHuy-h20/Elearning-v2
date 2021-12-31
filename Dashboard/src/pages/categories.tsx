import { useCourseCategoryQuery } from "../generated/graphql";
import PlusIcon from "../icons/PlusIcon"; 
import Spinner from "../components/Spinner";
import Table from "../components/Table";

const Categories = () => {
  const { data: cateData, loading: cateLoading } = useCourseCategoryQuery();

  const tableCategoryHead: Object[] = [
    { key: "id", name: "ID" },
    { key: "categoryName", name: "Category name" },
  ];

  const renderCourseBody = (item: any) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.categoryName}</td>
    </tr>
  );

  const categoriesData = cateData?.categories;

  const renderTableHead = (item: any) => <th key={item.key}>{item.name}</th>;

  return (
    <div>
      <div className="flex justify-between mb-10">
        <span className="">Categories</span>
        <a href="/create-category">
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
              {cateLoading ? (
                <Spinner />
              ) : (
                <Table
                  limit="6"
                  headData={tableCategoryHead}
                  renderHead={renderTableHead}
                  bodyData={categoriesData}
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

export default Categories;
