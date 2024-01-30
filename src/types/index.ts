export interface IPost {
  contents: string
  createdAt: {
    seconds: number
    nanoseconds: number
  }
  description: string
  id: string
  keywords: string
  modifiedAt: {
    seconds: number
    nanoseconds: number
  }
  title: string
  userId: string
  userName: string
  createdDate: Date
}
