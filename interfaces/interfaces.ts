interface IPosts {
  id?: string,
  title: string,
  body: string
  userId?: number
}

interface IModal {
  toggle: boolean,
  textButton: string,
  id?: string
}

interface IAddPost {
  e: React.FormEvent<HTMLFormElement>,
  textTitle: string,
  textArea: string
}

interface IChangePost {
  e: React.FormEvent<HTMLFormElement>,
  id: string,
  textTitle: string,
  textArea: string,
  posts: IPosts[]
}

interface IModalProps {
  textButton: string
}

export type { IPosts, IModal, IAddPost, IChangePost, IModalProps  };