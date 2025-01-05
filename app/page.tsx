
import PostSection from "@/components/PostSection";
export default function Home() {

  return (
    <div className="mx-3 grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-8"><PostSection/></div>
      <div className="lg:col-span-4">User Recommendation System</div>
    </div>

  );
}
