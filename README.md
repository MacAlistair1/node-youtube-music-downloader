# Installation Process

- clone the project
- go to project directory and execute following commands:

  - `npm install`
  - install **ffmpeg** in your os and set **ffmpegPath** in app.ts
  - code base is in `typescript` so we've to compile using `tsc`
  - and finally run project using `node dist/app.js` or `npm run dev`

  ### Routes

##### Download Video Music

  `POST`  `http://localhost:3000/download`
  	- in request body send `{"videoUrl" : "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"}`

##### Download Shorts Music

  `POST`  `http://localhost:3000/shorts-music`
  	- in request body send `{"videoUrl" : "https://www.youtube.com/shorts/YOUR_SHORTS_VIDEO_ID"}`

<h3 align="center">Reach me out</h3>

<p align="center">

<a href="mailto:info@jeevenlamichhane.com.np" target="_blank" title="Mail me ">
