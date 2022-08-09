module.exports = {
  apps: [
    {
      name: 'node-todo',
      script: 'dist/main.js',
      watch: false,
      env: {
        PORT: process.env.PORT,
        NODE_ENV: process.env.NODE_ENV,
        NODE_OPTIONS: `--max-old-space-size=${process.env.NODE_MAX_OLD_SPACE_SIZE}`
      },
      exec_mode: 'cluster',
      instances: 'max',
      max_memory_restart: '512M',
      listen_timeout: 3000,
      kill_timeout: 6000,
      combine_logs: true
    }
  ]
}
