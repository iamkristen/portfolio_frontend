import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet"; // Import Helmet
import axios from "axios";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLink,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import Loader from "../loader/loader";
import Title from "../home/Title";
import "../../custom_CSS/rich-text-editor.css";

const BlogDetailPage = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const currentUrl = window.location.href;

  useEffect(() => {
    const fetchBlogById = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}api/blogs/get/${blogId}`
        );
        setBlog(response.data.data);
      } catch (err) {
        setError("Failed to load the blog post.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogById();
  }, [blogId]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!blog) {
    return <div className="text-center text-red-500">Blog post not found.</div>;
  }

  const formattedDate = new Date(blog.createdAt).toLocaleDateString();

  return (
    <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 z-50">
      {/* Set dynamic meta tags using Helmet */}
      <Helmet>
        <title>{blog.title}</title>
        <meta property="og:title" content={blog.title} />
        <meta
          property="og:description"
          content={blog.description.substring(0, 150)}
        />
        <meta property="og:image" content={blog.banner} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta
          name="twitter:description"
          content={blog.description.substring(0, 150)}
        />
        <meta name="twitter:image" content={blog.banner} />
        <meta name="twitter:url" content={currentUrl} />
      </Helmet>

      <div className="container mx-auto py-2">
        <div className="bg-bodyColor rounded-lg shadow-lg max-w-6xl mx-auto">
          <div className="p-2">
            <img
              src={blog.banner}
              alt={blog.title}
              className="w-full h-64 object-cover object-center rounded-t-lg"
              style={{ aspectRatio: "3 / 2" }}
            />
          </div>
          <div className="p-6 flex justify-between items-center">
            <div>
              <Title title={blog.title} />
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleCopyLink}
                className="text-sm text-gray-400 flex items-center gap-1"
              >
                <FaLink className="text-lg text-gray-400" />
                {copied ? "Copied!" : "Copy Link"}
              </button>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                title="Share on Facebook"
              >
                <FaFacebookF className="text-lg" />
              </a>

              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                title="Share on LinkedIn"
              >
                <FaLinkedin className="text-lg" />
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=Check out this blog!`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                title="Share on Twitter"
              >
                <FaTwitter className="text-lg" />
              </a>

              <a
                href={`https://api.whatsapp.com/send?text=${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                title="Share on WhatsApp"
              >
                <FaWhatsapp className="text-lg" />
              </a>

              <div className="text-sm text-gray-400 ml-4">{formattedDate}</div>
            </div>
          </div>

          <div className="p-6">
            <div
              className="rich-text-content"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
            {blog.link && (
              <div className="mt-6">
                <a
                  href={blog.link}
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

export default React.memo(BlogDetailPage);
