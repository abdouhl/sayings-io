export interface Author {
  id: string
  name: string
  avatar: string
}

export interface Quote {
  id: string
  text: string
  author: Author
}

