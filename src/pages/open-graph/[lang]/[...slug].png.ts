import { getCollection } from "astro:content";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

export async function getStaticPaths() {
    const blogEs = await getCollection("blogEs");
    const blogEn = await getCollection("blogEn");

    const paths = [
        ...blogEs.map((post) => ({
            params: { lang: "es", slug: post.slug },
            props: { post, lang: "es" },
        })),
        ...blogEn.map((post) => ({
            params: { lang: "en", slug: post.slug },
            props: { post, lang: "en" },
        })),
    ];

    return paths;
}

export async function GET({ props }) {
    const { post, lang } = props;
    const { title, description } = post.data;

    // Load a font (using a CDN or local file)
    // For simplicity using a basic font here, but ideally load a custom font file buffer
    const fontData = await fetch(
        "https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/fonts/ttf/JetBrainsMono-Regular.ttf"
    ).then((res) => res.arrayBuffer());

    const svg = await satori(
        {
            type: "div",
            props: {
                style: {
                    display: "flex",
                    width: "100%",
                    height: "100%",
                },
                children: [
                    {
                        type: "div",
                        props: {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                height: "100%",
                                backgroundColor: "#0d1117",
                                backgroundImage:
                                    "radial-gradient(circle at 25px 25px, #1c2128 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1c2128 2%, transparent 0%)",
                                backgroundSize: "100px 100px",
                                padding: "80px",
                                justifyContent: "space-between",
                                fontFamily: "JetBrains Mono",
                            },
                            children: [
                                {
                                    type: "div",
                                    props: {
                                        style: {
                                            fontSize: "24px",
                                            color: "#58a6ff", // terminal blue/cyan
                                            marginBottom: "20px",
                                            textTransform: "uppercase",
                                            letterSpacing: "2px",
                                        },
                                        children: `${lang === "es" ? "Artículo" : "Article"} | MainDavis Red Team`,
                                    },
                                },
                                {
                                    type: "div",
                                    props: {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            flex: 1, // Take available vertical space
                                        },
                                        children: [
                                            {
                                                type: "h1",
                                                props: {
                                                    style: {
                                                        fontSize: "72px", // Increased size for impact
                                                        fontWeight: "bold",
                                                        color: "#c9d1d9",
                                                        margin: "0",
                                                        lineHeight: "1.1",
                                                        textShadow: "0 0 20px rgba(88, 166, 255, 0.2)",
                                                    },
                                                    children: title,
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    type: "div",
                                    props: {
                                        style: {
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            width: "100%",
                                            borderTop: "1px solid #30363d",
                                            paddingTop: "30px",
                                        },
                                        children: [
                                            {
                                                type: "div",
                                                props: {
                                                    style: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        backgroundColor: "rgba(63, 185, 80, 0.1)",
                                                        padding: "10px 20px",
                                                        borderRadius: "4px",
                                                        border: "1px solid rgba(63, 185, 80, 0.4)",
                                                    },
                                                    children: [
                                                        {
                                                            type: "span",
                                                            props: {
                                                                style: {
                                                                    fontSize: "28px",
                                                                    color: "#3fb950", // Green success
                                                                    fontWeight: "bold",
                                                                    letterSpacing: "1px",
                                                                },
                                                                children: "[+] ACCESS_GRANTED :: READ_MORE",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                type: "div",
                                                props: {
                                                    style: {
                                                        fontSize: "24px",
                                                        color: "#58a6ff",
                                                        fontWeight: "bold",
                                                        opacity: 0.8,
                                                    },
                                                    children: "maindavis.github.io",
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        } as any,
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: "JetBrains Mono",
                    data: fontData,
                    weight: 400,
                    style: "normal",
                },
            ],
        }
    );

    const resvg = new Resvg(svg, {
        fitTo: {
            mode: "width",
            value: 1200,
        },
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    return new Response(pngBuffer, {
        headers: {
            "Content-Type": "image/png",
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    });
}
