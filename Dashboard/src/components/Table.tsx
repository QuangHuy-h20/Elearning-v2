import styled from "@emotion/styled";
import { ComponentProps, useState } from "react";

const StyledTable = styled.div`
  .table-wrapper {
    overflow-y: auto;
  }

  table {
    width: 100%;
    min-width: 400px;
    border-spacing: 0;
  }

  thead {
    background-color: var(--second-bg);
  }

  tr{
    text-align:center;
  }

  th,
  td {
    padding: 15px 10px;
  }

  tbody > tr:hover {
    background-color: var(--main-color);
    color: var(--txt-white);
  }

  .table__pagination {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
  }

  .table__pagination-item ~ .table__pagination-item {
    margin-left: 10px;
  }

  .table__pagination-item {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .table__pagination-item.active,
  .table__pagination-item.active:hover {
    background-color: var(--main-color);
    color: var(--txt-white);
    font-weight: 600;
  }

  .table__pagination-item:hover {
    color: var(--txt-white);
    background-color: var(--second-color);
  }
`;

const Table = (props: ComponentProps<any>) => {
  const initDataShow =
    props.limit && props.bodyData
      ? props.bodyData.slice(0, Number(props.limit))
      : props.bodyData;

  const [dataShow, setDataShow] = useState(initDataShow);
  const [currPage, setCurrPage] = useState(0);

  let pages = 1;

  let range: number[] = [];

  if (props.limit !== undefined) {
    let page = Math.floor(props.bodyData.length / Number(props.limit));
    pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1;
    range = [...Array.from(Array(pages).keys())];
  }

  const selectPage = (page: number) => {
    const start = Number(props.limit) * page;
    const end = start + Number(props.limit);

    setDataShow(props.bodyData.slice(start, end));

    setCurrPage(page);
  };

  return (
    <StyledTable>
      <div className="table-wrapper">
        <table>
          {props.headData && props.renderHead ? (
            <thead>
              <tr>
                {props.headData.map((item: any) => props.renderHead(item))}
              </tr>
            </thead>
          ) : null}
          {props.bodyData && props.renderBody ? (
            <tbody>{dataShow.map((item: any) => props.renderBody(item))}</tbody>
          ) : null}
        </table>
      </div>
      {pages > 1 ? (
        <div className="table__pagination">
          {range.map((item, index) => (
            <div
              key={index}
              className={`table__pagination-item ${
                currPage === index ? "active" : ""
              }`}
              onClick={() => selectPage(index)}
            >
              {item + 1}
            </div>
          ))}
        </div>
      ) : null}
    </StyledTable>
  );
};

export default Table;
