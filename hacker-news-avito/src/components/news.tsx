import { Story } from "../entities/interfaces/news";
import "./news-style.scss";

interface NewsProps {
  number: number;
  story: Story;
}

function News({ number, story }: NewsProps) {
  return (
    <div className="wrapper">
      <div className="up">
        <span>{number}. </span>
        <h3>{story.title}</h3>
      </div>
      <div className="down">
        <p>
          Story by: <span>{story.by}</span>.
        </p>
        <p>Published on: {new Date(story.time * 1000).toLocaleString()};</p>
        <p>Rate: {story.score}</p>
      </div>
    </div>
  );
}

export default News;
