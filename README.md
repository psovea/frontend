# frontend
This is the frontend of psovea.

# check out and go to another branch in github
git checkout '<branch>'
example: git checkout master

# Make a new branch.
You can make new branches in github. Then use git checkout -b '<new branch>' in your terminal to go into that branch.

# Start local development server
Open the terminal in the frontend folder.
Use "npm install" to install the libraries from the framework.
Use "npm start" to start the server. The server will automatically refresh if you make a change in the code.
If you implement new libraries/packages you have to use "npm install" again.

# File locations
Most of the coded files are in the src folder. The code of all components are in de components folder.
If you want to implement a new component, like a new type of graph, make a new folder in components. Use '<new component>'.js and '<new component>'.css files to implement that component.

# Code structure
We use the framework React.
In React you can insert classes in divs.
example this implements the map class in a div: '<div className:"map">' '<Maps />' '</div>'

we use 4 space tabs.
instead of the html/javascript style: '<div class:"grid">' '</div>'
we use the React style: '<div className="grid">' '</div>'
# Colors
Use the color variables in css files. The color variables are set in base.css
If you want new colors, add them in base.css
