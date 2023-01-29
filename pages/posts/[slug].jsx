import Head from "next/head";
import Link from "next/link";
import Logo from "../../assets/svgs/logo.svg";
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

  return (
    <div className="px-4">
      <header className="max-w-2xl mx-auto flex items-center py-8 bg-[#121212] mb-4">
        <Link href="/">
          <Logo className="w-12 mr-4 cursor-pointer" />
        </Link>
        <h2 className="pl-3 border-l-2 border-red-600">Public Notes</h2>
      </header>
      <article className="max-w-2xl mx-auto">
        <Head>
          <title>{post.title}</title>
        </Head>
        <h1>{post.title}</h1>
        <MDXContent />
      </article>
    </div>
  );
};

export default PostLayout;
