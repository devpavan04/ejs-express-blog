const ejs = require('ejs')
const bodyParser = require('body-parser')
const path = require('path')
const _ = require('lodash')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

const posts = []

app.get('/', (req, res) => {
  res.render('home', { posts })
})

app.get('/compose', (req, res) => {
  res.render('compose')
})

app.post('/compose', (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postContent
  }
  posts.push(post)
  res.redirect('/')
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

app.get('/posts/:title', (req, res) => {
  const requestedPost = posts.find(post => {
    if (_.lowerCase(post.title) === _.lowerCase(req.params.title)) {
      return post
    }
  })
  if (requestedPost) {
    res.render('post', { requestedPost })
  } else {
    res.render('notFound')
  }
})

app.post('/delete/:title', (req, res) => {
  const requestedPostToDelete = posts.find(post => {
    if (_.lowerCase(post.title) === _.lowerCase(req.params.title)) {
      return post
    }
  })
  if (requestedPostToDelete) {
    const index = posts.indexOf(requestedPostToDelete)
    posts.splice(index, 1)
    res.redirect('/')
  } else {
    res.render('notFound')
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('app listening on port ' + PORT + ' ...');
})