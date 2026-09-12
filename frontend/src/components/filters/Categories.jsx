export default function Categories({ types }) {
  return (
    <div>
      {types?.map((type, i) => (
        <div key={i} className="flex">
          <input type="checkbox" name={type.type_id} />
          <label>{type}</label>
        </div>
      ))}
    </div>
  );
}
