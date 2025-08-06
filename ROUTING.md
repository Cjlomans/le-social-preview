# React Router Routing Configuration

This document explains the various routing configurations included in this project to ensure that React Router works correctly in different hosting environments.

## The Problem

Single-page applications (SPAs) built with React Router face a common issue: when a user directly accesses a route like `/booking` or refreshes the page on a route other than the root (`/`), the server looks for a file at that path instead of serving the `index.html` file and letting React Router handle the routing client-side.

## Solutions Implemented

We've included multiple configuration files to support various hosting environments:

### 1. Netlify (`_redirects`)

```
/* /index.html 200
```

This tells Netlify to redirect all requests to `index.html` with a 200 status code.

### 2. Vercel (`vercel.json`)

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

This configuration tells Vercel to rewrite all requests to `index.html`.

### 3. Apache (`.htaccess`)

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule . /index.html [L]
```

This Apache configuration redirects all requests to non-existent files to `index.html`.

### 4. IIS (`web.config`)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
            <add input="{REQUEST_URI}" pattern="^/(api)" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

This configuration is for Microsoft IIS servers.

### 5. Express.js (`server.js`)

```javascript
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on port ${port}`);
```

This is a simple Express.js server that serves the static files and redirects all other requests to `index.html`.

### 6. Static Hosting (`static.json`)

```json
{
  "root": "dist/",
  "clean_urls": true,
  "routes": {
    "/**": "index.html"
  }
}
```

This configuration is used by some static hosting providers like Heroku.

### 7. GitHub Pages / Fallback (404.html + index.html script)

For hosting environments that don't support server-side configuration, we've included a client-side solution:

- A `404.html` file that redirects to the index page with the original URL encoded in the query string
- A script in `index.html` that reads the query string and uses `history.replaceState()` to restore the original URL

## How to Use

Depending on your hosting provider, you may need to use one or more of these configurations:

1. **Netlify**: The `_redirects` file should be automatically detected.
2. **Vercel**: The `vercel.json` file should be automatically detected.
3. **Apache**: Make sure the `.htaccess` file is included in your deployment.
4. **IIS**: Make sure the `web.config` file is included in your deployment.
5. **Node.js**: Install Express.js (`npm install express`) and run `node server.js`.
6. **Heroku**: The `static.json` file should be automatically detected.
7. **GitHub Pages or other static hosts**: The 404.html + index.html script solution should work as a fallback.

## Testing

To verify that the routing is working correctly:

1. Deploy your application
2. Navigate to a route like `/booking` directly in your browser
3. Refresh the page while on a route other than the root
4. Both scenarios should load the application correctly and show the appropriate route

