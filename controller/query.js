const userQuery = require ('../model/query')

const sanitize = require('../common/sanitize')

const getquery = async(req,res)=>{
    try {
        let query = await userQuery.find()
        res.status(200).send({
            query,
            message:"User Data Fetch Successfull"
        })
    } catch (error) { 
        res.status(500).send({
            message:"Internal Server Error",
            errorMessage: error.message
        })
    }
}

//const getquery = async (req, res) => {
//   
//    try {
//        const id =sanitize.isString(req.params.id)
//        console.log(id)
//        if (id) {
//            let query = await userQuery.findById({id:id}).sort({ createdAt: 'desc' });
//
//
//            let replies = query?.map((query) => {
//                return query?.replies?.length >= 0 ? query?.replies?.reverse() : []
//            })
//
//            //comment.replies || []
//            let newquery = [...query, replies]
//                .slice(0, replies?.length);
//
//            console.log('new query----------', newquery);
//
//            res.json(newquery);
//        } else {
//            res.status(404).json({ message: 'There is no user to get the query', error: error });
//        }
//
//    } catch (error) {
//        res.status(401).json({ message: 'Problem with Getting query From Server', error: error });
//    }
//}
const createquery = async (req, res) => {
   
  
    try {
        const id = await sanitize.isString(req.params.id)
         console.log(id)
        if (id) {
           await userQuery.create({
            queryId:id,
            username: req.body?.username,
            query: req.body?.query
                
            })

            res.status(201).send({ message:"query created Successfully"})
        } else {
            res.status(404).json({ message: 'user with this id not found!' })
        }

    } catch (error) {
        res.status(401).json({ message: 'Problem with Getting query From Server', error: error.message });
    }
}

const addReply = async (req, res) => {
   
    try {
        const id =sanitize.isString(req.params.id)
        
        if (id) {

            const reply = {
                queryId: id,
                username: req.body?.username,
                reply: req.body?.reply,
            }
        
           
            let query = await userQuery.findByIdAndUpdate({_id:id}, { $push: { replies: reply }},  {new: true} )
                res.json(query);

        } else {
            res.status(404).json({ message: 'query with this id not found!' })
        }

    } catch (error) {
        res.status(401).json({ message: 'Problem with Getting query From Server', error: error });
    }
}



module.exports={
     createquery, 
     getquery, 
     addReply
     }



