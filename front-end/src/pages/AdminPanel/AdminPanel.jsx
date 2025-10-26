import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

const AdminPanel = () => {
  return (
    <section className="bg-pink-300 h-screen flex items-center justify-center">
      <div className="py-[8rem] mx-auto md:max-w-7xl">
        <Link
          to="/backoffice"
          className={clsx(
            "relative font-normal text-xl text-stone-950 -top-4",
            "before:content[''] before:absolute before:w-0 before:h-[2px] before:rounded-xs before:bg-stone-950 before:bottom-[-.25rem] before:left-0 before:transition-all before:duration-300 hover:before:w-full"
          )}
        >
          Go to Backoffice
        </Link>
        <div className="bg-white/20 px-18 py-8 rounded-2xl">
          <h2 className="font-normal text-5xl">Admin Panel</h2>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
