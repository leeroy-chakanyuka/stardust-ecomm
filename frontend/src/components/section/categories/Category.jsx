import React from "react";
import Heading from "../headings/Heading";
import Card from "../../card/card";

export default function Category({ title, data }) {
  return (
    <>
      <Heading title={title} />
      {data
        ? data.map((item, i) => {
            return <Card title={item.title} image={item.image} key={i} />;
          })
        : null}
    </>
  );
}
