import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Head from 'next/head';
import Link from 'next/link';

const postsDirectory = path.join(process.cwd(), 'src', 'content', 'weekly');

export async function getStaticPaths() {
  const filenames = fs.readdirSync(postsDirectory);
  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.md$/, '') },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const fullPath = path.join(postsDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      slug: params.slug,
      frontmatter: matterResult.data,
      contentHtml,
    },
  };
}

export default function WeeklyPage({ slug, frontmatter, contentHtml }: { slug: string, frontmatter: { title: string, date: string }, contentHtml: string }) {
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
      </Head>
      <div className="container mx-auto px-4 py-8">
        <article className="prose dark:prose-invert lg:prose-xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{frontmatter.title}</h1>
            <p className="text-gray-600 dark:text-gray-400">{frontmatter.date}</p>
          </header>
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>
        <div className="text-center mt-8 print:hidden">
          <button
            onClick={() => window.print()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Print
          </button>
          <Link href="/" legacyBehavior>
            <a className="text-blue-500 hover:underline">← Back to home</a>
          </Link>
        </div>
      </div>
    </>
  );
}
