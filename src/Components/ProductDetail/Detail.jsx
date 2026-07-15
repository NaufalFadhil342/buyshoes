const DETAIL_FIELDS = [
  { key: "color", label: "Color" },
  { key: "weight", label: "Weight" },
  { key: "midsole_drop", label: "Midsole drop" },
  { key: "product_code", label: "Product code" },
];

const Detail = ({ product }) => {
  const detail = product?.detail;

  if (!detail) return null;

  const featureItems = detail.features ?? [];
  const attributeItems = DETAIL_FIELDS.filter(({ key }) => detail[key]).map(
    ({ key, label }) => `${label}: ${detail[key]}`,
  );
  const items = [...featureItems, ...attributeItems];

  if (items.length === 0) return null;

  return (
    <ul className="w-full grid grid-cols-2 gap-y-4 gap-x-8 lg:pr-12">
      {items.map((text) => (
        <li key={text} className="flex items-center gap-3">
          <span className="block size-1.5 rounded-full shrink-0 bg-current" />
          <span className="text-primary">{text}</span>
        </li>
      ))}
    </ul>
  );
};

export default Detail;
