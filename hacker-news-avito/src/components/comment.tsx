import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { CommentInfo } from "../entities/interfaces/news";
import { GetComments } from "../http/fetchApi";
import ErrorMes from "./error";
import Loader from "./loader";
import "./news-style.scss";

interface CommentProps {
  comment: CommentInfo;
}

function CommentView({ comment }: CommentProps) {
  const [showAnswers, setShowAnswers] = useState(false);
  const [comments, setComments] = useState<CommentInfo[]>([]);
  const [loadingCom, setLoading] = useState(false);
  const [errorCom, setError] = useState("");

  async function fetchComments() {
    try {
      setError("");
      setLoading(true);
      setComments(await GetComments(comment.id));
      setLoading(false);
    } catch (err: unknown) {
      const error = err as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="wrapper">
      <div>
        <p>{comment.text}</p>
      </div>
      <div className="down">
        <p>
          Story by: <span>{comment.by}</span>.
        </p>
        <p>Published on: {new Date(comment.time * 1000).toLocaleString()};</p>
        <p>Answers: {comment.kids?.length || 0}</p>
        {comment.kids?.length && (
          <span
            style={{ textDecoration: "underline" }}
            onClick={() => {
              setShowAnswers(!showAnswers);
            }}
          >
            Show answers
          </span>
        )}
      </div>
      <div className="answers">
        {showAnswers &&
          comments.map((comment) => (
            <CommentView comment={comment} key={comment.id} />
          ))}
      </div>
    </div>
  );
}

export default CommentView;
