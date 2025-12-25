const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Service URLs (from docker-compose or env)
const RESUME_SERVICE = process.env.RESUME_SERVICE_URL || 'http://resume-service:8001';
const CAREER_SERVICE = process.env.CAREER_SERVICE_URL || 'http://career-service:8002';
const INTERVIEW_SERVICE = process.env.INTERVIEW_SERVICE_URL || 'http://interview-service:8003';
const MULTIMODAL_SERVICE = process.env.MULTIMODAL_SERVICE_URL || 'http://multimodal-service:8004';

// Routes
app.use('/api/resume', createProxyMiddleware({ target: RESUME_SERVICE, changeOrigin: true, pathRewrite: {'^/api/resume': '/resume'} }));
app.use('/api/career', createProxyMiddleware({ target: CAREER_SERVICE, changeOrigin: true, pathRewrite: {'^/api/career': '/career'} }));
app.use('/api/interview', createProxyMiddleware({ target: INTERVIEW_SERVICE, changeOrigin: true, pathRewrite: {'^/api/interview': '/interview'} }));
app.use('/api/multimodal', createProxyMiddleware({ target: MULTIMODAL_SERVICE, changeOrigin: true, pathRewrite: {'^/api/multimodal': '/multimodal'} }));

app.get('/', (req, res) => {
    res.send('API Gateway is running');
});

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
