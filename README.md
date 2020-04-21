# Reddit Clone

- **Sarthak Gupta** (PES1201700077)
- **Ruben John Mampilli** (PES1201700105)
- **Dhruv Vohra** (PES1201700281)

---

### This project is an online platform for users to see, publish and review posts on various forums published by other users. Forums/**Subreddits** can be created about different subjects and **Posts** can be created on these forums by various users

---

## Features:
* Posts can be **upvoted/downvoted** by other users, these votes represent how good or bad the post is to the followers of that content
* Users are awarded **Karma points** based on the activity of the user on the website to promote healthy activity
* Posts are **recommended** to users based on similar posts and similar forums that are likely to be of similar interest to them
* The Project uses the **RESTful API** for efficient performance and decreased errors along with modularized code (backend as well as frontend)
* Live feed from Reddit using **RSS**

---

## Stack:
- Frontend- *JavaScript (React.js)*
- REST Backend- *Python (Flask RESTful)*
- Database- *NoSQL (MongoDB)*

---

## Techniques:
- UI/UX- *React JS* with material-ui & react-bootstrap
- Backend- *RESTful APIs* using Flask
- Frontend-to-Backend Communication- *Axios*
- Database Interface- *mongoengine*
- AJAX Pattern Implemented- *Periodic Refresh*
- Additional Functionality- *RSS*
- Intelligent Functionality- *Similar Post Recommendation* using content based filtering of posts

---

To run,
- Clone the repo
- Open 2 terminals, one each in the backend and frontend folder
- Run `yarn start` in the frontend terminal
- Run `python app.py` in the backend terminal
- Disable CORS in your browser (`google-chrome --disable-web-security --user-data-dir="/tmp/chromeCORS"`)
- Open `localhost:3000` in the browser
