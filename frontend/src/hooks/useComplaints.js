import { useContext } from "react";
import { ComplaintContext } from "../context/ComplaintContext";

function useComplaints() {
  return useContext(ComplaintContext);
}

export default useComplaints;