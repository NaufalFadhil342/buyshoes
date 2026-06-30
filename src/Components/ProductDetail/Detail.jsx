const Detail = ({ product }) => {
  const details = product?.detail;

  return (
    <ul className="w-full grid grid-cols-2 gap-y-4 gap-x-8 lg:pr-12">
      {details.map((list, index) => (
        <li key={index} className="flex items-center gap-3">
          <span className="block size-1.5 rounded-full shrink-0 bg-current" />
          <>{list}</>
        </li>
      ))}
    </ul>
  );
};

export default Detail;
