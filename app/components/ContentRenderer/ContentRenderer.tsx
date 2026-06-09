import Image from "next/image";
import React from "react";

import styles from "./style.module.scss";

export type ContentItem = {
  type: string;
  children: ContentItem[];
  level?: number;
  format?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  text?: string;
  image?: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
};

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingTagType = `h${HeadingLevel}`;
type ListTagType = "ul" | "ol";

export interface ContentRendererProps {
  content: ContentItem[];
}

const getKeyBase = (item: ContentItem, depth = 0): string => {
  const safeText = (item.text ?? "").slice(0, 50);

  switch (item.type) {
    case "text":
      return `text:${safeText}:${item.bold ? "b" : ""}${item.italic ? "i" : ""}${
        item.underline ? "u" : ""
      }${item.strikethrough ? "s" : ""}`;
    case "paragraph":
      return `paragraph:${item.strikethrough ? "s" : ""}`;
    case "image":
      return `image:${item.image?.url ?? ""}`;
    case "heading":
      return `heading:${item.level ?? ""}`;
    case "list":
      return `list:${item.format ?? ""}`;
    case "list-item":
      return "list-item";
    default:
      if (depth >= 2) return item.type;
      return `${item.type}:${(item.children ?? [])
        .slice(0, 5)
        .map((c) => getKeyBase(c, depth + 1))
        .join("|")}`;
  }
};

export const renderContent = (content: ContentItem[]): React.ReactNode => {
  const counts = new Map<string, number>();

  return content.map((item) => {
    const base = getKeyBase(item);
    const nextCount = (counts.get(base) ?? 0) + 1;
    counts.set(base, nextCount);

    const key = `${base}:${nextCount}`;

    switch (item.type) {
      case "heading": {
        const HeadingTag = `h${item.level}` as HeadingTagType;
        return (
          <HeadingTag key={key} className={styles.title}>
            {renderContent(item.children)}
          </HeadingTag>
        );
      }

      case "paragraph":
        {
          const body = renderContent(item.children);
          return (
            <p className={styles.p} key={key}>
              {item.strikethrough ? <del>{body}</del> : body}
            </p>
          );
        }

      case "list": {
        const ListTag: ListTagType = item.format === "unordered" ? "ul" : "ol";
        return (
          <ListTag className={styles.ul} key={key}>
            {renderContent(item.children)}
          </ListTag>
        );
      }

      case "list-item":
        return (
          <li className={styles.li} key={key}>
            {renderContent(item.children)}
          </li>
        );

      case "text":
        {
          const text = item.text ?? "";
          let node: React.ReactNode = text;

          if (item.strikethrough) node = <del>{node}</del>;
          if (item.underline) node = <u>{node}</u>;
          if (item.italic) node = <em>{node}</em>;
          if (item.bold) node = <strong>{node}</strong>;

          return <React.Fragment key={key}>{node}</React.Fragment>;
        }

      case "image":
        if (!item.image) return null;
        return (
          <div className={styles.imageWrapper} key={key}>
            <a href={item.image.url} target="_blank" rel="noopener noreferrer">
              <Image
                src={item.image.url}
                alt={item.image.alternativeText || "image"}
                width={item.image.width || 500}
                height={item.image.height || 300}
                loading="lazy"
              />
            </a>
          </div>
        );
      default:
        return null;
    }
  });
};

export default function ContentRenderer({ content }: ContentRendererProps) {
  return <div>{renderContent(content)}</div>;
}
