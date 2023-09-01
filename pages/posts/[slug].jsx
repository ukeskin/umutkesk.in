import React from "react";
import Head from "next/head";
import Nav from "components/Nav";

import { allPosts, Post } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";

export async function getStaticPaths() {
  const paths = allPosts.map((post) => post.url);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  return {
    props: {
      post,
    },
  };
}

const PostLayout = ({ post }) => {
  const MDXContent = useMDXComponent(post.body.code);

  const ogImage = "https://umutkesk.in/api/og?title=" + post.title;

  return (
    <div className="max-w-4xl mx-auto">
      <Head>
        <title>{post.title}</title>
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={post.title} />
        <meta property="og:image:type" content="image/png" />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <div className="px-4 relative">
        <Nav title={post.title} />
        <article className="prose dark:prose-invert mb-20 mx-auto">
          <MDXContent />
        </article>
      </div>
    </div>
  );
};

export default PostLayout;
