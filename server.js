const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Sample FAQs data
const faqs = {
  "hi" : "hello welcome to KALE zm",
  "What payment methods do you accept?": "We accept major credit cards, PayPal, and Apple Pay.",
  "Do you offer international shipping?": "Yes, we ship internationally. Shipping fees and delivery times vary by location.",
  "What is the estimated delivery time?": "Standard delivery usually takes 5-7 business days. Expedited options are available.",
  "Can I change my order after it has been placed?": "If your order hasn’t shipped yet, you can modify it by contacting customer support.",
  "How do I cancel my order?": "You can cancel your order within 1 hour of placing it by contacting us.",
  "What should I do if my order is damaged?": "Please contact us within 48 hours of receiving your order with photos of the damage.",
  "How can I provide feedback on my purchase?": "We welcome your feedback! You can submit it through our website or email us directly.",
  "Do you have a loyalty program?": "Yes, we have a loyalty program where you can earn points for every purchase.",
  "How do I redeem my loyalty points?": "You can redeem your points at checkout for discounts on future purchases.",
  "Can I return a sale item?": "Sale items can be returned within 14 days for store credit only.",
  "What happens if my item is out of stock?": "If an item is out of stock, we will notify you via email and offer alternatives.",
  "How do I reset my password?": "You can reset your password by clicking on the 'Forgot Password' link on the login page.",
  "What is your privacy policy?": "We value your privacy. Please read our privacy policy on our website for details.",
  "Do you offer gift cards?": "Yes, we offer digital gift cards available for purchase on our website.",
  "How can I check my order status?": "You can check your order status by logging into your account or using the tracking link.",
  "Where can I find your store locations?": "Our store locations can be found on the 'Store Locator' page of our website.",
  "Do you offer price matching?": "Yes, we will match the price of any competitor's identical item.",
  "What is your warranty policy?": "We offer a one-year warranty on all products against manufacturing defects.",
  "How do I submit a warranty claim?": "Please contact support with your order number and a description of the issue.",
  "Can I pick up my order in-store?": "Yes, we offer in-store pickup for online orders at select locations.",
  "How do I apply a discount code?": "You can enter your discount code at checkout before completing your order.",
  "What if I forgot my account password?": "Use the 'Forgot Password' link on the login page to reset your password.",
  "How do I update my account information?": "You can update your account information in the 'Account Settings' section after logging in.",
  "Do you offer free shipping?": "Yes, we offer free shipping on orders over $50 within the contiguous United States.",
  "How can I report a problem with my order?": "Please contact support with your order number and details of the issue.",
  "What should I do if I receive the wrong item?": "Contact us within 48 hours, and we will arrange for a return and replacement.",
  "Can I change my shipping address after placing an order?": "If your order hasn’t shipped yet, please contact us to update the address.",
  "How long does it take to process a refund?": "Refunds are typically processed within 5-7 business days after we receive the returned item.",
  "What is the process for returning an item?": "To return an item, please fill out our return form and send it back with the item.",
  "Do you have a mobile app?": "Yes, we have a mobile app available for download on iOS and Android.",
  "How do I download your mobile app?": "You can download our app from the Apple App Store or Google Play Store.",
  "How can I unsubscribe from your newsletter?": "You can unsubscribe using the link at the bottom of any email newsletter.",
  "What is your policy on backorders?": "If an item is on backorder, we will notify you of the estimated shipping date.",
  "Can I reserve an item?": "Currently, we do not offer reservations. Items are available on a first-come, first-served basis.",
  "How do I find sizing information?": "Sizing charts are available on our product pages under the 'Size Guide' section.",
  "What should I do if my order is late?": "If your order is late, please check the tracking link or contact us for assistance.",
  "Do you have a size guide?": "Yes, our size guide can be found on each product page.",
  "How do I contact a sales representative?": "You can contact a sales representative through our customer service email or phone number.",
  "Can I order by phone?": "Yes, you can place an order by calling our customer service line.",
  "What are your customer service hours?": "Our customer service hours are Monday to Friday, 9 AM to 5 PM EST.",
  "Do you offer student discounts?": "Yes, we offer a 10% discount for students with valid ID.",
  "How do I become a wholesale customer?": "Please contact us for more information on becoming a wholesale customer.",
  "Where can I find product manuals?": "Product manuals can be found on the product page or in the 'Support' section of our website.",
  "How do I care for my products?": "Care instructions are provided on the product page and with the product itself.",
  "What are your most popular products?": "Our best-sellers are featured on the homepage of our website.",
  "How can I stay updated on new products?": "Subscribe to our newsletter or follow us on social media for updates on new arrivals.",
  "Do you have a referral program?": "Yes, refer a friend and both of you will receive discounts on your next purchase.",
  "How do I refer a friend?": "You can refer a friend through the referral link provided in your account.",
  "What is your policy on exchanges?": "We accept exchanges within 30 days of purchase for unused items.",
  "Can I return an item without a receipt?": "Returns without a receipt may be issued store credit at our discretion.",
  "How do I check my gift card balance?": "You can check your gift card balance on our website or by contacting customer support.",
  "What should I do if my refund hasn't arrived?": "Please check your bank statement and contact us if you still don't see the refund after 7 business days.",
  "How often do you restock items?": "We restock popular items regularly. Sign up for notifications on the product page.",
  "Can I purchase a gift card online?": "Yes, digital gift cards can be purchased on our website.",
  "How do you handle customer complaints?": "We take complaints seriously and strive to resolve them promptly. Please contact us directly.",
  "What should I do if my account is hacked?": "Change your password immediately and contact customer support for further assistance.",
  "How can I change my email preferences?": "Update your preferences in the 'Account Settings' section of your profile.",
  "Do you offer any promotions?": "Yes, we have ongoing promotions. Check our website for the latest deals.",
  "How do I find product reviews?": "Product reviews can be found on the product page under the reviews section.",
  "Can I get a price adjustment after purchasing?": "We offer price adjustments within 7 days of your purchase if the item goes on sale.",
  "What are your shipping options?": "We offer standard, expedited, and overnight shipping options at checkout.",
  "Do you offer expedited shipping?": "Yes, expedited shipping is available for an additional fee.",
  "How do I request a product review?": "You can leave a review on the product page after logging into your account.",
  "What happens if I miss the delivery?": "If you miss the delivery, the carrier will leave a notice with instructions on how to reschedule.",
  "Can I send a gift directly to someone else?": "Yes, you can enter a different shipping address at checkout for gift deliveries.",
  "Do you have a mobile-friendly website?": "Yes, our website is fully optimized for mobile devices.",
  "How can I access my purchase history?": "You can view your purchase history by logging into your account.",
  "What happens to my loyalty points if I return an item?": "Loyalty points earned from returned items will be deducted from your account.",
  "How do I contact you for media inquiries?": "For media inquiries, please contact us at media@company.com.",
  "What should I do if my order is stuck in processing?": "Contact customer support for assistance with orders stuck in processing.",
  "How do I sign up for your newsletter?": "You can sign up for our newsletter on the homepage or at checkout.",
  "What is your policy on counterfeit products?": "We do not tolerate counterfeit products and take necessary actions against them.",
  "How can I become a brand ambassador?": "Please fill out the application form on our website to apply.",
  "Do you have a blog?": "Yes, we maintain a blog with articles about our products and industry news.",
  "How can I access your blog?": "You can access our blog from the link in the footer of our website.",
  "What is your policy on product reviews?": "We encourage honest reviews and reserve the right to moderate for inappropriate content.",
  "Can I suggest a product for your store?": "Yes, we welcome suggestions! Please submit your idea through our contact form.",
  "How do I get in touch with your marketing team?": "You can reach our marketing team at marketing@company.com.",
  "Do you offer online classes or tutorials?": "Yes, we offer online tutorials for select products on our website.",
  "What should I do if I have allergies related to your products?": "Please check product labels for allergen information or contact us for specific inquiries.",
  "How do I find out about upcoming sales?": "Subscribe to our newsletter or follow us on social media for updates on sales.",
  "Can I use multiple discount codes on one order?": "Only one discount code can be applied per order.",
  "What is your policy on limited edition items?": "Limited edition items are final sale and cannot be returned.",
  "How do you handle data protection?": "We adhere to strict data protection policies to keep your information safe.",
  "What should I do if I receive a defective product?": "Please contact us within 48 hours, and we will arrange for a replacement.",
  "How do I opt-out of promotional emails?": "You can opt-out using the unsubscribe link in any promotional email.",
  "Do you have a customer satisfaction guarantee?": "Yes, we offer a satisfaction guarantee. If you’re not happy, we’ll make it right.",
  "How can I request a catalog?": "You can request a catalog by filling out the form on our website.",
  "Can I change my payment method after placing an order?": "If your order hasn’t shipped yet, please contact us to update your payment method.",
  "What should I do if I have questions about my subscription?": "Contact our customer support for any subscription-related inquiries.",
  "How do I report a bug on your website?": "Please report any bugs via our contact form or email support@company.com.",
  "What is your policy on environmental sustainability?": "We are committed to sustainability and strive to reduce our environmental impact.",
  "Can I modify my order after it’s been shipped?": "Once an order is shipped, it cannot be modified. Please contact us for assistance.",
  "How do I download my invoice?": "You can download your invoice from your account under the 'Order History' section.",
  "Do you offer bulk ordering?": "Yes, we offer bulk ordering. Please contact us for pricing and availability.",
  "How can I find out more about your company?": "You can learn more about us on the 'About Us' page of our website.",
  "What are your terms and conditions?": "Our terms and conditions can be found on our website in the footer section."


//You can integrate these questions and answers into your chatbot's FAQ section. Tailor the answers to fit your specific business model and policies. If you need help with integration or any other features, feel free to ask!
};

