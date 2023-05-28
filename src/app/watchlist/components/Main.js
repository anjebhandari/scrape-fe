import React, { useEffect, useMemo, useState } from "react";
import { Spin, message, Row, Col, Card, Input,Image  } from "antd";
import { isEmpty } from "lodash";
import WTable from "../../shared/Table";
import AddForm from './Form';

const { Search } = Input;

export const Main = (props) => {
  const { fetchWatchList, loading, payload, pagination, searchHomeList } =
    props;
  const [search, setSearch] = useState("");
  const [counter, setCounter] = useState(false);
  const [searchList, setSearchList] = useState(false);
  const [record, setRecord] = useState();

  const handleTableChange = (pagination, filters, sorter) => {
    fetchWatchList({
      page_size: pagination.pageSize,
      page_number: pagination.current,
      sort_by: sorter?.field,
    });
  };

  useEffect(() => {
    fetchWatchList();
    setCounter(true);
  }, []);

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
    fetchWatchList({
      search_key: value,
    });
  };

  const tableProps = {
    title: "Watch List",
    columns: columns || [],
    dataSource: payload ? payload : [],
    tableLoading: loading,
    pagination: pagination,
    handleTableChange: handleTableChange,
    onSearch: handleSearch,
  };

  const onSearch = (value) => {
    searchHomeList({ search_key: value }).then((res) => {
        setSearchList(true);
        setRecord(res.payload.data[0]);
        
    });
    };
    console.log("record?.price",record?.Price)
  return (
    <Spin spinning={loading}>
      <Card title="Add WatchList">
        <Row>
          <Col span={6} offset={1}>
            <Search
              allowClear
              placeholder=" Search..."
              style={{ width: "100%" }}
              onSearch={onSearch}
            />
          </Col>
        </Row>
        {searchList && (
                  <Row>
                      <Col>
                      <span>Search Result</span>
                      <br/>
                      <div>
                              <ol style={{ listStyle: 'none', display:'inline-block'}}>
                                  <li>Name: { record.code}</li>
                                  <li>Price: {record.Price} </li>
                                  <li> <Image src={record.image} width={100} /> </li> 
                                  
                              </ol>
                              
                          </div>
                          <AddForm id={record.id} code={record.code} {...props} />
                          </Col>
          </Row>
        )}
      </Card>
      <Row style={{ marginLeft: "auto", marginRight: "auto", width: "100%" }}>
        <Col span={12} offset={6}>
          <WTable {...tableProps} />
        </Col>
      </Row>
    </Spin>
  );
};
export default Main;
