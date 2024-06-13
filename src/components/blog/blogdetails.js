import React from "react";
import { useParams } from "react-router-dom";
import { useBlogsData } from "../../context/blog";
import Loader from "../loader/loader";
import Title from "../home/Title";
import "../../custom_CSS/rich-text-editor.css";

const BlogDetailPage = () => {
  const { blogId } = useParams();
  const { blogsData, isLoading } = useBlogsData();

  if (isLoading) {
    return <Loader />;
  }

  const selectedBlog = blogsData.find((blog) => blog._id === blogId);

  if (!selectedBlog) {
    return <div className="text-center text-red-500">Blog post not found.</div>;
  }

  const formattedDate = new Date(selectedBlog.createdAt).toLocaleDateString();

  return (
    <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 z-50">
      <div className="container mx-auto py-8">
        <div className="bg-bodyColor rounded-lg shadow-lg max-w-4xl mx-auto">
          <div className="p-2">
            <img
              src={selectedBlog.banner}
              alt={selectedBlog.title}
              className="w-full h-64 object-cover object-center rounded-t-lg"
              style={{ aspectRatio: "3 / 2" }}
            />
          </div>
          <div className="p-6 flex justify-between items-center">
            <div>
              <Title title={selectedBlog.title} />
            </div>
            <div className="text-sm text-gray-400">{formattedDate}</div>
          </div>
          <div className="p-6">
            <div
              className="rich-text-content"
              dangerouslySetInnerHTML={{ __html: selectedBlog.description }}
            />
            {selectedBlog.link && (
              <div className="mt-6">
                <a
                  href={selectedBlog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow"
                >
                  View Blog
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
