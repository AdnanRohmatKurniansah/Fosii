export interface Params {
    id: string
}

export interface Props {
    searchParams: {
      page?: string
    }
}

export interface MyQuestion {
    id: number
    slug: string
    title: string
    description: string
    pic: string
    status: string
    tagName:  string
    answersCount: number
    created_at: Date
    updated_at: Date
}

