import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorMes from "../components/error";
import Loader from "../components/loader";
import News from "../components/news";
import { Story } from "../entities/interfaces/news";
import { GetStories } from "../http/fetchApi";
import "./mainPage-style.scss";

function MainPage(): JSX.Element {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let timer: NodeJS.Timer;
  async function fetchStories() {
    try {
      setError("");
      setLoading(true);
      setStories(await GetStories());
      setLoading(false);
    } catch (err: unknown) {
      const error = err as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchStories();
    timer = updateIdStart();
    return () => {
      clearInterval(timer);
    };
  }, []);

  const updateIdStart = () =>
    setInterval(() => {
      fetchStories();
    }, 60000);

  return (
    <>
      {loading && <Loader />}

      {!loading && (
        <div className="main-wrapper">
          <div className="btn">
            <button
              onClick={() => {
                clearInterval(timer);
                fetchStories();
                timer = updateIdStart();
              }}
            >
              Update Stories
            </button>
          </div>
          {error && <ErrorMes error={error} />}
          {stories.map((story, index) => (
            <Link to={"story/" + story.id} key={story.id}>
              <News story={story} number={index + 1} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default MainPage;
