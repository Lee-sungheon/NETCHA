import React from "react";

export default function PersonImage({ name }) {
  const imageSrc = "/images/" + { name }.name + ".jpg";
  
  return <img className="actorImage" src={imageSrc} alt={name} title={name} />;
}
