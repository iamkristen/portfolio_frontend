import React, { useCallback } from "react";
import { useBlogsData } from "../../context/blog";
import Title from "../home/Title";
import BlogCard from "./BlogCard";
import Loader from "../loader/loader";

const Blog = () => {
  const { blogsData, isLoading } = useBlogsData();

  const renderBlogCard = useCallback(
    (blog) => (
      <div className="px-6" key={blog._id}>
        <BlogCard
          image={blog.banner}
          title={new Date(blog.createdAt).toLocaleDateString()}
          subTitle={blog.title}
          category={blog.type}
          blogId={blog._id}
        />
      </div>
    ),
    [] // Remove 'blogsData' from dependency array
  );

  if (isLoading) {
    return <Loader />;
  }

  if (!blogsData || blogsData.length === 0) {
    return <div>No blog posts found.</div>;
  }

  return (
    <div>
      <Title title="Latest" subTitle="Posts" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lgl:gap-10">
        {blogsData.map(renderBlogCard)}
      </div>
    </div>
  );
};

export default React.memo(Blog);
