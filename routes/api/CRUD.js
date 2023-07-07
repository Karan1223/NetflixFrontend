const express = require('express')
const router = express.Router()

//import model
const Watchlist = require('../../models/Watchlist.js')


//@type     -   GET
//@route    -   /api/watchlist
//@desc     -   Just for testing
//@access   -   PUBLIC
router.get('/', (req, res) => res.send('Watchlist related routes'))

//@type     -   GET
//@route    -   /api/watchlist/get
//@desc     -   Get all record
//@access   -   PUBLIC
router.get('/get',
async (req, res) => {
    
    // without cursor.
    const fav = await Watchlist.find({});
    try {
        res.send(fav);
    } catch (error) {
        res.status(500).send(error);
    }

})

router.post("/addData", async (req,res) => {
    const newFav = Watchlist({
        movie: req.body.title
    })
    
    newFav.save()
    .then((watchlist) => res.send(watchlist))
    .catch(err => console.log(err))
})

//@type     -   PUT
//@route    -   /api/watchlist/update-movie/:title
//@desc     -   Update a record on the basis of movie title
//@access   -   PUBLIC
router.put("/updateData/:title", async (req,res) => {
   
    Watchlist.updateOne(
        {movie: req.params.title},
        {$set: {movie: req.body.title}})
        .exec()
        .then(()=> {res.status(201).send('WatchList Updated.')})
        .catch((err)=>{console.log(err)})
})

//@type     -   DELETE
//@route    -   /api/watchlist/delete/:title
//@desc     -   Delete a record on the basis of username
//@access   -   PUBLIC
router.delete('/deleteData/:title', (req, res) => {
    
    Watchlist.deleteOne({movie: req.params.title})
        .exec()
        .then(() => {
            res.status(201).send('Movie Deleted.')
        })
        .catch((err) => { console.log(err);
        })
})



module.exports = router