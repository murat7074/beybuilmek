import express from 'express'
const app = express()
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDatabase } from './config/dbConnect.js'
import errorMiddleware from './middlewares/errors.js'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Handle Uncaught Exception
process.on('uncaughtException', (err) => {
  console.error(`ERROR: ${err}`)
  console.log('Shutting down server due to Unhandled uncaught Exception')
  process.exit(1)
})

if (process.env.NODE_ENV !== 'PRODUCTION') {
  dotenv.config({ path: 'backend/config/config.env' })
}

app.set('trust proxy', 1) // Proxy ayarını güven

// Helmet Middleware for securing HTTP headers with Content Security Policy
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'img-src': ["'self'", 'data:', 'https://res.cloudinary.com'],
      },
    },
  })
)

// CORS Middleware
const allowedOrigins = ['http://localhost:5173', 'https://fullstack-deneme.onrender.com'];
const options = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(options))

// Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 dakika
  max: 100, // Her IP için 5 dakika içinde 100 istek
})
app.use(limiter)

// Mongo Sanitize Middleware to prevent NoSQL injection
app.use(mongoSanitize())

// XSS Clean Middleware to prevent XSS attacks
app.use(xss())

// Morgan for logging
if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use(morgan('dev'))
}

// Connecting to database
connectDatabase()

app.use(
  express.json({
    limit: '10mb', // limiti 10 mb yapmazsak cloudinary e 1mb üzerinde resim vs yükleyemiyoruz
    verify: (req, res, buf) => {
      req.rawBody = buf.toString()
    },
  })
)
app.use(cookieParser())

// Import all routes
import productRoutes from './routes/products.js'
import authRoutes from './routes/auth.js'
import orderRoutes from './routes/order.js'
import paymentRoutes from './routes/payment.js'

app.use('/api/v1', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '../frontend/dist'), {
    maxAge: '1d',
    setHeaders: (res, path) => {
      if (path.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    },
  }));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
  });
}

app.use('/api/v1', productRoutes)
app.use('/api/v1', authRoutes)
app.use('/api/v1', orderRoutes)
app.use('/api/v1', paymentRoutes)

// Error Middleware
app.use(errorMiddleware)

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT || 5000} in ${process.env.NODE_ENV} Mode.`
  )
})

// Handle unHandled Promise rejection
process.on('unhandledRejection', (err) => {
  console.error(`ERROR: ${err}`)
  console.log('Shutting down server due to Unhandled Promise Rejection')
  server.close(() => {
    process.exit(1)
  })
})
















// import express from 'express'
// const app = express()
// import dotenv from 'dotenv'
// import cookieParser from 'cookie-parser'
// import { connectDatabase } from './config/dbConnect.js'
// import errorMiddleware from './middlewares/errors.js'
// import helmet from 'helmet'
// import cors from 'cors'
// import rateLimit from 'express-rate-limit'
// import mongoSanitize from 'express-mongo-sanitize'
// import xss from 'xss-clean'
// import morgan from 'morgan'
// import path from 'path'
// import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// // Handle Uncaught Exception
// process.on('uncaughtException', (err) => {
//   console.error(`ERROR: ${err}`)
//   console.log('Shutting down server due to Unhandled uncaught Exception')
//   process.exit(1)
// })

// if (process.env.NODE_ENV !== 'PRODUCTION') {
//   dotenv.config({ path: 'backend/config/config.env' })
// }

// app.set('trust proxy', 1) // Proxy ayarını güven

// // Helmet Middleware for securing HTTP headers with Content Security Policy
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       useDefaults: true,
//       directives: {
//         'img-src': ["'self'", 'data:', 'https://res.cloudinary.com'],
//       },
//     },
//   })
// )

// // // CORS Middleware
// // const allowedOrigins = ['http://localhost:5173', 'https://beybuilmek.com']
// // const options = {
// //   origin: (origin, callback) => {
// //     if (allowedOrigins.includes(origin) || !origin) {
// //       callback(null, true)
// //     } else {
// //       callback(new Error('Not allowed by CORS'))
// //     }
// //   },
// //   optionsSuccessStatus: 200,
// //   credentials: true, // Allow cookies to be sent
// // }
// // app.use(cors(options))

// // Rate Limiting Middleware
// const limiter = rateLimit({
//   windowMs: 5 * 60 * 1000, // 5 dakika
//   max: 100, // Her IP için 5 dakika içinde 100 istek
// })
// app.use(limiter)

// // Mongo Sanitize Middleware to prevent NoSQL injection
// app.use(mongoSanitize())

// // XSS Clean Middleware to prevent XSS attacks
// app.use(xss())

// // Morgan for logging
// if (process.env.NODE_ENV === 'DEVELOPMENT') {
//   app.use(morgan('dev'))
// }

// // Connecting to database
// connectDatabase()

// app.use(
//   express.json({
//     limit: '10mb', // limiti 10 mb yapmazsak cloudinary e 1mb üzerinde resim vs yükleyemiyoruz
//     verify: (req, res, buf) => {
//       req.rawBody = buf.toString()
//     },
//   })
// )
// app.use(cookieParser())

// // Import all routes
// import productRoutes from './routes/products.js'
// import authRoutes from './routes/auth.js'
// import orderRoutes from './routes/order.js'
// import paymentRoutes from './routes/payment.js'

// // app.use(express.static(path.join(__dirname, '../frontend/dist')))

// // app.get('*', (req, res) => {
// //   res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'))
// // })

// if (process.env.NODE_ENV === 'PRODUCTION') {
//   app.use(express.static(path.join(__dirname, '../frontend/dist')))

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'))
//   })
// }

// // app.get("/",(req,res)=>{

// // })

// app.use('/api/v1', productRoutes)
// app.use('/api/v1', authRoutes)
// app.use('/api/v1', orderRoutes)
// app.use('/api/v1', paymentRoutes)

// // Error Middleware
// app.use(errorMiddleware)

// const server = app.listen(process.env.PORT || 5000, () => {
//   console.log(
//     `Server started on PORT: ${process.env.PORT || 5000} in ${
//       process.env.NODE_ENV
//     } Mode.`
//   )
// })

// // Handle unHandled Promise rejection
// process.on('unhandledRejection', (err) => {
//   console.error(`ERROR: ${err}`)
//   console.log('Shutting down server due to Unhandled Promise Rejection')
//   server.close(() => {
//     process.exit(1)
//   })
// })
