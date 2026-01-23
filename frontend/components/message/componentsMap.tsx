import React from "react";
import Image, { type ImageProps } from "next/image";

// Customize components for Markdown messages
const components: Record<
  string,
  React.ComponentType<Record<string, unknown>>
> = {
  h1: (props: React.ComponentPropsWithoutRef<"h1">) => (
    <h1
      className="text-4xl font-extrabold mt-8 mb-6 text-gray-800"
      {...props}
    />
  ),
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <h2 className="text-3xl font-semibold mt-7 mb-5 text-gray-800" {...props} />
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <h3 className="text-2xl font-medium mt-6 mb-4 text-gray-800" {...props} />
  ),
  p: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p
      className="mb-5 leading-relaxed text-gray-800 whitespace-pre-wrap"
      {...props}
    />
  ),
  blockquote: (props: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l-4 border-indigo-500 pl-4 italic my-6 text-gray-800"
      {...props}
    />
  ),
  code: (
    props: React.ComponentPropsWithoutRef<"code"> & { inline?: boolean },
  ) => {
    const { inline, className, children, ...rest } = props;
    if (inline) {
      return (
        <code
          className="bg-gray-200 px-1 rounded text-sm font-mono text-gray-800"
          {...rest}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...rest}>
        {children}
      </code>
    );
  },
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol className="list-decimal pl-6 mb-5" {...props} />
  ),
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc pl-6 mb-5" {...props} />
  ),
  li: (props: React.ComponentPropsWithoutRef<"li">) => (
    <li className="mb-2 text-gray-800" {...props} />
  ),
  hr: (props: React.ComponentPropsWithoutRef<"hr">) => (
    <hr className="border-t border-gray-300 my-8 text-gray-800" {...props} />
  ),
  a: (props: React.ComponentPropsWithoutRef<"a">) => (
    <a className="text-indigo-600 hover:underline" {...props} />
  ),
  img: (
    props: ImageProps & { alt?: string; width?: number; height?: number },
  ) => {
    const { src, alt = "", width = 500, height = 300, ...rest } = props;
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded shadow-md mx-auto my-6 max-w-full"
        {...rest}
      />
    );
  },
  strong: (props: React.ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-gray-900" {...props} />
  ),
  em: (props: React.ComponentPropsWithoutRef<"em">) => (
    <em className="italic text-gray-700" {...props} />
  ),
};

export default components;
