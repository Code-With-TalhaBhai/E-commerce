const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req:any, res:any) {
  if (req.method === 'POST') {
    console.log(req.body.order)
    const ship = ()=>{
      if(req.body.price>1500){
        return 'shr_1LB0OmGqtzPacEjzuAtJXAtN'
      }
      else{
        return 'shr_1LB0T7GqtzPacEjzeFO2xehT'
      }
    }
    try {
      const params = {
        mode: 'payment',
        allow_promotion_codes: true,
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}`,
        submit_type: 'pay',
        billing_address_collection: 'auto',
        shipping_options : [
          {shipping_rate: ship()}
        ],
        line_items: req.body.order.map((element:any,index:number)=>{
          let img = element.image.asset._ref;
          let newImg = img.replace('image-','https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp','.webp')
            return {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: element.title,
                  images: [newImg]
                },
                unit_amount: element.ItemPrice * 100,
              },
                  adjustable_quantity:{
                    enabled: true,
                    minimum: 1
                  },
              quantity: element.singleItemQty,
            }
        }),
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params)
       // line_items:[
        //   {
        //   price: 'price_1LAuKUGqtzPacEjzyCjGjyMK',
        //   quantity: 1,
        // },
        // ],
      // res.redirect(303,session.url);
      res.send({id: session.id})      
    } catch (err:any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}