const Order = require('../models/order');

exports.addOrder = async (req, res, next)=> {

   try{   
   
   const amount = req.body.amount;
   const description = req.body.description;
   const category = req.body.category;

   const data = await Order.create( {amount: amount, description: description, category: category} )
   res.status(201).json({newExpense: data});
   } catch(err){
      res.status(500).json({
         error: err
      })

   } 

}

exports.getOrder = async (req, res, next) => {
    try{
     const expenses = await Order.findAll();
     console.log(expenses);
     res.status(200).json({allExpenses: expenses})
    } catch(error){
     console.log('Get expense is failing', JSON.stringify(error));
     res.status(500).json({error: err})
    }
}

exports.deleteOrder = async (req, res) => {
    const eId = req.params.id;
    console.log(req.params.id);
    try{
    if(req.params.id == 'undefined'){
       console.log('ID is missing');
      return res.status(400).json({err: 'ID is missing'})
    }
    await Order.destroy({where: {id: eId}});
    res.sendStatus(200);
    } catch(err){
       console.log(err);
       res.status(500).json(err)
    }
}