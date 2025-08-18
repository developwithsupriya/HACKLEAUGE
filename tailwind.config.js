cat > tailwind.config.js <<'EOF'
module.exports = {
  content: [
    "./hackleague/index.html",
    "./hackleague/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: []
}
EOF