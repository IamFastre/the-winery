<p align="center">
  <img src="https://the-winery.vercel.app/api/other/logo?variant=main" alt="The Winery Logo" width="200"/>
</p>

# The Winery: Where We Whine (No it`s not about Wine)

Welcome, dear visitor, to The Winery! No, sadly, we don't make wine here. But we *do* provide a space where you can whine... or, you know, share your creative brilliance. Close enough for us, and hopefully for you too! This is a social platform, a digital vineyard, if you will, where the grapes are ideas, and the fermentation is your imagination.

Here, you get to craft and share what we affectionately call "cards" (because "posts" is *so* last season). These cards can be filled with whatever your heart desires: prose, poetry, pictures of your cat, existential dread – the sky's the limit, darling. And because sharing is caring (and because it's a social platform), you get to share your cards with other like-minded whiners.

## Getting Started: Fermenting Your First Piece

Eager to start fermenting your own pieces? Wonderful! Here's how to dive into the vat of creativity:

1.  **Log In or Create an Account:** If you're already one of our esteemed whiners, log in! If not, don't worry, you can create a new account. It's quick, easy, and painless (mostly).
2.  **Compose Some Oeuvres d'Art:** Once you're in, the world is your oyster... or rather, your winery. Go ahead and start creating those cards!

## Features: The Grapes of Our Labor

*   **User Authentication:** Log in or sign up securely. We've got this.
*   **Card Creation:** Create new cards with any content you like. Seriously, anything.
*   **Card Editing:** Edit your cards because sometimes you change your mind, and that's okay.
*   **Card Sharing:** Share your masterpieces with the world (or at least, with other users).
* **User Profiles**: Each user have their own profile.
* **Card Liking**: Users can like cards.

## How it works:

* **Make your cards:** Each user can create their own cards with custom content.
* **Personal Profile:** Each user has a unique profile to showcase their identity.
* **Discover others:** See other users' cards and get inspired.
* **Like it!**: Users can express appreciation by liking cards.
* **Edit your creations:** Users have the ability to modify their cards.
* **Delete your cards**: Users can delete their cards.

## Technologies Used: The Secret Sauce

We've concocted this fine vintage using:

*   **Next.js:** For a smooth, server-side rendered experience. It's like a fine wine, but for web apps.
*   **Supabase:** Our backend. It keeps all your data safe.

*   **React:** For building user interfaces.
* **TypeScript:** For type safety and developer experience.
* **Sass:** For CSS preprocessing and organization.

## Installation: Setting Up Your Own Vineyard

Ready to get your hands dirty? Here's how to set up The Winery on your local machine:

1.  **Clone the Repository:**
```
bash
    git clone https://github.com/IamFastre/the-winery
    cd the-winery
    
```
2.  **Install Dependencies:**
```
bash
    npm install
    
```
3.  **Configure Environment Variables:**
    *   Create a `.env` file in the root directory.
    *   Add your Supabase project URL and anon key.
```
        NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
        NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
        
```
4.  **Start the Development Server:**
```
bash
    npm run dev
    
```
## Usage: Sipping and Sharing

Once you've got the app up and running, here's what you can do:

1.  **Open your browser:** Visit `http://localhost:3000`.
2.  **Log in or Sign up:** Start by creating an account or logging in.
3.  **Explore:** Browse cards and check out user profiles.
4.  **Create Cards:** Click on the "New Card" button and start typing away.
5. **Like Cards**: Like other users cards that you enjoy.
6. **Edit Cards**: Modify your cards to your liking.
7. **Delete cards**: remove your cards.

## Code Structure: The Lay of the Land

Here's a little tour of the vineyard:

*   **`pages`:** This is where Next.js works its magic. Each file here corresponds to a different page on the site.
*   **`components`:** All our React components live here.
*   **`styles`:** CSS files for styling the components and pages.
* **`lib`**: helper functions

## Supabase Configuration: The Backbone

Supabase is crucial for this project. Here's how to get it working:

1.  **Create a Supabase Project:** If you don't have one, create an account and a new project.
2.  **Database Setup:** You may need to create tables in your Supabase database.
3.  **API Keys:** Grab your project URL and anon key from the Supabase project settings and add them to your `.env` file as mentioned in the installation steps.
