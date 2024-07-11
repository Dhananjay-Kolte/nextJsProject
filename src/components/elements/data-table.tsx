"use client";

import { AppConstants } from "@/app/constants";
import {
  ColumnDef,
  PaginationState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import {
  FilterTextItem,
  FilterDateRangeItem,
  FilterEnumItem,
  FilterRelationItem,
} from "./filters";
import { useRouter } from "next/navigation";
import useAuth from "@/app/_auth/useAuth";

const defaultData: any[] = [];

const columnHelper = createColumnHelper<any>();

function DataTable({ dataTable, dataSchema }: any) {
  const [data, setData] = useState(() => [...defaultData]);
  const [token, setToken] = useState<string>("");

  const {
    isAuthenticated,
    setIsAuthenticated,
    authLoading,
    canViewTable,
    canDeleteRecord,
    canViewRecord,
  } = useAuth();

  const router = useRouter();

  const rerender = useReducer(() => ({}), {})[1];

  const [loading, setLoading] = useState(false);

  const canView = canViewTable(dataSchema.uid, dataSchema.apiID);
  const canDelete = canDeleteRecord(dataSchema.uid, dataSchema.apiID);
  const canViewSingleRecord = canViewRecord(dataSchema.uid, dataSchema.apiID);

  // console.log(dataTable);

  const columns = useMemo<ColumnDef<any>[]>(
    () =>
      dataTable.tableColumns.map((c: any) => {
        let col: ColumnDef<any> = {
          header: c.displayName,
          accessorKey: c.accessorField,
          cell: (info) => info.getValue(),
          footer: (props) => props.column.id,
        };

        if (c.type === "relation") {
          col = {
            header: c.displayName,
            accessorFn: (orow) => {
              if (
                c.relatedEntity &&
                c.accessorField &&
                orow[c.relatedEntity] &&
                orow[c.relatedEntity].data &&
                orow[c.relatedEntity].data.attributes
              ) {
                return orow[c.relatedEntity].data.attributes[c.accessorField];
              } else {
                return "";
              }
            },
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          };
        }

        return col;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 0,
  });

  const [filters, setFitlers] = useState<any>(
    dataTable.filters.map((f: any) => {
      return {
        id: f.id,
        value: null,
        accessor: f.accessor,
        displayName: f.displayName,
        type: f.type,
        relatedEntity: f.relatedEntitySingular,
      };
    })
  );

  const [relations, setRelations] = useState<any>({});

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    debugTable: true,
    state: {
      pagination,
    },
    pageCount: pageSize,
  });

  const getData = useCallback(() => {
    let query = contructTableQuery(
      dataSchema.schema.pluralName,
      dataTable.tableColumns,
      "" + pageIndex,
      filters
    );

    console.log(query);

    let graphqlDataName = getGraphQlDataName(dataSchema.schema.pluralName);

    if (typeof window !== 'undefined') {
      const accessToken = window.localStorage.getItem(AppConstants.ACCESS_TOKEN);
      setToken(accessToken ?? '');
    }
    setLoading(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
        {
          query: query,
          variables: {},
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        if (res.data && res.data.data && res.data.data[graphqlDataName]) {
          let rowData = res.data.data[graphqlDataName].data.map((d: any) => {
            return {
              id: d.id,
              ...d.attributes,
            };
          });

          setData(rowData);

          console.log(res.data.data[graphqlDataName].meta.pagination.pageCount);
          setPagination({
            pageIndex: res.data.data[graphqlDataName].meta.pagination.page,
            pageSize: res.data.data[graphqlDataName].meta.pagination.pageCount,
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTable, pageIndex, setPagination, filters, dataSchema]);

  function deleteRecord(recordId: any) {
    let graphqlDataName = getGraphQlDataName(dataSchema.schema.pluralName);

    graphqlDataName =
      graphqlDataName.charAt(0).toUpperCase() + graphqlDataName.slice(1);

    graphqlDataName = graphqlDataName.substring(0, graphqlDataName.length - 1);

    if (typeof window !== 'undefined') {
      const accessToken = window.localStorage.getItem(AppConstants.ACCESS_TOKEN);
      setToken(accessToken ?? '');
    }
    setLoading(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
        {
          query: `mutation delete${graphqlDataName} {
            delete${graphqlDataName}(id: ${recordId}) {
              data {
                id
              }
            }
          }`,
          variables: {
            // id: recordId,
          },
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setData(
          data.filter(
            (d) => d.id != res.data.data["delete" + graphqlDataName].data.id
          )
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function viewRecord(recordId: any) {
    router.push(`${dataSchema.schema.pluralName}/${recordId}`);
  }

  useEffect(() => {
    getData();
  }, [pageIndex, pageSize, getData]);

  useEffect(() => {
    if (
      dataTable.filters.filter((f: any) => f.type === "relation").length > 0
    ) {
      let query = construnctFilterReletedEntityQuery(
        dataTable.filters.filter((f: any) => f.type === "relation")
      );

      if (typeof window !== 'undefined') {
        const accessToken = window.localStorage.getItem(AppConstants.ACCESS_TOKEN);
        setToken(accessToken ?? '');
      }

      axios
        .post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
          {
            query: query,
            variables: {},
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          let relatedEntities: any = {};
          dataTable.filters
            .filter((f: any) => f.type === "relation")
            .map((f: any) => {
              relatedEntities[f.relatedEntity] =
                res.data.data[f.relatedEntity].data;
            });

          setRelations(relatedEntities);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTable]);

  console.log(filters);

  return (
    <div className="p-10 text-black flex-1 overflow-auto">
      {/* <div className="p-5 pl-10 border-solid border-whiteflex flex-col text-black"></div> */}
      {dataTable.filters && dataTable.filters.length > 0 && (
        <div className="grid gap-4 gap-x-0.5 grid-cols-1 md:grid-cols-4 lg:grid-cols-6 bg-none rounded-lg border-gray-400 border-2  border-solid p-3 mb-5">
          {dataTable.filters.map((f: any) => {
            if (f.type === "text") {
              return (
                <FilterTextItem
                  key={f.id}
                  item={f}
                  onChange={(e: any) => {
                    let temp = [...filters];
                    let itemidx = temp.findIndex((i) => i.id === f.id);
                    temp[itemidx] = {
                      ...temp[itemidx],
                      value: e.target.value,
                    };
                    setFitlers(temp);
                  }}></FilterTextItem>
              );
            } else if (f.type === "enum") {
              return (
                <FilterEnumItem
                  key={f.id}
                  item={f}
                  onChange={(e: any) => {
                    let temp = [...filters];
                    let itemidx = temp.findIndex((i) => i.id === f.id);
                    temp[itemidx] = {
                      ...temp[itemidx],
                      value: e.target.value,
                    };
                    setFitlers(temp);
                  }}></FilterEnumItem>
              );
            } else if (f.type === "daterange") {
              return (
                <FilterDateRangeItem
                  key={f.id}
                  item={f}
                  onStartChange={(e: any) => {
                    let temp = [...filters];
                    let itemidx = temp.findIndex((i) => i.id === f.id);
                    let oldValue = temp[itemidx].value || {};

                    let newValue = {
                      ...oldValue,
                      start: e.target.value,
                    };

                    temp[itemidx] = {
                      ...temp[itemidx],
                      value: newValue,
                    };
                    setFitlers(temp);
                  }}
                  onEndChange={(e: any) => {
                    let temp = [...filters];
                    let itemidx = temp.findIndex((i) => i.id === f.id);
                    let oldValue = temp[itemidx].value || {};

                    let newValue = {
                      ...oldValue,
                      end: e.target.value,
                    };

                    temp[itemidx] = {
                      ...temp[itemidx],
                      value: newValue,
                    };
                    setFitlers(temp);
                  }}></FilterDateRangeItem>
              );
            } else if (f.type === "relation") {
              return (
                <FilterRelationItem
                  key={f.id}
                  accessor={f.accessor}
                  entityRecords={relations[f.relatedEntity] || []}
                  item={f}
                  onChange={(e: any) => {
                    let temp = [...filters];
                    let itemidx = temp.findIndex((i) => i.id === f.id);
                    temp[itemidx] = {
                      ...temp[itemidx],
                      value: e.target.value,
                    };
                    setFitlers(temp);
                  }}></FilterRelationItem>
              );
            }
          })}
          {/* <button
            onClick={(e) => {
              getData();
            }}
            className="h-7 pr-3 pl-3 ml-3 flex justify-center items-center lg:w-auto text-center uppercase tracking-wide font-semibold text-base md:text-sm hover:border-2 rounded-md hover:border-primary-600 cursor-pointer bg-blue-600">
            Apply
          </button> */}
        </div>
      )}
      <div className="flex items-center justify-end gap-2">
        {loading && "Loading..."}
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex} of {table.getPageCount()}
          </strong>
        </span>
        <select
          className=""
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(1)}
          disabled={!table.getCanPreviousPage()}>
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}>
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}>
          {">>"}
        </button>

        {/* <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span> */}
      </div>
      <div className="h-2" />
      {!authLoading && canView && (
        <table className="border-solid border-2">
          <thead className="border-solid border-2 rounded-lg border-gray-400">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <th
                  key={"action"}
                  //colSpan={header.colSpan}
                  className="border-solid border-2 px-7 border-gray-400">
                  Action
                </th>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="border-solid border-2 px-7 border-gray-400">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="border-solid border-2 border-gray-400">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-solid border-2 border-gray-400">
                <td
                  key={row.id}
                  className="border-solid border-2 px-7 border-gray-400">
                  {canViewSingleRecord && (
                    <button
                      className="border-solid  rounded-md p-1 m-1 border-gray-400 border-2  cursor-pointer hover:bg-slate-500 active:bg-slate-700"
                      onClick={() => {
                        viewRecord(row.original.id);
                      }}>
                      View
                    </button>
                  )}
                  {canDelete && (
                    <button
                      className="border-solid border-2 rounded-md p-1 m-1 border-gray-400 cursor-pointer hover:bg-slate-500 active:bg-slate-700"
                      onClick={() => {
                        let confimation = confirm(
                          "Are you sure you want to delete this entry?"
                        );
                        confimation && deleteRecord(row.original.id);
                      }}>
                      Delete
                    </button>
                  )}
                </td>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border-solid border-2 px-7 border-gray-400">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function getGraphQlDataName(dataName: string) {
  let dataNameParts = dataName.split("-");
  let graphQlDataName = dataNameParts[0];
  if (dataNameParts.length > 1) {
    for (let i = 1; i < dataNameParts.length; i++) {
      graphQlDataName +=
        dataNameParts[i].charAt(0).toUpperCase() + dataNameParts[i].slice(1);
    }
  }

  return graphQlDataName;
}

function contructTableQuery(
  dataName: string,
  columns: any,
  page: string,
  filters: any
) {
  let graphQlDataName = getGraphQlDataName(dataName);
  let filterItemsStr: Array<string> = [];

  filters.map((f: any) => {
    if (f.value) {
      if (f.type === "relation") {
        filterItemsStr.push(
          `${f.relatedEntity}:{${f.accessor}:{eq:"${f.value}"}}`
        );
      } else if (f.type === "daterange") {
        let temp = `${f.accessor}:{`;
        if (f.value.start && f.value.end) {
          temp += `gte:"${f.value.start}:00Z",lt:"${f.value.end}:00Z"`;
        } else if (f.value.start) {
          temp += `gte:"${f.value.start}:00Z"`;
        } else if (f.value.end) {
          temp += `lt:"${f.value.end}:00Z"`;
        }
        temp += `}`;
        filterItemsStr.push(temp);
      } else {
        filterItemsStr.push(`${f.accessor}:{eq:"${f.value}"}`);
      }
    }
  });

  let query = `query {
    ${graphQlDataName}(pagination:{page:${page},pageSize:25}`;

  if (filterItemsStr.length > 0) {
    query += `,filters:{`;

    query += filterItemsStr.join(",");

    query += "}";
  }

  query += `){
      meta{
        pagination{
          total
          page
          pageSize
          pageCount
        }
      }
      data{
        id
        attributes{
    `;

  columns.map((c: any) => {
    if (c.type === "relation") {
      query += `${getGraphQlDataName(c.relatedEntity)}{
        data{
          id
          attributes{
            ${c.accessorField}
          }
        }  
      }
      `;
    } else {
      query += `${c.accessorField}     
      `;
    }
  });

  query += `
        }
      }
    }
  }
  `;

  return query;
}

function construnctFilterReletedEntityQuery(relatedEntities: any) {
  let query = `query {`;

  relatedEntities.map((r: any) => {
    query += `${r.relatedEntity}{`;
    query += `data{
          id
          attributes{
            ${r.accessor}
          }`;
    query += `}
        }`;
  });

  query += `}`;

  return query;
}

export default DataTable;
