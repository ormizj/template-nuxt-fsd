# template-nuxt-fsd

A nuxt.js - V4 template, using [Feature-Sliced Design](https://feature-sliced.design/) architecture

---

## Key Concepts

- Import - **Layers** and **Slices** may only import from layers below them _(see Layer Hierarchy)_. <br>
  **Segments**, however, are allowed to import from their siblings _(see Segments)_.


- Export - Exports to external modules should be from a **public API**, which serves as a contract between a group of
  modules (**slices**/**segments**), and the code that uses it. <br>
  It also acts as a gate, only allowing access to certain objects, and only through that public API _(see Public API)_.


- Nesting - Most **Layers** should be limited to **3 levels of nesting** _(Layer > Slice > Segment)_. <br>
  The **App** and **Shared** layers can exceed this limit due to their unique rules _(see Levels)_.


- Navigation - When creating new **segments** is that segment names should describe **purpose (the "why")**, not essence
  **(the "what")**. Avoid like “components”, “hooks”, “modals”, since they describe what these files
  are, but don’t help to navigate the code inside _(see Levels)_

---

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

1. **_App_*** - everything that makes the app run — routing, entrypoints, global styles, providers.
2. **Pages** - full pages or large parts of a page in nested routing.
3. **Widgets** - large self-contained chunks of functionality or UI, usually delivering an entire use case.
4. **Features** - reused implementations of entire product features, i.e. actions that bring business value to the user.
5. **Entities** - business entities that the project works with, like `user` or `product`.
6. **_Shared_*** - reusable functionality, especially when it's detached from the specifics of the project/business,
   though not necessarily.

*_App & Shared: Layers App and Shared, unlike other layers, do not have slices and are divided into segments directly._

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

Unlike slices, where imports between siblings are restricted, segments within the same slice are allowed to import
from their siblings.
This flexibility exists because segments are not business units but technical subdivisions of a slice, and they often
need to cooperate closely.

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

---

## Further Notes

### Shared

- For the Shared layer that has no slices, it’s usually more convenient to define a **separate public API for each
  segment**
  as opposed to defining one single index of everything in Shared.
- Shared is different from other layers in the sense that it **contains segments, not slices.** In this way, the Shared
  layer can be thought of as a hybrid between a layer and a slice.
- Slices are intended to divide the layer into business domains, but business domains do not exist in Shared. This means
  that **all files in Shared can reference and import from each other.**

## Types

#### [Utility Types](https://feature-sliced.design/docs/guides/examples/types#utility-types)

Utility types are types that don't have much meaning on their own and are usually used with other types. For example:

```ts
type ArrayValues<T extends readonly unknown[]> = T[number];
```

To make utility types available across your project, either install a library like type-fest, or create your own library
in `shared/lib`. Make sure to clearly indicate what new types should be added to this library, and what types don't
belong
there. For example, call it `shared/lib/utility-types` and add a README inside that describes what is a utility type in
your team.

Don't overestimate the potential reusability of a utility type. Just because it can be reused, doesn't mean it will be,
and as such, not every utility type needs to be in Shared. Some utility types are fine right next to where they are
needed:

- 📂 pages
    - 📂 home
        - 📂 api
            - 📄 ArrayValues.ts (utility type)
            - 📄 getMemoryUsageMetrics.ts (the code that uses the utility type)

#### [Ambient declaration files (*.d.ts)](https://feature-sliced.design/docs/guides/examples/types#ambient-declaration-files-dts)

Some packages, for example, [Vite](https://vitejs.dev/) or [ts-reset](https://www.totaltypescript.com/ts-reset), require
ambient declaration files to work
across your app. Usually,
they
aren't large or complicated, so they often don't require any architecting, it's fine to just throw them in the `src/`
folder. To keep the `src` more organized, you can keep them on the App layer, in `app/ambient/`.

Other packages simply don't have typings, and you might want to declare them as untyped or even write your own typings
for them. A good place for those typings would be `shared/lib`, in a folder like `shared/lib/untyped-packages`. Create a
`%LIBRARY_NAME%.d.ts` file there and declare the types you need:

>
>`shared/lib/untyped-packages/use-react-screenshot.d.ts`
>
>```ts 
>// This library doesn't have typings, and we didn't want to bother writing our own.
>declare module "use-react-screenshot";
>```

---

## To Read

- 🚀 Get Started
    - ~~Overview~~
    - ~~Tutorial~~
    - ~~FAQ~~
- 🎯 Guides
    - Examples
        - ~~Authentication~~
        - ~~Types~~
        - ~~Page layouts~~
        - ~~Handling API Requests~~
    - Migration
        - ~~From a custom architecture~~
- 📚 Reference
    - Layers
    - Slices and segments
    - Public API
- 🍰 About
    - Mission
    - Motivation
    - Understanding
        - About architecture
        - Needs driven
        - Knowledge types
        - Naming