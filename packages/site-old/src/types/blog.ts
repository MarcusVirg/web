export type Metadata = {
  title: string
  date: string
  excerpt: string
  tags: string[]
  draft: boolean
}
export type Post = {
  metadata: Metadata
  default: any
}
