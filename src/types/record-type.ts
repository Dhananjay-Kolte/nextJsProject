export interface RecordType {
  uid: string;
  apiID: string;
  schema: SchemaType;
}
export interface SchemaType {
  draftAndPublish: boolean;
  displayName: string;
  singularName: string;
  pluralName: string;
  description: string;
  kind: string;
  collectionName?: string;
  attributes: Record<string, RecordAttributeType>;
}

export interface RecordAttributeType {
  displayName?: string;
  readOnly?: boolean;
  hide?: boolean;
  editRoles?: Array<string>;
  viewRoles?: Array<string>;
  type: StrapiAttributeTypeEnum;
  components?: Array<string>;
  targetField?: string;
  allowedTypes?: Array<string>;
  private?: boolean;
  multiple?: boolean;
  required?: boolean;
  repeatable?: boolean;
  component?: string;
  relation?: string;
  target?: string;
  attributes?: Record<string, RleationalRecordAttributeType>;
  enum?: Array<string>;
  pluralName: string;
  singularName: string;
}

export interface RleationalRecordAttributeType extends RecordAttributeType {
  filterPriority: number;
  isUnique: boolean;
}

export enum RelationEnum {
  manyToOne = "manyToOne",
  oneToMany = "oneToMay",
  manyToMany = "manyToMany",
}
export enum StrapiAttributeTypeEnum {
  string = "string",
  date = "date",
  time = "time",
  relation = "relation",
  enumeration = "enumeration",
  decimal = "decimal",
  json = "json",
  email = "email",
  datetime = "datetime",
  password = "password",
  media = "media",
  uid = "uid",
  dynamiczone = "dynamiczone",
  component = "component",
  text = "text",
  richtext = "richtext",
  blocks = "blocks",
}
