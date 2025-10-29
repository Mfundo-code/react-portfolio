import React from "react";
import BlogHero from "./BlogComponents/BlogHero";
import BlogList from "./BlogComponents/BlogList";
import BlogPostPreview from "./BlogComponents/BlogPostPreview";
import CategoriesList from "./BlogComponents/CategoriesList";
import PopularPosts from "./BlogComponents/PopularPosts";
import SearchBar from "./BlogComponents/SearchBar";
import SubscribeSection from "./BlogComponents/SubscribeSection";

const Blog = () => {
  return (
    <main>
      <div>hey i'm Blog page</div>
      <BlogHero />
      <SearchBar />
      <CategoriesList />
      <BlogList />
      <BlogPostPreview />
      <PopularPosts />
      <SubscribeSection />
    </main>
  );
};

export default Blog;
