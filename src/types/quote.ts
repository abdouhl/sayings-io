export interface Author {
  username: string
  name: string
  avatar: string
  bio?: string
  website?: string
  twitter?: string
  instagram?: string
  facebook?: string
}

export interface Quote {
  id: string
  text: string
  author: Author
  tags?: string[]
}
