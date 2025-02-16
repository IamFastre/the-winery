<div align="center">
    <div>
        <img
            src="https://the-winery.vercel.app/api/other/logo?variant=main"
            alt="The Winery Logo"
            width="300"
        />
    </div>
    <div>
        <strong><sup><samp>
            •-{ The Winery }-•
        </samp></sup></strong>
    </div>
</div>

<div align="center">
    <h1>Where We Whine</h1>
</div>


Welcome, to-be Winer! No, sadly, we do *not* make wine here. But we *do* provide a space where you can whine... or, you know, share your creative brilliance.
Close enough for us, and hopefully for you too! This is a social platform, a digital vineyard, if you will, where the grapes are ideas, and the fermentation is your imagination.

Here, you get to craft and share what we affectionately call "cards" (because "posts" is just *so* last season). These cards can be filled with whatever your heart desires: prose, poetry, pictures of your cat, existential dread, philosophical rants – the sky's the limit, dear. And because sharing is caring (and because it's a social platform), you get to share your cards with other like-minded *Winers*, or draft it, we truly don't mind it.

After all, you know the saying:

> “Wine is bottled poetry.” \
> – Some Scottish Guy

## Getting Started
<!-- Fermenting Your First Piece -->

Eager to start fermenting your own pieces? Wonderful! Here's how to dive into the vat of creativity:

1. **Log In or Create an Account:** If you're already one of our esteemed *Winers*, log in! If not, don't worry, you can create a new account. It's quick, easy, and painless (mostly... hopefully).
1. **Compose Your Oeuvres d'Art:** Once you're in, the world is your oyster... or rather, your winery. Go ahead and start fermenting those cards!

## Features
<!-- The Grapes of Our Labor -->

- **User Authentication:** Log in or sign up securely. We've got this.
- **Card Creation:** With the power of Markdown, create new cards with any content you like. Seriously, anything.
- **Card Sharing:** Share your masterpieces with the world (or at least, with other users).
- **User Profiles:** Each user has their own profile. Express yourself.
- **Card Liking:** Users can like cards to show appreciation and push the word further.
- **Card Super Liking:** Users can super like cards, for extra appreciation and extra pushing; only got one per day; use it wisely.
- **Discovery:** See other users' cards and get inspired.
- **Regret, Maybe**: Users can delete their cards. Careful as we might be losing a gem.
- **Discovery:** See other users' cards and get inspired.

## Technologies Used
<!-- The *Secret* Sauce -->

We've concocted this fine vintage using:

- **Next.js:** For a smooth *(my ass)* SSR experience. It's like a fine wine for web apps; bitter but sweet.
- **Supabase:** A Postgres database and more. It keeps all your data safe and tidy.
- **React:** For building user interfaces.
- **TypeScript:** For type safety and developer experience; who can endure plain JS.
- **Sass:** For CSS preprocessing and organization; who can endure plain CSS.

## Installation
<!-- Setting Up Your Own Vineyard -->

Ready to get your hands dirty? Here's how to spin up **a Winery** on your local machine:

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/IamFastre/the-winery
    cd the-winery
    ```

1. **Install Dependencies:**
    ```bash
    npm install # or `npm i`
    ```

1. **Configure Environment Variables:**
    - Rename or duplicate a `.env.template` to be `.env.local` in the root directory.
    - Configure the `.env` file to your own values.
    ```env
    ANALYZE_BUNDLE=<BOOLEAN; whether to turn on '@next/bundle-analyzer' or not>
    NEXT_PUBLIC_SUPABASE_URL=<YOUR_SUPABASE_URL>
    NEXT_PUBLIC_SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>
    SUPABASE_SECRET_KEY=<YOUR_SUPABASE_SECRET_KEY>
    ```

1. **Start the Development Server:**
    ```bash
    npm run dev
    ```
    After that, your server should be ready at http://localhost:3000. Remember, that's not **The Winery**, that's **a Winery** – your own.

## Project Structure
<!-- The Lay of the Land -->

Here's a little tour of the vineyard:

- **`@/app`:** This is where **Next.js** works its magic. Each directory here corresponds to a different page on the site.
- **`@/components`:** All our **React** components live here.
- **`@/hooks`:** Here lives all the custom **React** hooks used throughout the app.
- **`@/lib`**: Helper digestible internal libraries.
- **`@/providers`**: Just some **React** context setups.
- **`@/styles`:** CSS files for styling the components and pages.
- **`@/supabase`:** Where everything **Supabase**-related lives.
- **`@/utils`:** Helper functions, where most functionality lives.

## Supabase Configuration

**Supabase** is crucial for this project. Here's how to get it working:

1. **Create a Supabase Project:** If you don't have one, create an account and [a new project](https://database.new/).
1. **Database Setup:** You may need to create tables in your **Supabase** database.
1. **API Keys:** Grab your project URL and anon key from the **Supabase** project settings and add them to your `.env` file as mentioned in the installation steps.

<sup>*It's important to note while the schemas are not public, you can get an idea of how do structure your **Supabase** project in the `supabase/types.ts` file*</sup>

## Other

### Credits

Please check [credits.txt](./credits.txt).

---

<div align="center">
    <h3>Socials</h3>
    <strong>
        <a href="https://the-winery.vercel.app/u/TheWinery">The Winery</a> |
        <a href="https://www.instagram.com/TheWinery.app">Instagram</a> |
        <a href="https://twitter.com/TheWinery_app">Twitter</a> |
        <a href="https://www.reddit.com/r/TheWinery">Reddit</a>
    </strong>
</div>
