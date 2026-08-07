# Erinnerungen — was heute funktioniert und was noch fehlt

## Was jetzt in der App steckt

Unter **Einstellungen → Tägliche Lern-Erinnerung** kannst du einen Schalter
umlegen und eine Uhrzeit wählen. Öffnest du LinguaLearn nach dieser Uhrzeit,
ohne an dem Tag schon gelernt zu haben, kommt eine System-Benachrichtigung
(„Zeit für deine Lernrunde"). Das läuft komplett ohne Server.

Auf iPhone/iPad funktionieren Benachrichtigungen nur, wenn die App über
**Teilen → Zum Home-Bildschirm** installiert ist — so schreibt es iOS vor.

## Was NICHT geht (und warum das hier nicht vorgetäuscht wird)

Eine Benachrichtigung, die dich erreicht, **während die App geschlossen ist**,
ist mit reinem Client-Code technisch unmöglich. Dafür braucht es Web Push:

1. **VAPID-Schlüsselpaar** erzeugen (öffentlich + privat).
2. Der Client abonniert per `pushManager.subscribe({ applicationServerKey })`
   und schickt die Subscription an den Worker.
3. Der Worker legt die Subscriptions in KV ab (z. B. `push:<user>`).
4. Ein **Cron Trigger** (`wrangler.jsonc` → `triggers.crons`) läuft stündlich,
   sucht Konten, deren Erinnerungszeit erreicht ist und die heute noch nicht
   gelernt haben, und sendet einen signierten Push (ES256-JWT) an den
   Push-Dienst des Geräts.
5. `sw.js` bekommt einen `push`-Handler, der `showNotification` aufruft.

Die Schritte 1 und 4 lassen sich aus dieser Entwicklungsumgebung heraus nicht
testen — der private VAPID-Schlüssel muss als Cloudflare-Secret hinterlegt
werden und der Versand geht an externe Push-Endpunkte (`fcm.googleapis.com`,
`web.push.apple.com`), die hier nicht erreichbar sind. Ungetesteter
Push-Versand wäre eine Funktion, die im Zweifel still nichts tut — deshalb
steht in der App ehrlich dabei, dass die Erinnerung beim Öffnen greift und
nicht bei geschlossener App.

## Wenn du es einrichten willst

Sag Bescheid — dann bauen wir die fünf Schritte in einer eigenen Arbeitswelle,
mit einem Testknopf in den Einstellungen, damit du den Versand auf deinem
eigenen Gerät sofort prüfen kannst.
