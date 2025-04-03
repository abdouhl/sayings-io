export interface Author {
  username: string
  name: string
  avatar: string
}

export interface Quote {
  id: string
  text: string
  author: Author
}

