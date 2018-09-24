const express = require('express');
const router = express.Router();
const data = require('../seed-data');




function getBlog(alias) {
    if (alias) {
        var index = parseInt(data.blogIndex[alias]);
        return data.myBlog[index];
    } else {
        return data.myBlog
    }
}


router.get('/', (req, res) => {
    var random = Math.floor(Math.random() * data.myBlog.length);
    console.log(random)
    res.render('blogs', {
        title: 'Blogs',
        layout: 'layout',
        nav: true,
        navHome: true,
        footer: true,
        blogs: data.myBlog,
        blogCategories: data.blogCategories,
        featuredBlog: getBlog()[random]
    })
})

router.get('/:alias', (req, res) => {
    console.log(req.params.alias)
    let blog = getBlog(req.params.alias);
    console.log(blog);
    res.render('blog-detail', {
        title: 'Blog Deatil',
        layout: 'layout',
        nav: true,
        footer: true,
        blog: blog,
        categories: data.blogCategories
    })
})

module.exports = router;
