export interface Story {
  by: string;
  descendants: number;
  id: string;
  kids?: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface CommentInfo {
  by: string;
  id: string;
  kids?: number[];
  parent: number;
  text: string;
  time: number;
  type: string;
}
