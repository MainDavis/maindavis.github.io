# maindavis.github.io

## Crear un blog (ES/EN)

Ruta del archivo:
- `src/content/blogEs/mi-nuevo-post.md`
- `src/content/blogEn/mi-nuevo-post.md`
- La URL será `/es/blog/mi-nuevo-post` y `/en/blog/mi-nuevo-post`

Formato del contenido:
```md
---
title: "Mi nuevo post"
date: 2026-02-04
description: "Resumen corto del post."
image: "/images/blog/mi-nuevo-post.jpg"
tags: ["red-team", "operaciones"]
featured: false
---

Contenido en Markdown...
```

Campos:
- `title` (string, obligatorio)
- `date` (fecha `YYYY-MM-DD`, obligatorio)
- `description` (string, obligatorio)
- `image` (string, opcional, ruta URL)
- `tags` (array de strings, opcional)
- `featured` (boolean, opcional)

## Crear un proyecto (ES/EN)

Ruta del archivo principal:
- `src/content/projectsEs/mi-proyecto/index.md`
- `src/content/projectsEn/mi-proyecto/index.md`
- La URL será `/es/arsenal/mi-proyecto` y `/en/arsenal/mi-proyecto`

Formato del contenido:
```md
---
title: "Mi proyecto"
description: "Resumen corto del proyecto."
status: "active"
image: "/images/projects/mi-proyecto.jpg"
tags: ["infra", "tooling"]
order: 1
featured: false
---

Contenido en Markdown...
```

Campos:
- `title` (string, obligatorio)
- `description` (string, obligatorio)
- `status` (string, opcional)
- `image` (string, opcional, ruta URL)
- `tags` (array de strings, opcional)
- `order` (número, opcional)
- `featured` (boolean, opcional)

## Wiki de proyectos (ES/EN)

Ruta de subpaginas:
- `src/content/projectsEs/mi-proyecto/setup.md`
- `src/content/projectsEs/mi-proyecto/features.md`
- `src/content/projectsEn/mi-proyecto/setup.md`
- `src/content/projectsEn/mi-proyecto/features.md`

La URL sera:
- `/es/arsenal/mi-proyecto/setup`
- `/en/arsenal/mi-proyecto/setup`

## Imágenes (formatos y ubicación)

Actualmente las imágenes se resuelven como rutas URL (desde `public/`):
- Blog: `public/images/blog/mi-nuevo-post.jpg`
- Proyecto: `public/images/projects/mi-proyecto.jpg`

Luego, en el frontmatter:
- `image: "/images/blog/mi-nuevo-post.jpg"`
- `image: "/images/projects/mi-proyecto.jpg"`

Formatos recomendados: `.jpg`, `.png`, `.webp`, `.svg`

## Notas

- Si `image` no esta definido, se usa un fallback automatico.
- Mantener el mismo slug de archivo en ES y EN facilita el switch de idioma.
- Para usar imagenes relativas al `.md` (ej. `./cover.jpg`), habría que ajustar la resolucion de rutas.
