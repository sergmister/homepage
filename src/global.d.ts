/// <reference types="@sveltejs/kit" />

import type { Post } from "src/list";

type PostData = Post & { html: string };
