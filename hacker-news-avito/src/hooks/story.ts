import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Story } from "../entities/interfaces/news";
import { GetStoryById } from "../http/fetchApi";

function useStory(id: string) {
  const [story, setStory] = useState({} as Story);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchStory() {
    try {
      setError("");
      setLoading(true);
      setStory(await GetStoryById(id));
      setLoading(false);
    } catch (err: unknown) {
      const error = err as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchStory();
  }, []);

  return { story, loading, error };
}

export default useStory;
