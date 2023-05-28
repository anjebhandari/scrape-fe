import React, { useEffect, useMemo, useState } from "react";
import { Spin, message } from "antd";
import { isEmpty } from "lodash";
import WTable from "../../shared/Table";

const MainPanel = (props) => {
  const { fetchHomeList, loading, payload, pagination } = props;
  const [search, setSearch] = useState("");
  const [counter, setCounter] = useState(false);

  const handleTableChange = (pagination, filters, sorter) => {
    fetchHomeList({
      page_size: pagination.pageSize,
      page_number: pagination.current,
      sort_by: sorter?.field,
    });
  };

  useEffect(() => {
    fetchHomeList();
    setCounter(true);
  }, []);

  useEffect(() => {
    if (counter === true) {
      const source = new EventSource(
        `${process.env.REACT_APP_REST_API_HOST}notifications`
      );
      source.onmessage = (e) => {
        const parsed = JSON.parse(e.data);
        parsed.notifications.map((parse) => {
          console.log("parse.msg", parse.msg);
          message.success(parse.msg);
        });
      };
    }
  }, [counter]);

  const columns = useMemo(() => {
    let cols =
      !isEmpty(payload) && payload?.length > 0
        ? Object.keys(payload?.[0])
            .filter((item) => item !== "id")
            .map((item) => {
              return {
                title: item,
                dataIndex: item,
                sorter: true,
                render: (text) => text || "-",
                showSorterTooltip: false,
              };
            })
        : [];
    return [
      {
        title: "#",
        // key: "index",
        // align: "center",
        render: (text, record, index) => {
          return index + 1;
        },
      },
      ...cols,
    ];
  });

  const handleSearch = (value) => {
    setSearch(value);
    fetchHomeList({
      search_key: value,
    });
  };

  const tableProps = {
    title: "Public List",
    columns: columns || [],
    dataSource: payload ? payload : [],
    tableLoading: loading,
    pagination: pagination,
    handleTableChange: handleTableChange,
    onSearch: handleSearch,
  };
  return (
    <Spin spinning={loading}>
      <WTable {...tableProps} />
    </Spin>
  );
};

export default MainPanel;
