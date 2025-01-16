import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
      <p>This page does not exist</p>
      <Button asChild>
        <Link to="/">Home</Link>
      </Button>
    </div>
  );
};
export default NotFoundPage;
