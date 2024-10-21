export interface CatMeme {
    id?: number
    name: string;
    description: string;
    category: string;
    image: string;
    date?: Date | string;
    likes: number;
  }