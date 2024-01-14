import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function GoToTop() {
  const routePath = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  useEffect(() => {
    scrollToTop();
  }, [routePath]);

  return null;
}
