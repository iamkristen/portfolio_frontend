import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ image, title, subTitle, category, blogId }) => {
  return (
    <Link to={`/blogs/${blogId}`} className="blog-card-link">
      <div className="py-6 flex flex-col gap-2 items-center justify-center border-b-[1px] border-b-zinc-800 group">
        <div className="w-full h-full mb-2 overflow-hidden relative cursor-pointer">
          <img
            className="w-full h-full object-cover scale-100 group-hover:scale-110 duration-300 cursor-pointer"
            src={image}
            alt={subTitle}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-designColor border-[1px] border-designColor px-2">
            {category}
          </span>
          <h2 className="text-base text-center font-semibold font-titleFont text-[#ccc] group-hover:text-designColor duration-300">
            {subTitle}
          </h2>
          <p className="text-sm -mt-1 text-gray-400">{title}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
