import { Link } from "react-router-dom";
import "./NoPage.scss";

export default function NoPage() {
  return (
    <>
      <h1>Error 404: Page Not Found</h1>
      <Link to="/cinema">Home</Link>
    </>
  );
}
