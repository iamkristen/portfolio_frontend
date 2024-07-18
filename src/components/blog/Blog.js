import React from "react";
import { useBlogsData } from "../../context/blog"; // Make sure the path is correct
import Title from "../home/Title";
import BlogCard from "./BlogCard";

const Blog = () => {
  const { blogsData, isLoading } = useBlogsData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!blogsData || blogsData.length === 0) {
    return <div>No blog posts found.</div>;
  }

  return (
    <div>
      <Title title="Latest" subTitle="Posts" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lgl:gap-10">
        {blogsData.map((blog) => (
          <div className="px-6" key={blog._id}>
            <BlogCard
              image={blog.banner}
              title={new Date(blog.createdAt).toLocaleDateString()} // Assuming you want to display the creation date
              subTitle={blog.title}
              category={blog.type}
              blogId={blog._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
