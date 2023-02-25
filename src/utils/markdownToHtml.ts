import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import prism from "remark-prism";

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .use(prism, {
      transformInlineCode: true,
    })
    .process(markdown);

  return result.toString();
}
