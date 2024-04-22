import { poppins } from "@/front/fonts";

export default function CarContentCreater({
  items,
}: {
  items: { title: string; value: any }[] | Array<[string, any]>;
}) {
  return (
    <div className="container-bg">
      {items.map((item) => {
        let title: string;
        let value: string;
        if (Array.isArray(item)) {
          title = item[0];
          value = item[1];
        } else {
          title = item.title;
          value = item.value;
        }
        return (
          <div className="item">
            <span className={`item-title ${poppins.className}`}>{title}</span>
            <span className={`item-value ${poppins.className}`}>{value}</span>
          </div>
        );
      })}
    </div>
  );
}