// Sample personalized recommendations
const recommendations = [
  "Product A - A great choice!",
  "Product B - Popular among users!",
  "Product C - Best seller!",
];

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'seankidice@gmail.com', // Your email
    pass: '</h>h4cker<h>',    // Your email password or app password
  },
});

// Send email function
const sendEmail = (message) => {
  const mailOptions = {
    from: 'seankidice@gmail.com', // Your email
    to: 'rabsonkachimao1@gmail.com', // Recipient's email
    subject: 'Live Chat Support Request',
    text: message,
  };

  return transporter.sendMail(mailOptions);
};

// Handle chatbot POST requests
app.post('/chat', (req, res) => {
  const userMessage = req.body.message.toLowerCase();
  let reply = "I'm sorry, I didn't understand that.";

  // FAQ matching logic
  for (let question in faqs) {
    if (userMessage.includes(question.toLowerCase())) {
      reply = faqs[question];
      break;
    }
  }

  // Order tracking
  if (userMessage.includes("track") && userMessage.includes("order")) {
    reply = "Please provide your order ID for tracking.";
  }

  // Personalized recommendations
  if (userMessage.includes("recommend")) {
    reply = `Here are some products you might like: ${recommendations.join(', ')}`;
  }

  // Feedback collection
  if (userMessage.includes("feedback")) {
    reply = "Thank you for your feedback! We appreciate it.";
  }

  // Live chat initiation
  if (userMessage.includes("live chat")) {
    sendEmail(userMessage)
      .then(() => {
        reply = "Your message has been sent to customer support. They will get back to you shortly.";
        res.json({ reply });
      })
      .catch(err => {
        console.error("Error sending email:", err);
        reply = "There was an error sending your message. Please try again later.";
        res.json({ reply });
      });
    return; // Prevent sending another response before email is sent
  }

  // Return the bot reply
  res.json({ reply });
});

// Start the server
app.listen(port, () => {
  console.log(`Chatbot is running on http://localhost:${port}`);
});