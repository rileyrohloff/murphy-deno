# murphy-deno
Messing around with Deno


Though Deno will handle almost all dependencies, `denon` is one you'll have to install manually.

```deno install -Af --unstable https://deno.land/x/denon/denon.ts```

See docs: https://deno.land/x/denon

This denon.json file provides some cool insights into how deno dynamically compiles on change.

To use denon run: 

`denon -c denon.json`

This will look at the provided json file for configuration. 

You'll need to provide some environment vars to this app if you'd like it to work in the form of a .env file.

They are: 

`CLIENT_ID`: spotify client/app ID

`ClIENT_SECRET`: spotify client secret key

`PORT`: Port you'd like this app to run on ***will default to port 8080***


GLHF. 