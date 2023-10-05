/* eslint-disable react/prop-types */
import { useIsFetching, useIsMutating } from "react-query";
import { CgSpinnerTwo } from "react-icons/cg";

export default function Loading({ size, position,isSubmitting }) {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const display = isFetching || isMutating || isSubmitting ? "block" : "hidden";

  return (
    <span className={`mr-2 ${display} ${position}`}>
      <CgSpinnerTwo className={`${size}  text-gray-400 animate-spin`} />
    </span>
  );
}
