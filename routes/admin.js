let express = require('express');
let router = express.Router();
let csrf = require('csurf');
let passport = require('passport');

let Product = require('../models/product');
let Order = require('../models/order');
let User = require('../models/user');
let Cart = require('../models/cart');

let csrfProtection = csrf();
router.use(csrfProtection);


router.get('/panel', isAdminLoggedIn, function (req, res, next) {
    res.render('admin/panel');
});

router.get('/manageitems', isAdminLoggedIn, function (req, res, next) {
    Product.find(function (err, docs) {
        let productChunks = [];
        let chunkSize = 3;
        for (let i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('admin/manageItems', {title: 'Shopping Cart', products: productChunks, length : docs.length});
    });
});

router.get('/additem', isAdminLoggedIn, function(req, res, next){
    res.render('admin/additem', {csrfToken: req.csrfToken()});
});

router.post('/additem', isAdminLoggedIn, function(req, res, next){
    let item = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
    });
    item.save(function(err, result){
        if (err){
            res.write(err);
        }
        res.redirect('/admin/manageitems');
    });
});

router.get('/removeitem/:id', isAdminLoggedIn, function(req, res, next){
    let productId = req.params.id;
    Product.findByIdAndRemove(productId, function(err) {
        if (err) {
            return res.write('Error!');
        }
        res.redirect('/admin/manageitems');
    });
});

router.get('/edititem/:id', isAdminLoggedIn, function(req, res, next){
    let productId = req.params.id;
    Product.findById(productId, function(err, product) {
        if (err) {
            return res.redirect('/manageitems');
        }
        res.render('admin/edititem', {
            id : product.id, 
            title : product.title, 
            description : product.description, 
            price: product.price, 
            csrfToken: req.csrfToken()
        });
    });
});

router.post('/edititem/:id', isAdminLoggedIn, function (req, res, next) {
    let productId = req.params.id;
    Product.findByIdAndUpdate(productId, { 
        title: req.body.title, 
        description: req.body.description, 
        price: req.body.price }, function(err){
        if (err){
            res.write('Error!');
        }
        res.redirect('/admin/manageitems');
    });
});

router.get('/userslist', isAdminLoggedIn, function (req, res, next) {
    User.find(function(err, users) {
        if (err) {
            return res.write('Error!');
        }
        res.render('admin/userslist', { users: users, length : users.length});
    });
});

router.get('/orderslist', isAdminLoggedIn, function (req, res, next) {
    Order.find({}, function(err, orders) {
        if (err) {
            return res.write('Error!');
        }
        let cart;
        orders.forEach(function(order) {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('admin/ordersList', { orders: orders, length : orders.length});
    });
});

router.get('/logout', isAdminLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
});

router.use('/', notLoggedIn, function (req, res, next) {
    next();
});

router.get('/signin', function (req, res, next) {
    let messages = req.flash('error');
    res.render('admin/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/admin/signin',
    failureFlash: true
}), isAdmin, function (req, res, next) {
    if (req.session.oldUrl) {
        let oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/admin/panel'); 
    }
});

module.exports = router;

function isAdminLoggedIn(req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function isAdmin(req, res, next) {
    if (req.user.isAdmin){
        return next();
    }
    req.logout();
    res.redirect('/');
}