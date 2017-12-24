# Webpush notifier

Web application to receive notifications from the backend.

In this project the backend exctracts data from the source (another website), compares and keeps only the data that has not been notified to the clients yet, builds and sends the notifications.

Private & public keys and source url must be provided in `.env`.

Using:
 - *Express* to serve everything
 - *Service workers* and *Push API* to pop notifications even when the app is closed.
 - *Scrape-it* to extract the info
 - *Lowdb* as a light DDBB
 - *Cron* to extract data periodically
 - *Pug* as a template engine