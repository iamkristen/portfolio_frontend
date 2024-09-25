import React, { useState, useEffect, useCallback } from "react";
import { useBlogsData } from "../../context/blog";
import Title from "../home/Title";
import BlogCard from "./BlogCard";
import Loader from "../loader/loader";

const Blog = () => {
  const { blogsData, isLoading } = useBlogsData();
  const [isMobile, setIsMobile] = useState(false);
  const [visibleBlogs, setVisibleBlogs] = useState(3); // Show 3 blogs initially on mobile

  // Detect if the user is on a mobile device
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the width as per your design
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleShowMore = () => {
    setVisibleBlogs((prevCount) => prevCount + 3); // Load 3 more blogs on mobile
  };

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
    [] // Ensure renderBlogCard does not change unless necessary
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
        {blogsData
          .slice(0, isMobile ? visibleBlogs : blogsData.length)
          .map(renderBlogCard)}
      </div>
      {isMobile && visibleBlogs < blogsData.length && (
        <div className="text-center mt-6">
          <button
            onClick={handleShowMore}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(Blog);
