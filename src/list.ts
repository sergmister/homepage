export const tags = [] as const;
export type Tag = typeof tags[number];

export type Post = { id: string; title: string; date: string; author: string; tags: Tag[] };
export const posts: Post[] = [
	// { id: "test", title: "A Test Blog Post", date: "2021-12-31", author: "Sergii Penner", tags: [] },
];
