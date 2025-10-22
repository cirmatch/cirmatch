import Link from "next/link";
import { useRouter } from "next/router";

const ButtonLink = ({
  href = "/",
  children,
  bgColor = "#029fae",
  textColor = "white",
  border = "none",
  hoverBg = "#009688",
  hoverText = "white",
  padding = "px-4 py-2",
  rounded = "rounded-md",
  textSize = "text-sm",
  fontWeight = "font-medium",
  transition = "transition duration-200",
  rememberRedirect = false,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (rememberRedirect && typeof window !== "undefined") {
      localStorage.setItem("redirectAfterLogin", router.asPath);
    }
  };

  return (
    <Link href={href}>
      <button
        onClick={handleClick}
        className={`${padding} ${rounded} ${textSize} ${fontWeight} ${transition} cursor-pointer`}
        style={{
          backgroundColor: bgColor,
          color: textColor,
          border: border,
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = hoverBg;
          e.target.style.color = hoverText;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = bgColor;
          e.target.style.color = textColor;
        }}
      >
        {children}
      </button>
    </Link>
  );
};

export default ButtonLink;
