# template-nuxt-fsd

A nuxt.js - V4, template using FSD - [Feature-Sliced Design](https://feature-sliced.design/) architecture

## Levels

There are 3 nesting levels in the application:

1. **Layer**
    - **standard:** app, pages, widgets, features, entities, shared
2. **Slices**
    - **custom:** photo, effects, gallery-page, post, comments, news-feed etc...
3. **Segments**
    - **standard:** ui, api, model, lib, config
    - **custom:** compose, like, delete, etc...

> ### [Layers](https://feature-sliced.design/docs/reference/layers)

Layers are the **FIRST** level of organisational hierarchy in Feature-Sliced Design. Their purpose is to separate code
based
on how much responsibility it needs and how many other modules in the app it depends on. Every layer carries special
semantic meaning to help you determine how much responsibility you should allocate to your code.

There are 6 layers in total, arranged from most responsibility and dependency to least:

A file system tree, with a single root folder called src and then seven subfolders: app, processes, pages, widgets,
features, entities, shared.

#### [Layer Hierarchy](https://feature-sliced.design/docs/get-started/overview#concepts):

_modules on one layer can only know about and import from modules from the layers strictly below._

1. **App**
2. **Pages**
3. **Widgets**
4. **Features**
5. **Entities**
6. **Shared**

> ### [Slices](https://feature-sliced.design/docs/reference/slices-segments#slices)

Slices are the **SECOND** level in the organizational hierarchy of Feature-Sliced Design. Their main purpose is to group
code by its meaning for the product, business, or just the application.

The names of slices are not standardized because they are directly determined by the business domain of your
application. For example, a photo gallery might have slices photo, effects, gallery-page. A social network would require
different slices, for example, post, comments, news-feed.

The layers Shared and App don't contain slices. That is because Shared should contain no business logic at all, hence
has no meaning for the product, and App should contain only code that concerns the entire application, so no splitting
is necessary.

> ### [Segments](https://feature-sliced.design/docs/reference/slices-segments#segments)

Segments are the third and **FINAL** level in the organizational hierarchy, and their purpose is to group code by its
technical nature.

There a few standardized segment names:

- ui — everything related to UI display: UI components, date formatters, styles, etc.
- api — backend interactions: request functions, data types, mappers, etc.
- model — the data model: schemas, interfaces, stores, and business logic.
- lib — library code that other modules on this slice need.
- config — configuration files and feature flags.

---

## [Public API](https://feature-sliced.design/docs/reference/public-api) ("index.ts")

A public API is a contract between a group of modules, like a slice, and the code that uses it. It also acts as a gate,
only allowing access to certain objects, and only through that public API.

In practice, it's usually implemented as an **index** file with re-exports:

>
>`pages/auth/index.ts`
>
>```ts 
>export {LoginPage} from "./ui/LoginPage";
>export {RegisterPage} from "./ui/RegisterPage";
>```

### [Public API for cross-imports](https://feature-sliced.design/docs/reference/public-api#public-api-for-cross-imports)

Cross-imports are a situation when one slice imports from another slice on the same layer. Usually that
is prohibited by
the [import rule on layers](https://feature-sliced.design/docs/reference/layers#import-rule-on-layers), but often there
are legitimate reasons to cross-import. For example, business entities
often
reference each other in the real world, and it's best to reflect these relationships in the code instead of working
around them.

For this purpose, there's a special kind of public API, also known as the @x-notation. If you have entities A and B, and
entity B needs to import from entity A, then entity A can declare a separate public API just for entity B.

- 📂 `entities`
    - 📂 `A`
        - 📂 `@x`
            - 📄 `B.ts` — a special public API just for code inside entities/B/
        - 📄 `index.ts` — the regular public API

Then the code inside `entities/B/` can import from `entities/A/@x/B`:

```ts
import type {EntityA} from "entities/A/@x/B";
```

The notation `A/@x/B` is meant to be read as "A crossed with B".
