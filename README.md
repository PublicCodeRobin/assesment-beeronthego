## Instructions to start the project:   
1. Spinning up the devserver can be done with `npm start`
1. Storybooks is also installed and can be run with `npm storybook`   

### Storybook:   
I've installed this to continue development after being blocked from an API (and I was not sure if I would get unblocked... below I explain more)

### Notes about OpenStreetMaps API:   
I've used open street maps for geocoding.  
It's a free API that can be used to get coordinates from places.  
I've had a nice live results implementation but I've soon been blocked for making too many requests...  

_**⚠️ So, a little warning below!**_   
Try to not make too many queries in a short period, else you'll probably be blocked too ;)   
If it happens you can open the app from another IP on a mobile hotspot for example.

## Notes about code:   
Starting the project I wanted to have as little surprises as possible.   
I already had some with the search of a free Geocoding API and that sucked up quite some time.   
To keep up the speed I did these things:
- I sticked to class-based components (for stateful components) for now.
- Picked chakra-ui over styled components with a library for a quick setup...
  Rebass seemed a bit outdated looking at the last human commit, and I couldn't make it run in the project somehow.🤔
  
## One more thing about shopfinder logic
- I Experimented to move the shopfinder logic to another component with context (and hooks). This would be better when a Google Maps overview comes in later. But to keep myself at the timebox I've decided not to continue this path.
