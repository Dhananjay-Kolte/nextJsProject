"use client";

import useAuth from "@/app/_auth/useAuth";
import { AppConstants } from "@/app/constants";
import {
  RecordAttributeType,
  RecordType,
  RelationEnum,
  StrapiAttributeTypeEnum,
} from "@/types/record-type";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import AsyncSelect from "react-select/async";

function RecordCrud({
  recordSchema,
  relatedSchemas,
  //relatedComponents,
  recordData,
  crudElement,
}: {
  recordSchema: RecordType;
  relatedSchemas: Array<RecordType>;
  recordData: any;
  crudElement: any;
}) {
  //console.log(recordSchema);
  //   console.log(relatedSchemas);
  //   console.log(relatedComponents);
  console.log(recordData);

  const router = useRouter();

  let [formData, setFormData] = useState<any>(recordData.attributes);
  let [relationalFilterData, setRelationalFilterData] = useState<
    Record<string, any>
  >({});

  let [relatedData, setRelatedData] = useState<any>();
  let [loading, setLoading] = useState(true);

  const { authLoading, canUpdateRecord, canViewRecord, userRole } = useAuth();

  useEffect(() => {
    let token;
    if (typeof window !== 'undefined') {
      token = window.localStorage.getItem(AppConstants.ACCESS_TOKEN);
    }
    let query = construnctReletedEntityQuery(relatedSchemas);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
        { query: query, variables: {} },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setRelatedData(res.data.data);
        // axios
        //   .get(
        //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users-permissions/roles/${res.data.data.me.role.id}?populate=*`,
        //     {
        //       headers: {
        //         Authorization: `Bearer ${token}`,
        //       },
        //     }
        //   )
        //   .then((res) => {
        //     setUserRole(res.data.role);
        //   })
        //   .finally(() => {
        //     setLoading(false);
        //   });
        // axios
        //   .get(``, {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   })
        //   .then((res) => {})
        //   .finally(() => {

        //   });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [relatedSchemas]);

  let inputFields = useMemo(() => {
    if (loading) {
      return <></>;
    }
    return Object.keys(recordSchema.schema.attributes)
      .filter(
        (a: any) =>
          recordSchema.schema.attributes[a].type !==
          StrapiAttributeTypeEnum.relation &&
          recordSchema.schema.attributes[a].type !==
          StrapiAttributeTypeEnum.media &&
          recordSchema.schema.attributes[a].type !==
          StrapiAttributeTypeEnum.component
      )
      .map((a: any, idx: number) => {
        let attr = recordSchema.schema.attributes[a];
        return renderAttribute(
          a + idx, // key
          a, // attribute name
          userRole?.name || "", // user role
          attr, // attribute def
          (e: any) => {
            setFormData({ ...formData, [a]: e.target.value });
          },
          formData[a]
        );
      });
  }, [recordSchema, formData, loading, userRole]);

  let relationFields = useMemo(() => {
    if (loading) {
      return <></>;
    }
    return Object.keys(recordSchema.schema.attributes)
      .filter(
        (a: any) =>
          recordSchema.schema.attributes[a].type ===
          StrapiAttributeTypeEnum.relation &&
          (recordSchema.schema.attributes[a].relation ===
            RelationEnum.manyToOne ||
            recordSchema.schema.attributes[a].relation ===
            RelationEnum.manyToMany) &&
          a !== "organization"
      )
      .map((a: any, idx: number) => {
        if (!recordSchema.schema.attributes[a].pluralName) {
          return <></>;
        }
        let graphqlName = getGraphQlDataName(
          recordSchema.schema.attributes[a].pluralName
        );

        return (
          <>
            {recordSchema.schema.attributes[a].relation ===
              RelationEnum.manyToOne && (
              <RenderRelation
                updateCurrentSelection={(r: any) => {
                  setFormData({ ...formData, [a]: r });
                }}
                attribute={recordSchema.schema.attributes[a]}
                setFilters={(d: any) => {
                  //setRelationalFilterData({ ...relationalFilterData, [a]: d });
                }}
                key={a + idx}
                name={a}
                currentSelection={formData[a]}
                relatedData={relatedData}></RenderRelation>
            )}
            {recordSchema.schema.attributes[a].relation ===
              RelationEnum.manyToMany && (
              <RenderManytoManyRelation
                updateCurrentSelection={(r: any) => {
                  setFormData({ ...formData, [a]: { data: r } });
                }}
                attribute={recordSchema.schema.attributes[a]}
                setFilters={(d: any) => {
                  //setRelationalFilterData({ ...relationalFilterData, [a]: d });
                }}
                key={a + idx}
                name={a}
                currentSelection={formData[a]}
                relatedData={relatedData}></RenderManytoManyRelation>
            )}
          </>
        );

        // return (
        //   <div key={a + idx} className="flex w-full flex-col mt-10">
        //     <span>
        //       {nCap} ({relatedSchema.schema.displayName})
        //     </span>
        //     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        //       {Object.keys(relatedSchema.schema.attributes)
        //         .filter(
        //           (ch: any) =>
        //             relatedSchema.schema.attributes[ch].type !== "relation" &&
        //             relatedSchema.schema.attributes[ch].type !== "media" &&
        //             relatedSchema.schema.attributes[ch].type !== "component"
        //         )
        //         .map((ch: any, idx: number) => {
        //           let attr = relatedSchema.schema.attributes[ch];
        //           let aCap = ch[0].toUpperCase() + ch.slice(1);

        //           //.attributes[]

        //           return (
        //             <div key={ch + idx} className="flex flex-col w-80">
        //               <label className="text-sm text-gray-700">{aCap}</label>
        //               <select
        //                 onChange={(e) => {
        //                   setFormData({
        //                     ...formData,
        //                     [a]: { ...formData[a], id: e.target.value },
        //                   });
        //                 }}
        //                 value={formData[a]?.id}
        //                 className="border-gray-400 h-10 border-solid border-2 px-3 rounded-md">
        //                 <option></option>
        //                 {relatedData &&
        //                   relatedData[
        //                     getGraphQlDataName(relatedSchema.schema.pluralName)
        //                   ]?.data.map((d: any) => {
        //                     return (
        //                       <option key={d.id} value={d.id}>
        //                         {d.attributes[ch]}
        //                       </option>
        //                     );
        //                   })}
        //               </select>
        //             </div>
        //           );
        //         })}
        //     </div>
        //   </div>
        // );
      });
  }, [recordSchema, formData, relatedData, loading]);

  function updateRecord() {
    let updateData: any = {};
    console.log(formData);
    Object.keys(recordSchema.schema.attributes).map((key) => {
      if (recordSchema.schema.attributes[key].type === "relation") {
        if (
          recordSchema.schema.attributes[key].relation ===
          RelationEnum.manyToMany
        ) {
          if (
            formData[key] &&
            formData[key].data &&
            formData[key].data.length > 0
          ) {
            updateData[key] = formData[key].data
              .filter((v: any) => v.id)
              .map((v: any) => parseInt(v.id));
          } else {
            updateData[key] = [];
          }
        } else {
          updateData[key] = formData[key]?.data?.id;
        }
      } else if (recordSchema.schema.attributes[key].type === "media") {
        updateData[key] = formData[key]?.id;
      } else if (recordSchema.schema.attributes[key].type === "component") {
      } else {
        updateData[key] = formData[key];
      }
    });

    console.log(updateData);
    let token;
    if (typeof window !== 'undefined') {
      token = window.localStorage.getItem(AppConstants.ACCESS_TOKEN);
    }
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${recordSchema.schema.pluralName}/${recordData.id}`,
        {
          data: updateData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        router.back();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const canView = canViewRecord(recordSchema.uid, recordSchema.apiID);
  const canUpdate = canUpdateRecord(recordSchema.uid, recordSchema.apiID);

  return (
    <div className="p-5 pl-10 border-solid border-whiteflex flex-col text-black">
      <div className="h-10 flex flex-row items-center mb-6">
        <button
          onClick={() => {
            router.back();
          }}
          type="button"
          className=" flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
          <svg
            className="w-5 h-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          <span>back</span>
        </button>
        <h3 className="ml-5 text-xl text-black">{crudElement.displayName}</h3>
      </div>
      {(loading || authLoading) && (
        <div className="flex-1 flex w-full items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-12 h-12 animate-spin"
            viewBox="0 0 16 16">
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
            <path
              fillRule="evenodd"
              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
            />
          </svg>
        </div>
      )}
      {!loading && !authLoading && canView && (
        <>
          <div
            key="input fields wraper"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {inputFields}
          </div>
          {relationFields}

          <div>
            {canUpdate && (
              <button
                onClick={() => {
                  updateRecord();
                }}
                className="w-60 border-gray-400 border-2 mt-10 rounded-md h-10 hover:bg-slate-300 active:bg-slate-500 active:text-white">
                Update
              </button>
            )}
          </div>
        </>
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

function getGraphQlFilterName(dataName: string) {
  let dataNameParts = dataName.split("-");
  let graphQlDataName = "";
  if (dataNameParts.length > 1) {
    for (let i = 0; i < dataNameParts.length; i++) {
      graphQlDataName +=
        dataNameParts[i].charAt(0).toUpperCase() + dataNameParts[i].slice(1);
    }
  }

  return graphQlDataName + "FiltersInput";
}

function construnctReletedEntityQuery(relatedEntities: any) {
  let query = `query {
    `;

  relatedEntities
    .filter((a: any) => a.schema.pluralName !== "organizations")
    .map((r: any) => {
      query += `${getGraphQlDataName(r.schema.pluralName)}{`;
      query += ` 
      meta{
        pagination{
          total
          page
          pageSize
          pageCount
        }
      }`;
      query += `data{
            id
            attributes{
            `;
      Object.keys(r.schema.attributes)
        .filter(
          (at) =>
            r.schema.attributes[at].type !== "relation" &&
            r.schema.attributes[at].type !== "component" &&
            r.schema.attributes[at].type !== "media"
        )
        .map((at) => {
          query += at + "\n";
        });
      query += `}
            }
          }\n`;
    });

  query += `}`;

  return query;
}

function renderAttribute(
  key: string,
  name: string,
  userRole: string = "",
  attribute: RecordAttributeType,
  onChage: any,
  value: any
) {
  let capitalizedName =
    attribute.displayName || name[0].toUpperCase() + name.slice(1);

  // (e) => {
  //   setFormData({ ...formData, [name]: e.target.value });
  // }
  let canEdit = true;
  if (
    attribute.editRoles &&
    attribute.editRoles.length > 0 &&
    attribute.editRoles.filter((r) => r === userRole).length == 0
  ) {
    canEdit = false;
  }

  let canView = true;
  if (
    attribute.viewRoles &&
    attribute.viewRoles.length > 0 &&
    attribute.viewRoles.filter(
      (r) => r.toLowerCase() === userRole.toLowerCase()
    ).length == 0
  ) {
    canView = false;
  }

  let inputFieldRender = <></>;

  if (attribute.type === StrapiAttributeTypeEnum.enumeration) {
    inputFieldRender = (
      <select
        disabled={attribute.readOnly || !canEdit}
        onChange={onChage}
        value={value || ""}
        className="border-gray-400 h-10 border-solid border-2 px-3 rounded-md">
        <option value={""}></option>
        {attribute.enum?.map((op: any) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    );
  } else if (
    attribute.type === StrapiAttributeTypeEnum.media ||
    attribute.type === StrapiAttributeTypeEnum.dynamiczone ||
    attribute.type === StrapiAttributeTypeEnum.relation
  ) {
  } else if (attribute.type === StrapiAttributeTypeEnum.text) {
    inputFieldRender = (
      <textarea
        onChange={onChage}
        disabled={attribute.readOnly || !canEdit}
        value={value || ""}
        className="border-gray-400 h-20 border-solid border-2 px-3 rounded-md"></textarea>
    );
  } else if (attribute.type === StrapiAttributeTypeEnum.date) {
    inputFieldRender = (
      <input
        type="date"
        onChange={onChage}
        disabled={attribute.readOnly || !canEdit}
        value={value || ""}
        className="border-gray-400 h-10 border-solid border-2 px-3 rounded-md"></input>
    );
  } else if (attribute.type === StrapiAttributeTypeEnum.datetime) {
    inputFieldRender = (
      <input
        type="datetime-local"
        onChange={onChage}
        disabled={attribute.readOnly || !canEdit}
        value={value || ""}
        className="border-gray-400 h-10 border-solid border-2 px-3 rounded-md"></input>
    );
  } else if (attribute.type === StrapiAttributeTypeEnum.time) {
    inputFieldRender = (
      <input
        type="time"
        onChange={onChage}
        disabled={attribute.readOnly || !canEdit}
        value={value || ""}
        className="border-gray-400 h-10 border-solid border-2 px-3 rounded-md"></input>
    );
  } else {
    inputFieldRender = (
      <input
        type="text"
        disabled={attribute.readOnly || !canEdit}
        onChange={onChage}
        value={value || ""}
        className="border-gray-400 h-10 border-solid border-2 px-3 rounded-md"></input>
    );
  }

  return (
    <>
      {!attribute.hide && canView && (
        <div key={key} className="flex flex-col w-80">
          <label className="text-sm text-gray-700">{capitalizedName}</label>
          {inputFieldRender}
        </div>
      )}
    </>
  );
}

function RenderRelation({
  name,
  // key,
  attribute,
  updateCurrentSelection,
  setFilters,
  currentSelection,
  hideHeader,
}: {
  name: string;
  // key: string;
  attribute: RecordAttributeType;
  relatedData: any;
  updateCurrentSelection: any;
  setFilters: any;
  currentSelection: any;
  hideHeader?: boolean;
}) {
  const [filterData, setFilterData] = useState<any>(
    currentSelection?.data?.attributes || {}
  );

  const [relatedData, setRelatedData] = useState<Array<any>>();

  const [fetchedRecord, setFetchedRecord] = useState<any>();

  const token = useMemo(() => {
    if (typeof window !== 'undefined') {
      let token = window.localStorage.getItem(AppConstants.ACCESS_TOKEN);
      return token;
    }
  }, []);

  const filterableChildAttributes = useMemo(() => {
    if (attribute.attributes) {
      let relatedAttributes = attribute.attributes;
      return Object.keys(attribute.attributes)
        .filter((r) => relatedAttributes[r].filterPriority)
        .sort((a, b) => {
          if (
            relatedAttributes[a].filterPriority &&
            relatedAttributes[b].filterPriority
          ) {
            return (
              relatedAttributes[a].filterPriority -
              relatedAttributes[b].filterPriority
            );
          } else if (relatedAttributes[a].filterPriority) {
            return -1;
          } else {
            return 1;
          }
        });
    } else {
      return [];
    }
  }, [attribute]);

  useEffect(() => {
    // let token = window.localStorage.getItem(AppConstants.ACCESS_TOKEN);
    let query = constructRelatedEntityQueryWithFilters(attribute, filterData);

    if (!query) {
      return;
    }

    let attributeGraphqlName = getGraphQlDataName(attribute.pluralName);
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`, query, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRelatedData(res.data.data[attributeGraphqlName].data);
        let uniqukey =
          filterableChildAttributes[filterableChildAttributes.length - 1];

        // if(uniqukey && filterData[uniqukey] && res.data.data[attributeGraphqlName].data[0]){

        // }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        //setFilters({ ...filterData });
      });
  }, [
    attribute,
    filterData,
    setFilters,
    token,
    filterableChildAttributes,
    updateCurrentSelection,
  ]);

  useEffect(() => {
    if (
      currentSelection &&
      currentSelection.data &&
      currentSelection.data.id &&
      attribute.pluralName
    ) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${attribute.pluralName}/${currentSelection.data.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res && res.data && res.data.data && res.data.data.attributes) {
            setFetchedRecord(res.data.data.attributes);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          //setFilters({ ...filterData });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSelection, setFetchedRecord]);

  if (!attribute || !attribute.attributes) {
    return <></>;
  }

  let capitalizedName =
    attribute.displayName || name[0].toUpperCase() + name.slice(1);
  let relatedAttributes = attribute.attributes;

  // console.log(filterData);
  // console.log(relatedAttributes);

  // console.log(fetchedRecord);

  return (
    <>
      <div className="flex w-full flex-col mt-10">
        {!hideHeader && <span>{capitalizedName}</span>}
        <div
          key={"abc"}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Object.keys(relatedAttributes)
            .filter(
              (ch: any) =>
                relatedAttributes[ch].type !==
                StrapiAttributeTypeEnum.relation &&
                relatedAttributes[ch].type !== StrapiAttributeTypeEnum.media &&
                relatedAttributes[ch].type !== StrapiAttributeTypeEnum.component
            )
            .sort((a, b) => {
              if (
                relatedAttributes[a].filterPriority &&
                relatedAttributes[b].filterPriority
              ) {
                return (
                  relatedAttributes[a].filterPriority -
                  relatedAttributes[b].filterPriority
                );
              } else if (relatedAttributes[a].filterPriority) {
                return -1;
              } else {
                return 1;
              }
            })
            .map((ch: any, idx: number) => {
              let attr = relatedAttributes[ch];
              let attributeNameCapitalized =
                relatedAttributes[ch]?.displayName ||
                ch[0].toUpperCase() + ch.slice(1);

              //.attributes[]

              if (attr.hide) {
                return <></>;
              }

              let attributeGraphqlName: any = getGraphQlDataName(
                attribute.pluralName
              );

              async function filterFn(input: any) {
                let filterVariable: any = {};

                for (let i = 1; i < relatedAttributes[ch].filterPriority; i++) {
                  filterVariable[filterableChildAttributes[i - 1]] = {
                    eq: filterData[filterableChildAttributes[i - 1]],
                  };
                }

                filterVariable[ch] = {
                  startsWith: input,
                };

                let query = constructRelatedEntityQueryWithSingleFilter(
                  attribute,
                  filterVariable
                );
                let searchRs = await axios
                  .post(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
                    query,
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then((res) => res.data);

                let options = searchRs?.data[attributeGraphqlName].data.map(
                  (d: any) => {
                    return {
                      value: d.attributes[ch],
                      label: d.attributes[ch],
                      id: d.id,
                      data: d.attributes,
                    };
                  }
                );
                return _.uniqBy(options, (r: any) => {
                  return r.value;
                });
              }

              let defaultoptions: any = _.uniqBy(
                relatedData?.map((d) => {
                  return {
                    value: d.attributes[ch],
                    label: d.attributes[ch],
                    id: d.id,
                    data: d.attributes,
                  };
                }),
                (r: any) => {
                  return r.value;
                }
              );

              let selectedValue = {
                value: filterData[ch],
                label: filterData[ch],
              };

              if (fetchedRecord && fetchedRecord[ch]) {
                selectedValue = {
                  value: fetchedRecord[ch],
                  label: fetchedRecord[ch],
                };
              }

              return (
                <div key={ch + idx} className="flex flex-col w-80">
                  <label className="text-sm text-gray-700">
                    {attributeNameCapitalized}
                  </label>
                  <AsyncSelect
                    isDisabled={
                      filterableChildAttributes.findIndex((c) => c === ch) < 0
                    }
                    cacheOptions
                    isClearable={true}
                    defaultOptions={defaultoptions}
                    loadOptions={filterFn}
                    value={selectedValue}
                    onChange={(val: any) => {
                      //  console.log(val);

                      let newFilterData: any = {};
                      for (
                        let i = 1;
                        i < relatedAttributes[ch].filterPriority;
                        i++
                      ) {
                        newFilterData[filterableChildAttributes[i - 1]] =
                          filterData[filterableChildAttributes[i - 1]];
                      }

                      newFilterData[ch] = val?.value || undefined;

                      setFilterData(newFilterData);
                      if (relatedAttributes[ch].isUnique && val) {
                        updateCurrentSelection({
                          data: {
                            id: val.id,
                            attributes: val.data,
                          },
                        });
                      }
                      if (!val) {
                        setFetchedRecord(null);
                      }
                    }}
                  />
                </div>
              );
            })}
        </div>
      </div>
      {!hideHeader && (
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      )}
    </>
  );
}

function RenderManytoManyRelation({
  name,
  // key,
  attribute,
  updateCurrentSelection,
  setFilters,
  currentSelection,
}: {
  name: string;
  // key: string;
  attribute: RecordAttributeType;
  relatedData: any;
  updateCurrentSelection: any;
  setFilters: any;
  currentSelection: any;
}) {
  // const [selections, setSelections] = useState<any>(
  //   currentSelection?.data || []
  // );

  console.log(currentSelection);

  const token = useMemo(() => {
    if (typeof window !== 'undefined') {
      let token = window.localStorage.getItem(AppConstants.ACCESS_TOKEN);
      return token;
    }
  }, []);

  if (!attribute || !attribute.attributes) {
    return <></>;
  }

  let capitalizedName =
    attribute.displayName || name[0].toUpperCase() + name.slice(1);

  return (
    <>
      <div className="flex w-full flex-col mt-10">
        <span>{capitalizedName}</span>
        {currentSelection?.data?.map((s: any, idx: number) => {
          return (
            <RenderRelation
              hideHeader={true}
              updateCurrentSelection={(r: any) => {
                //setFormData({ ...formData, [a]: r });
                console.log("==========");
                console.log(r);
                console.log("==========");

                if (r && r.data) {
                  let temp = [...currentSelection?.data];
                  temp[idx] = r.data;
                  updateCurrentSelection(temp);
                }

                // setSelections(temp);
              }}
              attribute={attribute}
              setFilters={(d: any) => {
                //setRelationalFilterData({ ...relationalFilterData, [a]: d });
              }}
              key={"abc" + idx}
              name={"abc"}
              currentSelection={{ data: s }}
              relatedData={null}></RenderRelation>
          );
        })}
        <button
          onClick={() => {
            //   updateRecord();
            updateCurrentSelection([...currentSelection?.data, {}]);
          }}
          className="w-60 border-gray-400 border-2 mt-10 rounded-md h-10 hover:bg-slate-300 active:bg-slate-500 active:text-white">
          + New Item
        </button>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      </div>
    </>
  );
}

function constructRelatedEntityQueryWithFilters(
  entity: RecordAttributeType,
  filters: any
) {
  if (!entity.attributes) {
    return null;
  }

  let filterKeys = Object.keys(entity.attributes)
    .filter(
      (ch: any) =>
        entity.attributes &&
        entity.attributes[ch].type !== StrapiAttributeTypeEnum.relation &&
        entity.attributes[ch].type !== StrapiAttributeTypeEnum.media &&
        entity.attributes[ch].type !== StrapiAttributeTypeEnum.component &&
        entity.attributes[ch].filterPriority &&
        filters[ch]
    )
    .sort((a, b) => {
      if (
        entity.attributes &&
        entity.attributes[a].filterPriority &&
        entity.attributes[b].filterPriority
      ) {
        return (
          entity.attributes[a].filterPriority -
          entity.attributes[b].filterPriority
        );
      } else if (entity.attributes && entity.attributes[a].filterPriority) {
        return -1;
      } else {
        return 1;
      }
    });

  // if (filterKeys.length === 0) {
  //   return null;
  // }
  // console.log(filters[filterKeys[0]]);

  const graphqlName = getGraphQlDataName(entity.pluralName);

  const filterQLName = getGraphQlFilterName(entity.singularName);

  let query = `query($filters:${filterQLName}) {
    `;
  query += `${graphqlName}(pagination:{limit:50}`;
  if (
    filterKeys.length > 0 ||
    !(filterKeys.length == 1 && entity.attributes[0].isUnique)
  ) {
    query += `,filters:$filters`;
  }
  query += `){`;
  query += ` 
    meta{
      pagination{
        total
        page
        pageSize
        pageCount
      }
    }`;
  //$startsWithi
  query += `data{
      id
      attributes{
      `;
  Object.keys(entity.attributes)
    .filter(
      (at) =>
        entity.attributes &&
        entity.attributes[at]?.type !== StrapiAttributeTypeEnum.relation &&
        entity.attributes[at]?.type !== StrapiAttributeTypeEnum.component &&
        entity.attributes[at]?.type !== StrapiAttributeTypeEnum.media
    )
    .map((at) => {
      query += at + "\n";
    });

  query += `}
    }
  }\n`;
  query += `}`;

  let variables: any = {
    filters: {},
  };

  filterKeys.map((f) => {
    if (entity.attributes && entity.attributes[f].isUnique) {
      // variables.filters[f] = { startsWith: filters[filterKeys[0]] };
    } else {
      variables.filters[f] = { startsWith: filters[f] };
    }
  });

  return { query: query, variables };
}

function constructRelatedEntityQueryWithSingleFilter(
  entity: RecordAttributeType,
  filters: any
) {
  if (!entity.attributes) {
    return null;
  }

  let graphqlName = getGraphQlDataName(entity.pluralName);

  const filterQLName = getGraphQlFilterName(entity.singularName);

  let query = `query($filters:${filterQLName}) {
    `;
  query += `${graphqlName}(pagination:{limit:50},filters:$filters){`;
  query += ` 
    meta{
      pagination{
        total
        page
        pageSize
        pageCount
      }
    }`;
  //$startsWithi
  query += `data{
      id
      attributes{
      `;
  Object.keys(entity.attributes)
    .filter(
      (at) =>
        entity.attributes &&
        entity.attributes[at]?.type !== StrapiAttributeTypeEnum.relation &&
        entity.attributes[at]?.type !== StrapiAttributeTypeEnum.component &&
        entity.attributes[at]?.type !== StrapiAttributeTypeEnum.media
    )
    .map((at) => {
      query += at + "\n";
    });

  query += `}
    }
  }\n`;
  query += `}`;

  let variables: any = {
    filters,
  };

  return { query: query, variables };
}

export default RecordCrud;
