/* eslint-disable react/prop-types */
import { forwardRef } from "react";

const PicItem = forwardRef(function PicItem({ pic }, ref) {
   
  let content = ref ? (
    <div ref={ref}>
      <img src={pic.thumbnailUrl} />
    </div>
  ) : (
    <div>
      <img src={pic.thumbnailUrl} />
    </div>
  );

  return content;
});

export default PicItem;
