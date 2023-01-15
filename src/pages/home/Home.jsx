import Posts from "../../components/posts/Posts";
import Stories from "../../components/stories/Stories";
import "./Home.scss";

export default function Home() {
  return (
    <div className="home">
      <Stories/>
      <Posts/>
    </div>
  )
}
