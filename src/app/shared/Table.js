import React from "react";
import classNames from "classnames";
import { Row,Col, Card,Table, Input, Button, Popover, Radio } from "antd";

import {
  FilterOutlined,
  ReloadOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const { Search } = Input;

const WTable = (props) => {
  const {
    className,
    scroll = { x: "max-content" },
    rowClassName,
    bordered = true,
    columns,
    dataSource,
    rowKey,
    pagination,
    handleTableChange,
      extraTitleContent,
      title,
      searchLoading,
      onSearch,
    ...rest
  } = props;

  const getRowKey = (record) => {
    if (typeof rowKey === "string") {
      return record?.[rowKey];
    } else if (typeof rowKey === "function") {
      rowKey(record);
    }
  };

  let paginationObj = {
    total: pagination?.total,
    pageSize: pagination?.pageSize,
    showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total}`,
    showSizeChanger: true,
    current: pagination?.current,
    pageSizeOptions: [5, 10, 20, 50, 100],
  };

  return (
    <Card title={title} bordered={false} className="">
      <Row>
        <Col xs={24} lg={24} className="mb-2 d-flex flex-row-reverse">
          {
            <Search
              loading={searchLoading}
              allowClear
              placeholder=" Search..."
              onSearch={(value, e) => {
                onSearch(value);
              }}
              style={{ width: "100%" }}
            />
          }
        </Col>
      </Row>
      <Row>
        <Table
          className={classNames("table-root", className)}
          rowKey={getRowKey}
          rowClassName={(record, index) => {
            if (
              typeof rowClassName === "function" &&
              typeof rowClassName() === "string"
            ) {
              return rowClassName();
            }
            return index % 2 === 0
              ? "table-default-row table-row-light"
              : "table-default-row table-row-dark";
          }}
          columns={columns.filter((d) => d.isVisible !== false)}
          scroll={scroll}
          dataSource={dataSource instanceof Array ? dataSource : []}
          pagination={
            pagination
              ? {
                  position: ["bottomRight", "topRight"],
                  ...(pagination ? paginationObj : false),
                }
              : false
          }
          bordered={bordered}
          onChange={handleTableChange}
          {...rest}
        />
      </Row>
    </Card>
  );
};

export default WTable;
