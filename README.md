## Instructions to start the project:   
1. Spinning up the devserver can be done with `npm start`
1. Storybooks is also installed and can be run with `npm storybook`   

### Storybook:   
I've installed this to continue development after being blocked from an API (and I was not sure if I would get unblocked... below I explain more)

### Notes about OpenStreetMaps:   
I've used open street maps for geocoding.  
It's a free API that can be used to get coordinates from places.  
I've had a nice live results implementation but I've soon been blocked for making too many requests...  

_**⚠️ So, a little warning below!**_   
Try to not make too many queries in a short period, else you'll probably be blocked too ;)   
If it happens you can open the app from another IP on a mobile hotspot for example.

## Notes about code:   
Starting the project I wanted to have as little surprises as possible since I've already had some problems with the search of a free Geocoding API.  
This made me make the following concessions:
- Using chakra-ui instead of styled components with a library for a quick setup
- I'm more familiar with class based components, so I've used that for the ones that need state-management
- I've experimented to move to hooks/context in the codebase. I've realized that would make things quite a bit easier... Learning point for me next time. Context might be a bit overkill for now tough.
