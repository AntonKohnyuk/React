import axios from "axios";
import { CommentInfo, Story } from "../entities/interfaces/news";

async function GetStories() {
  const response = (
    await axios.get(
      "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
    )
  ).data;
  response.length = 100;
  const newStories: Story[] = [];
  await (async (storiesIds) => {
    for (const storyId of storiesIds) {
      newStories.push(
        (
          await axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`
          )
        ).data
      );
    }
  })(response);

  return newStories;
}

async function GetStoryById(id: string) {
  return (
    await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    )
  ).data;
}

async function GetComments(id: string) {
  const response = (await GetStoryById(id)).kids;
  if (response) {
    const comments: CommentInfo[] = [];
    await (async (commentsIds) => {
      for (const commentId of commentsIds) {
        comments.push(
          (
            await axios.get(
              `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`
            )
          ).data
        );
      }
    })(response);
    return comments;
  }
  return [] as CommentInfo[];
}

export { GetStoryById, GetStories, GetComments };
