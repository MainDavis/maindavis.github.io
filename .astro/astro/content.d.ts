declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blogEn": {
"ReflectiveDLLInjection.md": {
	id: "ReflectiveDLLInjection.md";
  slug: "reflectivedllinjection";
  body: string;
  collection: "blogEn";
  data: InferEntrySchema<"blogEn">
} & { render(): Render[".md"] };
};
"blogEs": {
"ReflectiveDLLInjection.md": {
	id: "ReflectiveDLLInjection.md";
  slug: "reflectivedllinjection";
  body: string;
  collection: "blogEs";
  data: InferEntrySchema<"blogEs">
} & { render(): Render[".md"] };
};
"projectsEn": {
"faceless/architecture.md": {
	id: "faceless/architecture.md";
  slug: "faceless/architecture";
  body: string;
  collection: "projectsEn";
  data: InferEntrySchema<"projectsEn">
} & { render(): Render[".md"] };
"faceless/faq.md": {
	id: "faceless/faq.md";
  slug: "faceless/faq";
  body: string;
  collection: "projectsEn";
  data: InferEntrySchema<"projectsEn">
} & { render(): Render[".md"] };
"faceless/features.md": {
	id: "faceless/features.md";
  slug: "faceless/features";
  body: string;
  collection: "projectsEn";
  data: InferEntrySchema<"projectsEn">
} & { render(): Render[".md"] };
"faceless/index.md": {
	id: "faceless/index.md";
  slug: "faceless";
  body: string;
  collection: "projectsEn";
  data: InferEntrySchema<"projectsEn">
} & { render(): Render[".md"] };
"faceless/opsec.md": {
	id: "faceless/opsec.md";
  slug: "faceless/opsec";
  body: string;
  collection: "projectsEn";
  data: InferEntrySchema<"projectsEn">
} & { render(): Render[".md"] };
"faceless/overview.md": {
	id: "faceless/overview.md";
  slug: "faceless/overview";
  body: string;
  collection: "projectsEn";
  data: InferEntrySchema<"projectsEn">
} & { render(): Render[".md"] };
"faceless/setup.md": {
	id: "faceless/setup.md";
  slug: "faceless/setup";
  body: string;
  collection: "projectsEn";
  data: InferEntrySchema<"projectsEn">
} & { render(): Render[".md"] };
"faceless/troubleshooting.md": {
	id: "faceless/troubleshooting.md";
  slug: "faceless/troubleshooting";
  body: string;
  collection: "projectsEn";
  data: InferEntrySchema<"projectsEn">
} & { render(): Render[".md"] };
"faceless/usage.md": {
	id: "faceless/usage.md";
  slug: "faceless/usage";
  body: string;
  collection: "projectsEn";
  data: InferEntrySchema<"projectsEn">
} & { render(): Render[".md"] };
};
"projectsEs": {
"faceless/architecture.md": {
	id: "faceless/architecture.md";
  slug: "faceless/architecture";
  body: string;
  collection: "projectsEs";
  data: InferEntrySchema<"projectsEs">
} & { render(): Render[".md"] };
"faceless/faq.md": {
	id: "faceless/faq.md";
  slug: "faceless/faq";
  body: string;
  collection: "projectsEs";
  data: InferEntrySchema<"projectsEs">
} & { render(): Render[".md"] };
"faceless/features.md": {
	id: "faceless/features.md";
  slug: "faceless/features";
  body: string;
  collection: "projectsEs";
  data: InferEntrySchema<"projectsEs">
} & { render(): Render[".md"] };
"faceless/index.md": {
	id: "faceless/index.md";
  slug: "faceless";
  body: string;
  collection: "projectsEs";
  data: InferEntrySchema<"projectsEs">
} & { render(): Render[".md"] };
"faceless/opsec.md": {
	id: "faceless/opsec.md";
  slug: "faceless/opsec";
  body: string;
  collection: "projectsEs";
  data: InferEntrySchema<"projectsEs">
} & { render(): Render[".md"] };
"faceless/overview.md": {
	id: "faceless/overview.md";
  slug: "faceless/overview";
  body: string;
  collection: "projectsEs";
  data: InferEntrySchema<"projectsEs">
} & { render(): Render[".md"] };
"faceless/setup.md": {
	id: "faceless/setup.md";
  slug: "faceless/setup";
  body: string;
  collection: "projectsEs";
  data: InferEntrySchema<"projectsEs">
} & { render(): Render[".md"] };
"faceless/troubleshooting.md": {
	id: "faceless/troubleshooting.md";
  slug: "faceless/troubleshooting";
  body: string;
  collection: "projectsEs";
  data: InferEntrySchema<"projectsEs">
} & { render(): Render[".md"] };
"faceless/usage.md": {
	id: "faceless/usage.md";
  slug: "faceless/usage";
  body: string;
  collection: "projectsEs";
  data: InferEntrySchema<"projectsEs">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"blog": Record<string, {
  id: string;
  collection: "blog";
  data: any;
}>;
"blog-en": Record<string, {
  id: string;
  collection: "blog-en";
  data: any;
}>;
"blog-es": Record<string, {
  id: string;
  collection: "blog-es";
  data: any;
}>;
"projects": Record<string, {
  id: string;
  collection: "projects";
  data: any;
}>;
"projects-en": Record<string, {
  id: string;
  collection: "projects-en";
  data: any;
}>;
"projects-es": Record<string, {
  id: string;
  collection: "projects-es";
  data: any;
}>;

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
