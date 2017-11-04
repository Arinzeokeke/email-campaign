function localtunnel {
  lt -s 2plus2is4 --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done