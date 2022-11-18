import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentView from "../components/comment";
import ErrorMes from "../components/error";
import Loader from "../components/loader";
import { CommentInfo } from "../entities/interfaces/news";
import useStory from "../hooks/story";
import { GetComments } from "../http/fetchApi";
import "./storyPage.scss";

function StoryPage(): JSX.Element {
  const [comments, setComments] = useState<CommentInfo[]>([]);
  const [loadingCom, setLoading] = useState(false);
  const [errorCom, setError] = useState("");
  const { id } = useParams();
  const { story, loading, error } = useStory(id!);
  let timer: NodeJS.Timer;

  async function fetchComments() {
    try {
      setError("");
      setLoading(true);
      setComments(await GetComments(id!));
      setLoading(false);
    } catch (err: unknown) {
      const error = err as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchComments();
    timer = updateIdStart();
    return () => {
      clearInterval(timer);
    };
  }, []);

  const updateIdStart = () =>
    setInterval(() => {
      fetchComments();
    }, 60000);

  return (
    <>
      {loading && <Loader />}
      {error && <ErrorMes error={error} />}
      {!loading && (
        <div className="story-wrapper">
          <div className="story">
            <h2>{story.title}</h2>
            <div className="information">
              <a href={story.url} target={"_blank"} rel="noreferrer">
                {story.url}
              </a>

              <p className="down">
                Published on: {new Date(story.time * 1000).toLocaleString()};
                Rate: {story.score}; Total comments: {comments.length || 0}
              </p>
            </div>
          </div>
          <hr />
          <div className="comments">
            {loadingCom && <Loader />}
            {error && <ErrorMes error={errorCom} />}
            {!loadingCom && (
              <div className="btn">
                <button onClick={() => fetchComments()}>Update Comments</button>
              </div>
            )}
            {!loadingCom && !comments.length && <p>No comments Yet</p>}

            {comments.map((comment) => (
              <CommentView comment={comment} key={comment.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default StoryPage;
