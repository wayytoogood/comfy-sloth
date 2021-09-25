// domain/.netlify/functions/generate-payment-intent

// Node'da env dosyalarına erişim sağlanıyor.
const dotenv = require('dotenv')
dotenv.config()

// Secret key'imizle stripe'la bağlantı kuruluyor.
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)

exports.handler = async function (event, context) {
  if (event.body) {
    const { cart, total_price, shipping_fee } = JSON.parse(event.body)

    // Normalde buranın içinde cart item'larının id'lerine bakılarak toplam hesaplanıyor, toplamın server'da hesaplanması güvenlik açısından çok önemli.
    const calculateOrderAmount = () => {
      return total_price + shipping_fee
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'usd',
      })

      // Herhangi bir sıkıntı çıkmazsa post requestimizin dönüşünden gelen response'a clientSecret ekleniyor.
      return {
        statusCode: 200,
        body: JSON.stringify({
          clientSecret: paymentIntent.client_secret,
        }),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      }
    }
  } else {
    return {
      statusCode: 500,
      body: 'Generate Payment Intent',
    }
  }
}
