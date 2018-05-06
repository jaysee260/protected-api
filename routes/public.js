/**
 * @description
 * Public route - anyone can access
 */

const public = router => {
  router.get('/', (req, res, next) => {
    res.json({
      msg: 'This is a public route; you don\'t need to be authenticated to access it'
    });
  });
}

module.exports = public;