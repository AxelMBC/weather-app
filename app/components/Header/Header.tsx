
"use client"

import {useRouter} from "next/navigation"
const Header = () => {
  const router = useRouter()
  return (
    <div className="w-100 d-flex align-items-center border-header fc-dark p-4" onClick={()=>router.push("/")}>
      <p className="m-0"> <i className="fas fa-cloud pe-2"></i>Climate Change App</p>
    </div>
  );
};

export default Header;
