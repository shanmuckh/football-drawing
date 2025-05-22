Tekentool / Drawing tool
=======


## Development installation instructions
This project was scaffolded with Create React App.

If you receive errors about 'Cairo', read on...

### Wtf is Cairo?
The main library used to develop this tool is FabricJS.  Fabric has a dependency on a graphics program called Cairo. This needs to be installed separately into your OS. The Fabric github page has details on how to do this. However if you have Homebrew already installed on OSX then I suggest running `brew install cairo`. That should do it.


1. Clone this repository to your projects folder
2. Ensure Yarn is installed (because this project is scaffolded using Create React App the preference is to use Yarn instead of NPM, what whatever floats your boat)
3. Install dependencies by typing `yarn`


## Developing

Type `yarn start`. This starts the Create React App webpack dev server.

## Building the module

Type `yarn run lib`. This runs all the JS files through babel, converting them to ES5 and then moving them into the `lib` folder. Inside `package.json` you might notice this line `"main": "lib/index.js",`. When you install this project as a module, this line specifies the entry point to the compiler. Commit the `lib` folder to git.

## Building a production version, ready for deployment

Given that this project is intended as an importable module, building a production ready version isn't really ever needed - unless you want to upload it to a standalone page or something. Type `yarn build`.


## A note regarding the assets/SVG files

The SVG's within the assets folder are manually tweaked after they are exported from Sketch. Most importantly some SVG elements within a file are given additional IDs so that we can target those elements to apply styles such as different colours for different shirts, and outlines for active items. So don't modify or replace any of these assets unless you're absolutely sure you must.
