export function FilterTextItem({ onChange, item }: any) {
  return (
    <div className="p-1">
      <label className="text-sm">{item.displayName}</label>
      <input
        className="h-7 rounded-lg bg-none text-black pl-3 border-gray-400 border-2 w-full"
        onChange={onChange}></input>
    </div>
  );
}

export function FilterEnumItem({ onChange, item }: any) {
  return (
    <div className="p-1">
      <label className="text-sm">{item.displayName}</label>
      <select
        className="h-7 rounded-lg bg-none text-black pl-3 pr-3 border-gray-400 border-2 w-full"
        onChange={onChange}>
        <option value={""} key={"empty value"}></option>
        {item.enumItems.map((i: any) => (
          <option value={i.item} key={i.item}>
            {i.item}
          </option>
        ))}
      </select>
    </div>
  );
}

export function FilterRelationItem({
  onChange,
  item,
  entityRecords,
  accessor,
}: any) {
  return (
    <div className="p-1">
      <label className="text-sm">{item.displayName}</label>
      {item.type === "relation" && (
        <select
          className="h-7 rounded-lg bg-none text-black pl-3 pr-3 border-gray-400 border-2 w-full"
          onChange={onChange}>
          <option value={""} key={"empty value"}></option>
          {entityRecords &&
            entityRecords.map((r: any) => {
              return (
                <option value={r.attributes[accessor]} key={r.id}>
                  {r.attributes[accessor]}
                </option>
              );
            })}
        </select>
      )}
    </div>
  );
}

export function FilterDateRangeItem({ onStartChange, onEndChange, item }: any) {
  return (
    <div className="p-1 col-span-2">
      <label className="text-sm">{item.displayName}</label>
      {item.type === "daterange" && (
        <div className="flex flex-row">
          <input
            className="h-7 rounded-lg bg-none text-black pl-3 mr-3 border-gray-400 border-2"
            type="datetime-local"
            onChange={onStartChange}></input>
          <input
            className="h-7 rounded-lg bg-none text-black pl-3 border-gray-400 border-2"
            type="datetime-local"
            onChange={onEndChange}></input>
        </div>
      )}
    </div>
  );
}

const FilterItems = {
  FilterEnumItem,
  FilterRelationItem,
  FilterDateRangeItem,
  FilterTextItem,
};

export default FilterItems;
