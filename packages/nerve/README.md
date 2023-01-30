# ⚡️ Nerve ⚡️
Nerve is the nervous system of the application. Events are emitted and handled by any services listening. This can be used to send "commands" or just react to events.


## Example
```javascript
import nerve from 'nerve';

await nerve.sendEmail({
  emailAddress: 'test@email.com',
  subject: 'Test Email',
  body: 'This is a test email.'
})
 ```