# Deployment Guide for Vercel

## Environment Variables

Set these in your Vercel dashboard:

1. `NEXT_PUBLIC_API_URL` - Your backend API URL (e.g., `https://your-backend.vercel.app/api`)

## Deployment Steps

1. Connect your GitHub repository to Vercel
2. Set the environment variables in Vercel dashboard
3. Deploy the frontend folder
4. Deploy the backend separately (or use a different service)

## Backend Deployment

For the backend, you have two options:

### Option 1: Deploy Backend to Vercel
- Create a separate Vercel project for the backend
- Set up serverless functions in the `api` folder
- Update the `NEXT_PUBLIC_API_URL` to point to your backend Vercel URL

### Option 2: Use External Backend
- Deploy backend to Railway, Render, or Heroku
- Update `NEXT_PUBLIC_API_URL` to point to your backend URL
