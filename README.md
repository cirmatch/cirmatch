Crimatch :

Crimatch is a fullstack recycling B2B marketplace where users can buy and sell recyclable materials like PET, LDPE, and HDPE. The platform supports secure authentication, product management, and admin controls.

Features :

    1. JWT Authentication (Register, Login, Role-based Access)
    2. Product Listings with Images, Descriptions & Prices
    3. Cart System & Checkout
    4. Order Tracking
    5. Admin Dashboard
Deployed on:

    Frontend → Vercel
    Backend → Render

Tech Stack

    1.Frontend:
        a) next.js
        b) Redux Toolkit
        c) Axios
        d) Framer Motion
        e) yup
        f) CSS Modules
        g) swiper
        h) jwt decode
        i) next-sitemap
        j) react-hot-toast

    2.Backend:
        a) Node.js
        b) Express.js
        c) MongoDB + Mongoose
        d) JWT
        e) Bcrypt.js
        f) Cloudinary (for Image Uploads)
        g) BulkSmsBd (for Code sending in Number)
        h) nodemailer (for sending code email)
        i) swagger.js (for api documentation)

Project Setup :

    Clone Repository :
        git clone https://github.com/yourusername/crimatch.git
        cd crimatch

    Install Dependencies:
        backend:
            cd backend
            npm install
        frontend:
            cd frontend
            npm install

Environment Variables:

    Frontend : 
        NEXT_PUBLIC_API_URL
        FRONTEND_URL

    Backend : 
        CLOUD_API_KEY
        CLOUD_API_SECRET
        CLOUD_NAME
        EMAIL_PASS
        EMAIL_USER
        JWT_REFRESH_SECRET
        JWT_SECRET
        MONGODB_URL
        PORT
        SMS_API_KEY
        SMS_SENDER_ID
        STRIPE_SECRET_KEY
        LIVE          ##Live link of the Website (Used in Swagger)
        SWAGGER_KEY
        NODE_ENV

Run The Project :

    cd (file name)
    npm run dev

    Frontend runs on http://localhost:3000
    Backend runs on http://localhost:5000

Developed By

    Tanim Talukder
    Software Engineer | Fullstack Developer
    talukdertanim73@email.com
