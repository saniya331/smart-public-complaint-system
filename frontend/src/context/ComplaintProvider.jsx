import { useEffect, useState } from "react";
import { ComplaintContext } from "./ComplaintContext";

const initialComplaints = [
  {
    id: "GRV-2026-1048",
    title: "Streetlight not working",
    category: "Electricity",
    location: "Miyapur, Hyderabad",
    date: "20 Aug 2026",
    status: "In Progress",
  },
  {
    id: "GRV-2026-1042",
    title: "Garbage collection delay",
    category: "Sanitation",
    location: "Gachibowli, Hyderabad",
    date: "18 Aug 2026",
    status: "Resolved",
  },
  {
    id: "GRV-2026-1036",
    title: "Pothole on main road",
    category: "Roads & Transport",
    location: "Kukatpally, Hyderabad",
    date: "15 Aug 2026",
    status: "Assigned",
  },
];

function ComplaintProvider({ children }) {
  const [complaints, setComplaints] = useState(() => {
    const savedComplaints = localStorage.getItem("complaints");

    return savedComplaints
      ? JSON.parse(savedComplaints)
      : initialComplaints;
  });

  useEffect(() => {
    localStorage.setItem("complaints", JSON.stringify(complaints));
  }, [complaints]);

  function addComplaint(complaintData) {
    const newComplaint = {
      id: `GRV-2026-${1049 + complaints.length}`,
      title: complaintData.title,
      category: complaintData.category,
      location: `${complaintData.mandal}, ${complaintData.district}`,
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Submitted",
    };

    setComplaints((previousComplaints) => [
      newComplaint,
      ...previousComplaints,
    ]);

    return newComplaint;
  }

  return (
    <ComplaintContext.Provider value={{ complaints, addComplaint }}>
      {children}
    </ComplaintContext.Provider>
  );
}

export default ComplaintProvider;