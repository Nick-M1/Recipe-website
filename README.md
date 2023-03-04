## 🌭 Next.js Recipe Website 🍕
[![Project Status: Active.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)

### [🌐 Demo - hosted on vercel](https://recipe-webapp.vercel.app) 
https://recipe-webapp.vercel.app

[//]: # (#### &#40;NOTE: Demo video at bottom&#41;)

#### 🍔 Social Media website where users can post their own recipes online and others can view, like, bookmark and comment on the recipe.


## ⚡ Features
1. Landing page (using a mobile first approach)
2. Search page, where users can search for other recipes (can search using text, by category and can order by popularity, quickest cooking time and newest uploaded recipes)
3. Page for each created recipe, where users can comment, like and bookmark your recipe
4. Users can post their own recipes using the Create Recipe page (and can also update/change previously posted recipes), which uploads the changes/new recipe to FirebaseDB
5. Dashboard Page, where users can change their display-name, biography, profile-picture
6. Individual profile page for each user, where others can see the user's recipe posts as well as their likes and bookmarks
7. Next Auth authentication required for posting new recipes, comments and likes/bookmarks


## 🏗️ Built With:
1. Next JS 13 _(with app directory)_ + Typescript
2. React
3. Tailwindcss
4. Zustand State Management
5. Next Auth _(for authentication)_
6. Firebase database _(using firestore and image DBs)_


## 🌳 Environmental Variables:
```
    FIREBASE_CONFIG_APIKEY=
    FIREBASE_CONFIG_STORAGEBUCKET=
    
    GOOGLE_ID=
    GOOGLE_SECRET=
    
    FACEBOOK_ID=
    FACEBOOK_SECRET=
    
    NEXTAUTH_URL=
    NEXTAUTH_SECRET=
```

- Firebase keys are to access Firebase firestoreDB and storageDB
- Google & Facebook keys are for Next Auth
- NextAuth keys are for authentication


[//]: # (## 🎬 Demo Videos:)

[//]: # (![DemoGif1.gif]&#40;public%2FDemoVids%2FDemoGif1.gif&#41;)

[//]: # (![DemoGif2.gif]&#40;public%2FDemoVids%2FDemoGif2.gif&#41;)

[//]: # (![DemoGif3.gif]&#40;public%2FDemoVids%2FDemoGif3.gif&#41;)

[//]: # (![DemoGif4.gif]&#40;public%2FDemoVids%2FDemoGif4.gif&#41;)

[//]: # (![DemoGif5.gif]&#40;public%2FDemoVids%2FDemoGif5.gif&#41;)