import { DefaultLayout } from "@/components";
import { marked } from "marked";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React from "react";

const defaultText = `# Heading
## Subheading
[Link](https://www.example.com/)
\`inline code\`
\`\`\`
// code block
const example = "example";
\`\`\`
- list item
> blockquote
![Image](https://picsum.photos/200/300 "Placeholder Image")
**bolded text**
`;

const MarkdownPreviewer: NextPageWithLayout = () => {
  const [text, setText] = React.useState(defaultText);

  const getMarkup = (markdown: string): { __html: string } => {
    const html = marked(markdown, { breaks: true });
    return { __html: html };
  };

  return (
    <>
      <Head>
        <title>Markdown Previewer</title>
      </Head>

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-4">
          Markdown Previewer
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label htmlFor="editor" className="font-bold block mb-2">
              Editor
            </label>

            <textarea
              name="editor"
              id="editor"
              className="w-full h-80 lg:h-96 p-2 border border-gray-300 rounded-md resize-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="preview" className="font-bold block mb-2">
              Preview
            </label>
            <div
              id="preview"
              className="border border-gray-300 p-2 rounded-md h-80 lg:h-96 overflow-y-scroll"
              dangerouslySetInnerHTML={getMarkup(text)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

MarkdownPreviewer.getLayout = (page: React.ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export default MarkdownPreviewer;
