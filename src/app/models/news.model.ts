export type Board = {
    id: string;
    name: string;
}

export type NewsType ={
    drafts: News[];
    published: News[];
    archives: News[];
  }
  
export type News ={
    id: string;
    boardId: string;
    author: string;
    title: string;
    description: string;
    imageURL: string;
    CreatedAt: string;
    status: string;
  }