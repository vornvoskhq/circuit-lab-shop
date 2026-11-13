<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

- Product photos are bundled under `public/products/` and referenced from `src/lib/product-media.ts`, so GitHub Pages can serve them without Lovable-only asset routes. Datasheet links point to the matching public PDFs in the `compwar` repository.
- Upcoming catalog listings are separate from purchasable products and link to Labs, so previews never enter cart or stock totals.
