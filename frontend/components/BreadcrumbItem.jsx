import Link from "next/link";

const BreadcrumbItem = ({ children, href, isCurrent, ...props }) => {
  return (
    <li {...props}>
      <Link href={href} passHref>
        <a
          className={`${
            isCurrent ? "text-primary" : undefined
          } hover:text-primary`}
          aria-current={isCurrent ? "page" : "false"}
        >
          {children}
        </a>
      </Link>
    </li>
  );
};

export default BreadcrumbItem;
